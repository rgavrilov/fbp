import { fluids } from './Items';
import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { FastTransportBelt, TransportBelt } from './transportBelts';
import _ from 'lodash';
import { FastInserter, FilterInserter } from './inserters';
import { AssemblingMachine } from './AssemblingMachine';
import { Recipe } from './Recipe';
import { WoodenChest } from './WoodenChest';
import { Network } from './circuit';
import { ElectricPole } from './ElectricPole';
import { ConstantCombinator } from './ConstantCombinator';
import { Inverter } from './ArithmeticCombinator';
import { planToBlueprint } from './PlanBuilder';
import { PositiveDetector, PositiveFilter } from './DeciderCombinator';
import { ChemicalPlant } from './ChemicalPlant';
import { ElectricFurnace } from './ElectricFurnace';
import { buildSupplySegment, SupplyBeltMap } from './supplySegment';

const overstockMultiplier = 10;

/*
yb - down, yellow, belt
rb - down, red, belt
ms# - raw material spot 1, 2, 3
am - assembly table
ii - ingredient inserter
ic - ingredients chest
ip - ingredients picker
bs - bus belt 1 (sensor)
bt - bus belt 2 (throttle)
pe - product extractor
pc - product chest
pd - product dispenser
bp - belt pole
df - demand filter
dp - demand pole
ia - ingredients arithmetic
cc - ingredients constant combinator
ts - throttle sensor
ti - throttle ingredients
pf - pick-up filter, decider that isolates ingr pick-up inserter from being controlled from the bus-trans network
bb - bus-back, reverse loop on the main buss
 */
const planString: string = `
ybD.ybD.rbD.m1#.amL.---.---.iiR.ic .ipR.bsD.tsD.---.bbU.
ybD.ybD.rbD.m2#.---.---.---.iaR.---.cc .btD.---.---.bbU.
ybD.ybD.rbD.m3#.---.---.---.peL.pc .pdL.ybD.tiU.---.bbU.
ybD.ybD.rbD.   .bp .pfL.   .dfR.---.dp .ybD.---.---.bbU.
`;


export function onDemandFactoryBlock(
    recipe: Recipe,
    supplyBeltMap: SupplyBeltMap,
    options?: { includeReverseBus?: boolean, overstockMultiplier?: number },
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
                throw new Error(`Recipe ${recipe.item} doesn't have crafting time set.`);
            }
            const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap).concat(fluids));
            const ingredientsConstant = new ConstantCombinator({
                signals: _.map(nonBusIngredients, (quantity, item) => ({
                    signal: item, count: -1 * Math.ceil(quantity! * (options?.overstockMultiplier ?? overstockMultiplier) / recipe.craftingTime),
                })),
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
                firstOperand: recipe.item, secondOperand: 5, operator: 'lt',
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
    }, [
        [Network.Electric, 'bp', 'dp'],
        [Network.Red, 'ip', 'pf:input'],
        [Network.Red, 'pf:output', 'bp'],
        [Network.Red, 'df:output', 'pd'],
        [Network.Green, 'ia:output', 'ip'],
        [Network.Red, 'dp', 'pd'],
        [Network.Red, 'cc', { id: 'ia', circuit: 'input' }],
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
