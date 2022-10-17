import { Fluid, fluids, Item } from './Items';
import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { FastTransportBelt, TransportBelt } from './transportBelts';
import { Direction } from './Direction';
import _ from 'lodash';
import { Splitter } from './Splitter';
import { UndergroundBelt } from './UndergroundBelt';
import { FastInserter, FilterInserter, LongHandedInserter } from './inserters';
import { AssemblingMachine } from './AssemblingMachine';
import { Recipe } from './Recipe';
import { WoodenChest } from './WoodenChest';
import { Network } from './circuit';
import { ElectricPole } from './ElectricPole';
import { ConstantCombinator } from './ConstantCombinator';
import { Inverter } from './ArithmeticCombinator';
import { UndergroundPipe } from './UndergroundPipe';
import { planToBlueprint } from './PlanBuilder';
import { PositiveDetector, PositiveFilter } from './DeciderCombinator';


const supplyBeltMap: Partial<Record<Item | Fluid, number>> = {
    'copper-plate': 1, 'iron-plate': 1, 'steel-plate': 2, 'electronic-circuit': 2, 'coal': 3, 'stone': 3,
};

function useNextAvailableSpot(availableSpots: Record<string, boolean>): number {
    const availableSpot = Number(_.findKey(availableSpots, spot => spot));
    if (isNaN(availableSpot)) {
        throw new Error('No available spots.');
    }
    availableSpots[availableSpot] = false;
    return availableSpot;
}

function buildSupplySegment(e: Editor, recipe: Recipe) {
    const ingredients = _.keys(recipe.ingredients) as (Item | Fluid)[];

    e.moveTo(0, 0).addLine(() => new TransportBelt(), Direction.Down, 4);
    e.moveTo(1, 0).addLine(() => new TransportBelt(), Direction.Down, 4);
    e.moveTo(2, 0).addLine(() => new FastTransportBelt(), Direction.Down, 4);

    // figure out which ingredient inserts to use
    const ingredientBelts = _.chain(ingredients).map(i => supplyBeltMap[i]).filter(v => v !== undefined).uniq().value();

    const availableSpots: Record<string, boolean> = { 1: true, 2: true, 3: true };

    // need to reach 3rd belt. Need to break the first belt to put long-handed inserter.
    if (_.includes(ingredientBelts, 3)) {
        e.remove(0, 1);
        e.remove(1, 1);
        e.remove(1, 0);
        e.remove(1, 2);
        // add splitter
        e.moveTo(0, 1).add(new Splitter(), Direction.Down);
        // add underground belt
        e
            .moveTo(1, 0)
            .add(new UndergroundBelt({ beltDirection: 'input' }), Direction.Down)
            .moveTo(1, 2)
            .add(new UndergroundBelt({ beltDirection: 'output' }), Direction.Down);
        e.moveTo(3, 1).add(new LongHandedInserter(), Direction.Left);
        // this inserter can only go to the second spot to align with splitter
        availableSpots[2] = false;
    }

    // handle fluids
    const fluidIngredients = _.intersection(fluids, ingredients) as Fluid[];
    if (recipe.equipment === 'assembling-machine' && fluidIngredients.length > 0) {
        // add pipe
        e.moveTo(3, 1);
        const undergroundPipe = new UndergroundPipe();
        e.add(undergroundPipe, Direction.Right);
        // assembly machine with fluid has fixed pipe position
        availableSpots[2] = false;
        e.fbp.addExport('pipe1', { fluid: fluidIngredients[0], entity: undergroundPipe });
    } else if (recipe.equipment === 'chemical-plant') {

        const fluidPositions: { [item in Item]?: ([Fluid] | [Fluid, Fluid]) } = {
            'sulfur': ['petroleum-gas', 'water'],
            'battery': ['sulfuric-acid'],
            'plastic-bar': ['petroleum-gas'],
            'explosives': ['water'],
            'solid-fuel': ['light-oil'],
        };
        const recipeFluids = fluidPositions[recipe.item]!;

        if (recipeFluids.length >= 1) {
            e.moveTo(3, 0);
            const chemicalPlantPipe1 = new UndergroundPipe();
            e.add(chemicalPlantPipe1, Direction.Right);
            e.fbp.addExport('pipe1', { fluid: recipeFluids[0], entity: chemicalPlantPipe1 });
            availableSpots[1] = false;
        }
        if (recipeFluids.length >= 2) {
            e.d().d();
            const chemicalPlantPipe2 = new UndergroundPipe();
            e.add(chemicalPlantPipe2, Direction.Right);
            e.fbp.addExport('pipe2', { fluid: recipeFluids[1], entity: chemicalPlantPipe2 });
            availableSpots[3] = false;
        }
    }

    if (_.includes(ingredientBelts, 2)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(3, spot - 1).add(new LongHandedInserter(), Direction.Left);
    }

    if (_.includes(ingredientBelts, 1)) {
        const spot = useNextAvailableSpot(availableSpots);
        e.moveTo(3, spot - 1).add(new FastInserter(), Direction.Left);
    }
}

const ingredientsOverstockMultiplier = 10;

/*
yb  - down, yellow, belt
rb  - down, red, belt
ms# - raw material spot 1, 2, 3
am  - assembly table
ii  - ingredient inserter
ic  - ingredients chest
ip  - ingredients picker
bs  - bus belt 1 (sensor)
bt  - bus belt 2 (throttle)
pe  - product extractor
pc  - product chest
pd  - product dispenser
dp  - demand pole
df  - demand filter
cp  - control pole
ia  - ingredients arithmetic
cc  - ingredients constant combinator
tsd - throttle sensor
tid - throttle ingredients
 */
const planString: string = `
ybD.ybD.rbD.m1#.am .---.---.iiR.ic .ipR.bsD.tsD.ybU.
ybD.ybD.rbD.m2#.---.---.---.peL.pc .pdL.btD.---.ybU.
ybD.ybD.rbD.m3#.---.---.---.iaU.dfU.   .ybD.tiU.ybU.
ybD.ybD.rbD.   .dp .   .cc .-- .-- .cp .ybD.---.ybU.
`;

export function onDemandFactoryBlock(recipe: Recipe): Fbp {
    return planToBlueprint(planString, {
        am: () => new AssemblingMachine({ recipe: recipe }),
        yb: () => new TransportBelt(),
        rb: () => new FastTransportBelt(),
        dp: () => new ElectricPole(),
        cp: () => new ElectricPole(),
        cc: () => {
            const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap).concat(fluids));
            const ingredientsConstant = new ConstantCombinator({
                signals: _.map(nonBusIngredients, (quantity, item) => ({
                    signal: item, count: -quantity! * ingredientsOverstockMultiplier,
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
        pe: () => new FastInserter({
            enabledCondition: {
                firstOperand: recipe.item, secondOperand: 50, operator: 'lt',
            },
        }),
        pd: () => new FastInserter(),
        bs: () => new TransportBelt(),
        bt: () => new TransportBelt(),
        ts: () => new PositiveDetector(),
        ti: () => new PositiveDetector(),
    }, [
        [Network.Electric, 'dp', 'cp'],//
        [Network.Red, 'ip', 'dp'],//
        [Network.Red, { id: 'df', circuit: 'output' }, 'pd'],//
        [Network.Green, { id: 'ia', circuit: 'output' }, 'ip'],//
        [Network.Red, 'cp', 'pd'],
        [Network.Red, 'cc', { id: 'ia', circuit: 'input' }],
        [Network.Red, 'ic', { id: 'ia', circuit: 'input' }],
        [Network.Red, { id: 'ia', circuit: 'output' }, { id: 'df', circuit: 'input' }],
        [Network.Green, { id: 'ia', circuit: 'output' }, { id: 'ti', circuit: 'input' }],
        [Network.Red, 'pe', 'pc'],
        [Network.Green, 'bs', { id: 'ts', circuit: 'input' }],
        [Network.Green, 'bs', { id: 'ts', circuit: 'input' }],
        [Network.Green, 'pd', 'dp'],

        [Network.Green, { id: 'ts', circuit: 'output' }, 'bt'],
        [Network.Green, { id: 'ti', circuit: 'output' }, 'bt'],


    ], {
        demand: 'dp', control: 'cp',
    });
}
