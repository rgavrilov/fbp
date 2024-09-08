import { EntityBuilders, planToBlueprint } from '../../PlanBuilder';
import { TransportBelt } from '../../transportBelts';
import { AssemblingMachine } from '../../AssemblingMachine';
import { ChemicalPlant } from '../../ChemicalPlant';
import { ElectricFurnace } from '../../ElectricFurnace';
import { SupplyBeltMap } from '../../supplySegment';
import { buildSupplyBlock } from './buildSupplyBlock';
import { Fbp } from '../../Fbp';
import { Network } from '../../circuit';
import { UndergroundBelt } from '../../UndergroundBelt';
import _ from 'lodash';
import { Direction } from '../../Direction';
import { FastInserter, FilterInserter } from '../../inserters';
import { WoodenChest } from '../../WoodenChest';
import { HeavisideGate } from '../../DeciderCombinator';
import { Inverter } from '../../ArithmeticCombinator';
import { ConstantCombinator } from '../../ConstantCombinator';
import { Fluid, Item } from '../../Items';
import { BlockSpec } from './ratedFactory';
import { SmallElectricPole } from '../../SmallElectricPole';

const plan: string = `
ybU.ybU.ybU.b1U.m1L.amL.---.---.o1R.otR.o2R.ybU.---.---
ybU.ybU.ybU.b2U.m2L.---.---.---.peL.ubU.rcR.itU.d1R.---
ybU.ybU.ybU.b3U.m3L.---.---.---.i2R.sc .i1R.isU.d2R.---
ybU.ybU.ybU.ybU.epl.   .   .   .   .cc .epr.ybU.c1R.---
`;

export function buildRatedFactoryBlock(spec: BlockSpec, supplyBeltMap: SupplyBeltMap): Fbp {

    const { recipe, outputRate } = spec;

    const ringBusIngredients = _.difference(_.keys(recipe.ingredients), _.keys(supplyBeltMap)) as (Item | Fluid)[];

    const builders: EntityBuilders = {

        // Input Sensor - transport belt that reads items it has
        is: () => new TransportBelt({
            readContent: 'hold',
        }), //

        // Loop Throttle - stops belt if there is an item that should be picked off
        it: () => new TransportBelt({
            enableCondition: {
                firstOperand: 'signal-everything', operator: 'ne', secondOperand: 2,
            },
        }), //

        // Product Extractor - inserter that moves produced items from the production unit onto the output belt.
        pe: () => new FastInserter(), //

        // Recycler - a filtered inserter that puts the product from the loop back on the output belt.
        rc: () => spec.features.recycler
            ? new FilterInserter({ filterMode: 'whitelist', filters: [spec.recipe.item] })
            : undefined, //

        ...(spec.features.buffer ? //
            // block uses ingredients from the loop
            {
                // Ingredients Feeder #1 - controlled filtered picker, picks ingredients from the loop bus.
                i1: () => new FilterInserter({
                    filterMode: 'whitelist', setFilterFromCircuit: true,
                }),

                // storage chest - stockpile ingredients.
                sc: () => new WoodenChest(), //

                // Ingredients Feeder #2 - moves ingredients from storage chest to the production unit. 
                i2: () => new FastInserter(), //

                // Decider 1 - outputs 1 for each item on the loop bus.
                d1: () => new HeavisideGate(), //

                // Decider 2 - outputs 1 for items in deficit.
                d2: () => new HeavisideGate(), // 

                // arithmetic combinator (Calculator) - negates incoming numbers, to calculate deficit.
                c1: () => new Inverter(), //

                // Constant Combinator - defines necessary ingredients
                cc: () => new ConstantCombinator({
                    signals: _.map(ringBusIngredients, (ingredient) => ({
                        signal: ingredient, count: recipe.ingredients[ingredient] as number * 2,
                    })),
                }), //
            } : //
            // no ingredients from the loop
            {}),

        // yellow belt
        yb: () => new TransportBelt(), //

        // assembly machine
        am: () => {
            switch (recipe.equipment) {
                case 'assembling-machine':
                    return new AssemblingMachine({ recipe: recipe });
                case 'chemical-plant':
                    return new ChemicalPlant({ recipe: recipe });
                case 'furnace':
                    return new ElectricFurnace();
                default:
                    throw new Error(`Unsupported equipment type: '${ recipe.equipment }'.`);
            }
        }, //

        // Electric Pole - Left
        epl: () => new SmallElectricPole(), // 

        // Electric Pole - Right
        epr: () => new SmallElectricPole(),//

        ...((spec.features.output && outputRate !== undefined) ? // 
            // output block - put output belt
            {
                o1: () => new TransportBelt(), // 
                o2: () => new TransportBelt(), // 
                ot: () => new TransportBelt({
                    enableCondition: {
                        firstOperand: 'signal-T', operator: 'lte', secondOperand: Math.ceil(outputRate * 10),
                    },
                }), //
            } : //
            // not an output - send product downstream
            {
                ot: () => new UndergroundBelt({ beltDirection: 'input' }),
            }),

        // Upstream Belt - incoming production for downstream cluster block, or just a belt  
        ub: () => spec.features.upstreamConnection
            ? new UndergroundBelt({ beltDirection: 'output' })
            : new TransportBelt(), //
    };

    // calculate supply block
    const [supplyBlockBuilders, supplyBlockExports] = buildSupplyBlock(recipe, supplyBeltMap);

    // note: plan builder only handles simple exports in <name>:<entity> format.
    // which is why fluid connection is handled below separately.
    const fbp = planToBlueprint(plan, { ...builders, ...supplyBlockBuilders }, [
        // @formatter:off
        // electricity
        [Network.Electric, 'epl', 'epr'],
        // timer - controls output throttle belt
        ...(spec.features.output ? [[Network.Red, 'epr', 'ot'] as [Network, string, string]] : []),
        // negate storage chest content
        [Network.Red, 'sc', 'c1:input'],
        // connect stockpile min level constant combinator to the loop picker
        [Network.Red, 'cc', 'i1'],
        // connect loop picker to the negated chest content (the result is positive deficit)
        [Network.Red, 'c1:output', 'i1'],
        // pass deficit through Heaviside Gate
        [Network.Red, 'c1:output', 'd2:input'],
        // pass loop belt content through Heaviside Gate (d1)
        [Network.Red, 'is', 'd1:input'],
        // throttle belt is stopped if d1 output and d2 output are both 1 (i.e. it is enabled when sum is not 2)
        [Network.Red, 'd1:output', 'it'],
        [Network.Red, 'd2:output', 'it']        
        // @formatter:on
    ], {
        electricity: 'epl', timer: 'epr', outputBelt: 'ot',
    });

    // Hack: bottom and middle blocks, send production to the downstream block
    // and direction of that entity will depend on the block type.
    // Yet plan builder doesn't support specifying the direction of an entity by a builder.
    // so we post-process it as a one-off.
    _.find(fbp.elements, e => e.entity === fbp.exports['outputBelt'])!.direction =
        spec.features.downstreamConnection ? Direction.Up : Direction.Right;

    for (const exportName in supplyBlockExports) {
        fbp.addExport(exportName, supplyBlockExports[exportName]);
    }
    return fbp;
}

