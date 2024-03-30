import { fluids } from './Items';
import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { TransportBelt } from './transportBelts';
import _ from 'lodash';
import { FastInserter, FilterInserter } from './inserters';
import { AssemblingMachine } from './AssemblingMachine';
import { Recipe } from './Recipe';
import { WoodenChest } from './WoodenChest';
import { Network, Signal } from './circuit';
import { ElectricPole } from './ElectricPole';
import { ConstantCombinator } from './ConstantCombinator';
import { ArithmeticCombinator, Inverter } from './ArithmeticCombinator';
import { planToBlueprint } from './PlanBuilder';
import { DeciderCombinator, PositiveDetector, PositiveFilter } from './DeciderCombinator';
import { ChemicalPlant } from './ChemicalPlant';
import { ElectricFurnace } from './ElectricFurnace';
import { buildSupplySegment, SupplyBeltMap } from './supplySegment';
import { FactoryBlockSpec } from './factories/factory';

/*
am - assembly table
bb - bus-back, reverse loop on the main buss
bp - belt pole - transactions: red - consumption from the ring belt, green - output to the ring belt
bs - bus belt 1 (sensor)
bt - bus belt 2 (throttle)
cc - ingredients constant combinator
df - demand filter
dp - demand pole - red - global demand
ia - ingredients arithmetic
ic - ingredients chest
ii - ingredient inserter
ip - ingredients picker
mf - multiplier filter - passes through positive product count from the demand line
mm - multiplier multiplier - multiplies product demand (from mf) by ingredient demand count 
ms# - raw material spot 1, 2, 3
pc - product chest
pd - product dispenser
pe - product extractor
pf - pick-up filter, decider that isolates ingr pick-up inserter from being controlled from the bus-trans network
rb - down, red, belt
ti - throttle ingredients
ts - throttle sensor
yb - down, yellow, belt
 */
const planString: string = `
ybD.ybD.ybD.rbD.m1#.amL.---.---.iiR.ic .ipR.bsD.tsD.mfD.   .   .
ybD.ybD.ybD.rbD.m2#.---.---.---.iaR.---.cc .btD.---.---.   .   .
ybD.ybD.ybD.rbD.m3#.---.---.---.peL.pc .pdL.ybD.tiU.mmD.   .   .
ybD.ybD.ybD.rbD.   .bp .pfL.   .dfR.---.dp .ybD.---.---.   .   .
`;


export function onDemandFactoryBlock(recipe: Recipe,
    blockSpec: FactoryBlockSpec,
    supplyBeltMap: SupplyBeltMap,
    options?: {
        includeReverseBus?: boolean, busLength?: number, ingredientsDistances?: { [item: string]: number }
    },
): Fbp {
    const fbp = planToBlueprint(planString, {
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
        },
        yb: () => new TransportBelt(),
        rb: () => new TransportBelt(), // new FastTransportBelt(),
        bp: () => new ElectricPole(),
        dp: () => new ElectricPole(),
        cc: () => {
            if (recipe.craftingTime === undefined) {
                throw new Error(`Recipe ${ recipe.item } doesn't have crafting time set.`);
            }
            const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap).concat(fluids));


            // get ingredient count, potentially accounting for the distance to the supplying block 
            function getIngredientCount(quantity: number, distance: number) {
                const yellowTransporterBeltSpeed = 1.875;
                const blockSize = 4;
                return Math.ceil(quantity * (1 +
                    ((blockSpec.stockpileIngredientsForContinuousProduction ?? false) ? distance * blockSize /
                        yellowTransporterBeltSpeed / recipe.craftingTime : 0)));
            }

            const ingredientsCountSignals = _.map(nonBusIngredients as { [key: string]: number },
                (quantity: number, item: string) => {
                    quantity *= blockSpec.ingredientsMultiplier ?? 1;
                    return ({
                        signal: item,
                        count: -1 *
                            (blockSpec.stockpileIngredientsForContinuousProduction ? getIngredientCount(quantity,
                                options?.ingredientsDistances?.[item] ?? 30,
                            ) : quantity),
                    });
                },
            );
            const productCount: { signal: Signal, count: number } = {
                signal: recipe.item, count: 1,
            };

            const ingredientsConstant = new ConstantCombinator({
                signals: [...ingredientsCountSignals, productCount],
            });
            return ingredientsConstant;
        },
        ii: () => new FastInserter(),
        ic: () => new WoodenChest(),
        pc: () => new WoodenChest(),
        ip: () => new FilterInserter({
            setFilterFromCircuit: true, readHandContent: 'pulse',
        }),
        ia: () => new Inverter(),
        df: () => new PositiveFilter(),
        pf: () => new PositiveFilter(),
        pe: () => new FastInserter({
            enabledCondition: {
                firstOperand: recipe.item, secondOperand: blockSpec.productLimit, operator: 'lt',
            },
        }),
        pd: () => new FastInserter({
            enabledCondition: {
                firstOperand: recipe.item, operator: 'gt', secondOperand: 0,
            }, readHandContent: 'pulse', stackSizeSignal: recipe.item,
        }),
        bs: () => new TransportBelt({ readContent: 'hold' }),
        bt: () => new TransportBelt({
            enableCondition: {
                firstOperand: 'signal-everything', operator: 'ne', secondOperand: 2,
            },
        }),
        ts: () => new PositiveDetector(),
        ti: () => new PositiveDetector(),
        bb: () => options?.includeReverseBus !== false ? new TransportBelt() : undefined,
        mf: () => new DeciderCombinator({
            condition: { firstOperand: recipe.item, operator: 'gt', secondOperand: 0 },
            // outputSignal: recipe.item,
            outputSignal: 'signal-T',
            copyCountFromInput: true,
        }),
        mm: () => new ArithmeticCombinator({
            firstOperand: 'signal-each', operation: '*', secondOperand: recipe.item, outputSignal: 'signal-each',
        }),
    }, [
        [Network.Electric, 'bp', 'dp'],
        [Network.Red, 'ip', 'pf:input'],
        [Network.Red, 'pf:output', 'bp'],
        [Network.Red, 'df:output', 'pd'],
        [Network.Green, 'ia:output', 'ip'],
        [Network.Red, 'dp', 'pd'],

        [Network.Red, 'cc', { id: 'mm', circuit: 'input' }],
        [Network.Red, 'dp', { id: 'mf', circuit: 'input' }],
        [Network.Red, { id: 'mf', circuit: 'output' }, { id: 'mm', circuit: 'input' }],
        [Network.Red, { id: 'mm', circuit: 'output' }, { id: 'ia', circuit: 'input' }],

        [Network.Red, 'ic', { id: 'ia', circuit: 'input' }],
        [Network.Red, { id: 'ia', circuit: 'output' }, { id: 'df', circuit: 'input' }],
        [Network.Green, { id: 'ia', circuit: 'output' }, { id: 'ti', circuit: 'input' }],
        [Network.Red, 'pe', 'pc'],
        [Network.Green, 'bs', { id: 'ts', circuit: 'input' }],
        [Network.Green, 'bs', { id: 'ts', circuit: 'input' }],
        [Network.Green, 'pd', 'bp'],
        [Network.Green, { id: 'ts', circuit: 'output' }, 'bt'],
        [Network.Green, { id: 'ti', circuit: 'output' }, 'bt'],
    ], {
        busTransactions: 'bp', demand: 'dp',
    });

    // add supply
    buildSupplySegment(new Editor(fbp), recipe, supplyBeltMap);

    return fbp;
}
