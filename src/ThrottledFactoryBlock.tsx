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
import { DeciderCombinator } from './DeciderCombinator';
import { ConstantCombinator } from './ConstantCombinator';
import { ArithmeticCombinator } from './ArithmeticCombinator';
import { ConnectionPoint } from './ConnectionPoint';
import { UndergroundPipe } from './UndergroundPipe';
import { ChemicalPlant } from './ChemicalPlant';

const supplyBeltMap: Partial<Record<Item | Fluid, number>> = {
    'copper-plate': 1, 'iron-plate': 1, 'steel-plate': 2, 'coal': 3, 'stone': 3,
};

function buildSupplySegment(e: Editor, recipe: Recipe) {
    const ingredients = _.keys(recipe.ingredients) as (Item | Fluid)[];

    e.moveTo(0, 0).addLine(() => new TransportBelt(), Direction.Down, 5);
    e.moveTo(1, 0).addLine(() => new TransportBelt(), Direction.Down, 5);
    e.moveTo(2, 0).addLine(() => new FastTransportBelt(), Direction.Down, 5);

    // figure out which ingredient inserts to use
    const ingredientBelts = _.chain(ingredients).map(i => supplyBeltMap[i]).filter(v => v !== undefined).uniq().value();

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
    }
    if (_.includes(ingredientBelts, 2)) {
        e.moveTo(3, 2).add(new LongHandedInserter(), Direction.Left);
    }
    if (_.includes(ingredientBelts, 1)) {
        e.moveTo(3, 0).add(new FastInserter(), Direction.Left);
    }

    // handle fluids
    const fluidIngredients = _.intersection(fluids, ingredients);
    if (recipe.equipment === 'assembling-machine' && fluidIngredients.length > 0) {
        // add pipe
        e.moveTo(3, 1);
        e.add(new UndergroundPipe(), Direction.Right);
    } else if (recipe.equipment === 'chemical-plant') {
        e.moveTo(3, 0);
        e.add(new UndergroundPipe(), Direction.Right);
        if (fluidIngredients.length === 2) {
            e.d().d();
            e.add(new UndergroundPipe(), Direction.Right);
        }
    }
}

const ingredientsOverstockMultiplier = 10;

export function buildFactoryBlock(recipe: Recipe) {

    const blockProductSignal = recipe.item;

    const fbp = new Fbp('block');
    const e = new Editor(fbp);

    buildSupplySegment(e, recipe);

    // electric poles
    e.moveTo(4, 3);
    const demandPole = new ElectricPole();
    e.fbp.addPublicConnectionPoint('demand', new ConnectionPoint(demandPole));
    e.add(demandPole);
    e.r().r();
    const controlPole = new ElectricPole();
    fbp.addPublicConnectionPoint('control', new ConnectionPoint(controlPole));
    e.add(controlPole);
    fbp.addElectricConnection(demandPole, controlPole);
    fbp.addPublicPole('demand', demandPole);
    fbp.addPublicPole('control', controlPole);

    // production segment
    e.moveTo(4, 0);
    switch (recipe.equipment) {
        case 'assembling-machine':
            e.add(new AssemblingMachine({ recipe: recipe }), Direction.Left);
            break;
        case 'chemical-plant':
            e.add(new ChemicalPlant({ recipe: recipe }), Direction.Left);
            break;
    }

    e.r().add(new FastInserter(), Direction.Right);
    e.d().add(new FastInserter(), Direction.Right);
    const productExtractor = new FastInserter({
        enabledCondition: {
            firstOperand: blockProductSignal, secondOperand: 50, operator: 'lt',
        },
    });
    e.d().add(productExtractor, Direction.Left);
    const productChest = new WoodenChest();
    e.r().add(productChest);
    const ingredientChest1 = new WoodenChest();
    e.u().add(ingredientChest1);
    const ingredientChest2 = new WoodenChest();
    e.u().add(ingredientChest2);
    e.fbp.addConnection(Network.Red, productExtractor, productChest);

    // production bus interface
    e.moveTo(9, 0);
    const ingredientPicker1 = new FilterInserter({ setFilterFromCircuit: true });
    e.add(ingredientPicker1, Direction.Right);
    const ingredientPicker2 = new FilterInserter({ setFilterFromCircuit: true });
    e.d().add(ingredientPicker2, Direction.Right);
    const productRecoverPicker = new FilterInserter({
        filters: [recipe.item], enabledCondition: {
            firstOperand: blockProductSignal, secondOperand: 0, operator: 'lte',
        },
    });
    e.d().add(productRecoverPicker, Direction.Right);
    e.d().l().add(new FastInserter(), Direction.Up);
    const productOutputBelt = new TransportBelt({
        enableCondition: {
            firstOperand: 'signal-T', operator: 'lt', secondOperand: blockProductSignal,
        },
    });
    e.d().add(productOutputBelt, Direction.Right);
    const throttlingBelt = new TransportBelt({
        enableCondition: {
            firstOperand: 'signal-T', operator: 'lt', secondOperand: blockProductSignal,
        },
    });
    e.r().add(throttlingBelt, Direction.Right);

    // controllers
    const demandFilter = new DeciderCombinator({
        condition: {
            firstOperand: 'signal-each', operator: 'gt', secondOperand: 0,
        }, outputSignal: 'signal-each', copyCountFromInput: true,
    });
    e.moveTo(5, 3).add(demandFilter, Direction.Up);

    // ingredients constant
    const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap));
    const ingredientsConstant = new ConstantCombinator({
        signals: _.map(nonBusIngredients, (quantity, item) => ({
            signal: item, count: -quantity! * ingredientsOverstockMultiplier,
        })),
    });
    e.r().d().add(ingredientsConstant);

    const deficitCalculator = new ArithmeticCombinator({
        firstOperand: 'signal-each', operation: '*', secondOperand: -1, outputSignal: 'signal-each',
    });
    e.r().u().add(deficitCalculator);

    //// connections

    // calculate deficit ingredients
    e.fbp.addConnection(Network.Red, ingredientsConstant, deficitCalculator.input);
    e.fbp.addConnection(Network.Red, deficitCalculator.input, ingredientChest1);
    e.fbp.addConnection(Network.Red, deficitCalculator.input, ingredientChest2);

    // provide deficits to ingredients extractors
    e.fbp.addConnection(Network.Red, deficitCalculator.output, ingredientPicker1);
    e.fbp.addConnection(Network.Red, deficitCalculator.output, ingredientPicker2);

    // send deficit to global network
    e.fbp.addConnection(Network.Red, deficitCalculator.output, demandFilter.input);
    e.fbp.addConnection(Network.Red, demandFilter.output, demandPole);

    // use global demand to control product
    e.fbp.addConnection(Network.Red, controlPole, productOutputBelt);
    e.fbp.addConnection(Network.Red, controlPole, productRecoverPicker);

    // control-network, green wire : throttle product output
    e.fbp.addConnection(Network.Green, controlPole, throttlingBelt);

    // bus
    e.moveTo(10, 0).addLine(() => new TransportBelt(), Direction.Down, 5);
    e.r().addLine(() => new TransportBelt(), Direction.Up, 5);

    return fbp;
}
