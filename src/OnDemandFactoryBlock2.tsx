import { fluids } from './Items';
import { Fbp } from './Fbp';
import { Editor } from './Editor';
import { TransportBelt } from './transportBelts';
import { Direction } from './Direction';
import _ from 'lodash';
import { FastInserter, FilterInserter } from './inserters';
import { AssemblingMachine } from './AssemblingMachine';
import { Recipe } from './Recipe';
import { WoodenChest } from './WoodenChest';
import { Network } from './circuit';
import { ElectricPole } from './ElectricPole';
import { DeciderCombinator, PositiveFilter } from './DeciderCombinator';
import { ConstantCombinator } from './ConstantCombinator';
import { Inverter } from './ArithmeticCombinator';
import { ChemicalPlant } from './ChemicalPlant';
import { ElectricFurnace } from './ElectricFurnace';
import { loadPlan } from './PlanBuilder';
import { buildSupplySegment, supplyBeltMap } from './supplySegment';

const ingredientsOverstockMultiplier = 10;

export function onDemandFactoryBlock2(recipe: Recipe): Fbp {

    const blockProductSignal = recipe.item;

    const fbp = new Fbp('block');
    const e = new Editor(fbp);

    buildSupplySegment(e, recipe);

    const plan = loadPlan(planString);

    // electric poles
    const demandPole = new ElectricPole();
    e.addWithPlan('dp', plan, demandPole, { publicConnection: 'demand', publicPole: 'demand' });

    const controlPole = new ElectricPole();
    e.addWithPlan('cp', plan, controlPole, { publicConnection: 'control', publicPole: 'control' });
    e.addElectricConnectionWithPlan('cp', 'dp');

    // production machine
    e.moveToWithPlan('am', plan);
    switch (recipe.equipment) {
        case 'assembling-machine':
            e.add(new AssemblingMachine({ recipe: recipe }), Direction.Left, 'am');
            break;
        case 'chemical-plant':
            e.add(new ChemicalPlant({ recipe: recipe }), Direction.Left, 'am');
            break;
        case 'furnace':
            e.add(new ElectricFurnace(), Direction.Left, 'am');
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
    // e.moveTo(7, 1);
    const productExtractor = new FastInserter({
        enabledCondition: {
            firstOperand: blockProductSignal, secondOperand: 50, operator: 'lt',
        },
    });
    // e.add(productExtractor, Direction.Left);
    e.addWithPlan('pe', plan, productExtractor);

    const productChest = new WoodenChest();
    // e.r().add(productChest);
    e.addWithPlan('pc', plan, new WoodenChest());

    const productDispenser = new FastInserter({
        enabledCondition: {
            firstOperand: blockProductSignal, operator: 'gt', secondOperand: 0,
        }, readHandContent: 'pulse', stackSizeSignal: blockProductSignal,
    });
    // e.r().add(productDispenser, Direction.Left);
    e.addWithPlan('pd', plan, productDispenser);
    // e.fbp.addConnection(Network.Red, productExtractor, productChest);
    e.addConnectionWithPlan(Network.Red, plan, 'pe', 'pc');


    // bus
    const busThrottleSensorBelt = new TransportBelt({ readContent: 'hold' });
    e.moveTo(10, 0);
    e.add(busThrottleSensorBelt, Direction.Down);

    const busThrottleThrottleBelt = new TransportBelt({
        enableCondition: {
            firstOperand: 'signal-everything', operator: 'ne', secondOperand: 2,
        },
    });
    e.d();
    e.add(busThrottleThrottleBelt, Direction.Down);

    e.d().addLine(() => new TransportBelt(), Direction.Down, 2);
    e.r(2).addLine(() => new TransportBelt(), Direction.Up, 4);

    // deficit calculator: calculate what ingredients are needed
    const deficitCalculator = new Inverter();
    e.moveTo(7, 2).add(deficitCalculator);

    // controllers - output positive demand only
    const demandFilter = new PositiveFilter();
    const df = plan.elements.get('df')!;
    // e.moveTo(5, 3);
    e.moveTo(df.position);
    e.add(demandFilter, df.direction);

    // ingredients constant
    const nonBusIngredients = _.omit(recipe.ingredients, _.keys(supplyBeltMap).concat(fluids));
    const ingredientsConstant = new ConstantCombinator({
        signals: _.map(nonBusIngredients, (quantity, item) => ({
            signal: item, count: -quantity! * ingredientsOverstockMultiplier,
        })),
    });
    const cc = plan.elements.get('cc')!;
    e.moveTo(cc.position);
    // e.moveTo(9, 2);
    e.add(ingredientsConstant);

    // invert ingredient pick transactions
    // const ingredientTransactionInverter = new Inverter();
    // e.moveTo(8, 2).add(ingredientTransactionInverter);

    // add bus throttle
    const busThrottleBusContentDecider = new DeciderCombinator({
        condition: { firstOperand: 'signal-each', operator: 'gt', secondOperand: 0 },
        outputSignal: 'signal-each',
        copyCountFromInput: false,
    });
    e.moveTo(11, 0);
    e.add(busThrottleBusContentDecider, Direction.Down);

    const busThrottleDemandDecider = new DeciderCombinator({
        condition: { firstOperand: 'signal-each', operator: 'gt', secondOperand: 0 },
        outputSignal: 'signal-each',
        copyCountFromInput: false,
    });
    e.moveTo(11, 2);
    e.add(busThrottleDemandDecider, Direction.Up);

    // // sensor circuit
    // e.fbp.addConnection(Network.Green, busThrottleSensorBelt, busThrottleBusContentDecider.input);
    // e.fbp.addConnection(Network.Green, busThrottleBusContentDecider.output, busThrottleThrottleBelt);
    //
    // // throttle circuit
    // e.fbp.addConnection(Network.Green, ingredientPicker1, busThrottleDemandDecider.input);
    // e.fbp.addConnection(Network.Green, busThrottleDemandDecider.output, busThrottleThrottleBelt);
    //
    // //// connections
    //
    // // calculate deficit ingredients
    // e.fbp.addConnection(Network.Red, ingredientsConstant, deficitCalculator.input);
    // e.fbp.addConnection(Network.Red, ingredientChest1, deficitCalculator.input);
    //
    // // provide deficits to ingredients picker
    // e.fbp.addConnection(Network.Green, deficitCalculator.output, ingredientPicker1);
    //
    // // send deficit to global network
    // e.fbp.addConnection(Network.Red, deficitCalculator.output, demandFilter.input);
    // e.fbp.addConnection(Network.Red, demandFilter.output, demandPole);
    //
    // // use global demand to dispense product
    // e.fbp.addConnection(Network.Red, controlPole, productDispenser);
    //
    // // send transactions to demand network
    // // e.fbp.addConnection(Network.Red, ingredientPicker1, ingredientTransactionInverter.input);
    // // e.fbp.addConnection(Network.Green, ingredientTransactionInverter.output, demandPole);
    // e.fbp.addConnection(Network.Green, productDispenser, demandPole);

    return fbp;
}
