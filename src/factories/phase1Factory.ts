import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import _ from 'lodash';
import { Segment, block, FactoryBlockSpec } from './factory';

export const supplyBeltMap: SupplyBeltMap = {
    'iron-plate': 1, //
    'copper-plate': 1, //
    'electronic-circuit': 2, //
    'iron-gear-wheel': 2, //
    'steel-plate': 3, //
    'coal': 3, //
    // 'advanced-circuit': 3, //
    'stone': 4, //
};

const segments: Segment[] = ['blue-belts'];

const b = _.partial(block, segments);

export const factorySequence: (FactorioRecipeName | FactoryBlockSpec)[] = _.flatten([
    // first block can't have fluid supply because of the pipe arrangement
    {
        recipe: 'transport-belt',
        ingredientsMultiplier: 3,
        productLimit: 100,
        stockpileIngredientsForContinuousProduction: true,
    } as FactoryBlockSpec,
    {
        recipe: 'underground-belt',
        ingredientsMultiplier: 1,
        productLimit: 20,
        stockpileIngredientsForContinuousProduction: true,
    } as FactoryBlockSpec,
    'splitter',
    'plastic-bar',
    'plastic-bar',
    'fast-transport-belt',
    'fast-underground-belt',
    'fast-splitter',
    'express-transport-belt',
    'express-underground-belt',
    'express-splitter',
    'battery',
    'battery',
    'battery',
    'copper-cable',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'assembling-machine-1',
    'assembling-machine-2',
    'inserter',
    'fast-inserter',
    'long-handed-inserter',
    'stack-inserter',
    'filter-inserter',
    'accumulator',
    'electric-furnace',
    'electric-mining-drill',
    'engine-unit',
    'green-wire',
    'red-wire',
    'arithmetic-combinator',
    'constant-combinator',
    'decider-combinator',
    'gun-turret',
    'iron-chest',
    'iron-stick',
    'repair-pack',
    'ammo-nano-termites',
    'ammo-nano-constructors',
    'big-electric-pole',
    'medium-electric-pole',
    'pipe',
    'pipe-to-ground',
    'pump',
    'rail-chain-signal',
    'rail-signal',
    'steel-chest',
    'stone-brick',
    'stone-wall',
    'gate',
    'substation',
    'rail',
]);

export const factoryLayout = { supplyBeltMap, factorySequence };