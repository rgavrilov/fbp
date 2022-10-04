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
import { PositiveFilter } from './DeciderCombinator';
import { ConstantCombinator } from './ConstantCombinator';
import { Inverter } from './ArithmeticCombinator';
import { ConnectionPoint } from './ConnectionPoint';
import { UndergroundPipe } from './UndergroundPipe';
import { ChemicalPlant } from './ChemicalPlant';
import { ElectricFurnace } from './ElectricFurnace';
import { Entity } from './Entity';

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

const plan: string = `
dyb.dyb.drb.ms1.am .---.---.ii .ic .ifi.bb1.   .   .   .
dyb.dyb.drb.ms2.---.---.---.pe .pc .pd .bb2.   .   .   .
dyb.dyb.drb.ms3.---.---.---.ii .ic .ifi.dyb.   .   .   .
dyb.dyb.drb.cp .ida.---.   .ii .ic .ifi.dyb.   .   .   .
`;

export function onDemandFactoryBlock(recipe: Recipe): Fbp {

    const blockProductSignal = recipe.item;

    const fbp = new Fbp('block');
    const e = new Editor(fbp);

    buildSupplySegment(e, recipe);

    // electric poles
    const demandPole = new ElectricPole();
    e.moveTo(4, 3);
    e.fbp.addPublicConnectionPoint('demand', new ConnectionPoint(demandPole));
    e.add(demandPole);
    fbp.addPublicPole('demand', demandPole);

    const controlPole = new ElectricPole();
    e.r().r();
    fbp.addPublicConnectionPoint('control', new ConnectionPoint(controlPole));
    e.add(controlPole);
    fbp.addElectricConnection(demandPole, controlPole);
    fbp.addPublicPole('control', controlPole);

    // production machine
    e.moveTo(4, 0);
    switch (recipe.equipment) {
        case 'assembling-machine':
            e.add(new AssemblingMachine({ recipe: recipe }), Direction.Left);
            break;
        case 'chemical-plant':
            e.add(new ChemicalPlant({ recipe: recipe }), Direction.Left);
            break;
        case 'furnace':
            e.add(new ElectricFurnace(), Direction.Left);
            break;
    }

    // ingredients supply chain
    const ingredientChest1 = new WoodenChest();
    e.moveTo(7, 0);
    e.add(new FastInserter(), Direction.Right);
    e.r().add(ingredientChest1);
    const ingredientPicker1 = new FilterInserter({ setFilterFromCircuit: true, readHandContent: 'pulse' });
    e.r().add(ingredientPicker1, Direction.Right);

    // product dispensing
    e.moveTo(7, 1);
    const productExtractor = new FastInserter({
        enabledCondition: {
            firstOperand: blockProductSignal, secondOperand: 50, operator: 'lt',
        },
    });
    e.add(productExtractor, Direction.Left);
    const productChest = new WoodenChest();
    e.r().add(productChest);
    const productDispenser = new FastInserter({
        enabledCondition: {
            firstOperand: blockProductSignal, operator: 'gt', secondOperand: 0,
        }, readHandContent: 'pulse', stackSizeSignal: blockProductSignal,
    });
    e.r().add(productDispenser, Direction.Left);
    e.fbp.addConnection(Network.Red, productExtractor, productChest);

    // bus
    e.moveTo(10, 0).addLine(() => new TransportBelt(), Direction.Down, 4);
    e.r(4).addLine(() => new TransportBelt(), Direction.Up, 4);

    // deficit calculator: calculate what ingredients are needed
    const deficitCalculator = new Inverter();
    e.moveTo(7, 2).add(deficitCalculator);

    // controllers - output positive demand only
    const demandFilter = new PositiveFilter();
    e.moveTo(8, 2).add(demandFilter, Direction.Up);

    // ingredients constant
    const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap).concat(fluids));
    const ingredientsConstant = new ConstantCombinator({
        signals: _.map(nonBusIngredients, (quantity, item) => ({
            signal: item, count: -quantity! * ingredientsOverstockMultiplier,
        })),
    });
    e.moveTo(5, 3).add(ingredientsConstant);

    // invert ingredient pick transactions
    const ingredientTransactionInverter = new Inverter();
    e.moveTo(9, 2).add(ingredientTransactionInverter);

    //// connections

    // calculate deficit ingredients
    e.fbp.addConnection(Network.Red, ingredientsConstant, deficitCalculator.input);
    e.fbp.addConnection(Network.Red, ingredientChest1, deficitCalculator.input);

    // provide deficits to ingredients picker
    e.fbp.addConnection(Network.Green, deficitCalculator.output, ingredientPicker1);

    // send deficit to global network
    e.fbp.addConnection(Network.Red, deficitCalculator.output, demandFilter.input);
    e.fbp.addConnection(Network.Red, demandFilter.output, demandPole);

    // use global demand to dispense product
    e.fbp.addConnection(Network.Red, controlPole, productDispenser);

    // send transactions to demand network
    e.fbp.addConnection(Network.Red, ingredientPicker1, ingredientTransactionInverter.input);
    e.fbp.addConnection(Network.Green, ingredientTransactionInverter.output, demandPole);
    e.fbp.addConnection(Network.Green, productDispenser, demandPole);

    return fbp;
}
