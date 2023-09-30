import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import { repeat } from './repeat';
import _ from 'lodash';

export const mallSequence2SupplyBeltMap: SupplyBeltMap = {
    'copper-plate': 3, //
    'iron-plate': 3, //
    'steel-plate': 2, //
    'electronic-circuit': 2, //
    'coal': 1, //
    // 'stone': 1, //
    'iron-gear-wheel': 1, //
};

export const mallSequence1SupplyBeltMap: SupplyBeltMap = {
    'copper-plate': 1, //
    'iron-plate': 1, //
    'steel-plate': 2, //
    'electronic-circuit': 2, //
    'coal': 3, //
    // 'stone': 3, //
    'iron-gear-wheel': 3, //
};

const stage = 1;
type Segment = 'nuclear' | 'blue-belts' | 'networks';
const segments: Segment[] = [];

const r = (recipe: FactorioRecipeName, options?: { repeat?: number, stage?: number, segment?: Segment }) => {
    if (options?.stage !== undefined && options.stage > stage) {
        return [];
    }

    if (options?.segment && !segments.includes(options.segment)) {
        return [];
    }

    return options?.repeat !== undefined ? repeat(recipe, options.repeat) : recipe;
};

export const mallSequence3: FactorioRecipeName[] = _.flatten([
    r('battery', {repeat: 5}),
    r('electric-engine-unit', { repeat: 2 }),
    'express-transport-belt',
    'express-transport-belt',
]);


export const mallSequence2: FactorioRecipeName[] = _.flatten([
    'iron-stick',
    'copper-cable',
    'copper-cable',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'transport-belt',
    'underground-belt',
    'splitter',

    'fast-transport-belt',
    'fast-underground-belt',
    'fast-splitter',
]);


export const mallSequence1: FactorioRecipeName[] = _.flatten([
    'stone-brick',

    // fluid ingredients
    'sulfur',
    'plastic-bar',
    // 'processing-unit',
    r('express-transport-belt', { segment: 'blue-belts' }),
    r('express-underground-belt', { segment: 'blue-belts' }),
    r('express-splitter', { segment: 'blue-belts' }),
    'explosives',
    'battery',
    'electric-engine-unit',

    // parts
    'copper-cable',
    'copper-cable',
    'electronic-circuit',
    'copper-cable',
    'electronic-circuit',
    'advanced-circuit',
    'iron-gear-wheel',

    // belts
    'transport-belt',
    'underground-belt',
    'splitter',

    'fast-transport-belt',
    'fast-underground-belt',
    'fast-splitter',

    // inserters
    'iron-gear-wheel',
    'inserter',
    'fast-inserter',
    'long-handed-inserter',
    'filter-inserter',
    'stack-inserter',
    // 'stack-filter-inserter',

    // poles
    'iron-stick',
    'medium-electric-pole',
    'big-electric-pole',
    'substation',

    // pipes
    'pipe',
    'pipe-to-ground',
    //'pump',
    //'storage-tank',

    // mining
    'iron-gear-wheel',
    'electric-mining-drill',
    // 'pumpjack',

    // chemistry
    // 'chemical-plant',
    // 'oil-refinery',

    // modules
    // 'speed-module',

    // assembly tables
    'assembling-machine-1',
    'assembling-machine-2',
    // 'assembling-machine-3',

    // smelting
    // 'steel-furnace',
    'electric-furnace',

    // rail-road
    // 'rail',
    'rail-signal',
    'rail-chain-signal',
    // 'train-stop',
    // 'locomotive',
    // 'cargo-wagon',
    // 'fluid-wagon'

    // circuit logic
    'copper-cable',
    r('red-wire', { segment: 'networks' }),
    r('green-wire', { segment: 'networks' }),
    r('constant-combinator', { segment: 'networks' }),
    r('arithmetic-combinator', { segment: 'networks' }),
    r('decider-combinator', { segment: 'networks' }),

    // engines
    'engine-unit',

    // robots
    //'flying-robot-frame',
    //'construction-robot',
    //'logistic-robot',

    // military
    //'stone-wall',
    // 'gate'
    'grenade',
    'firearm-magazine',
    'piercing-rounds-magazine',
    'poison-capsule',
    'slowdown-capsule',
    'defender-capsule',
    // 'distractor-capsule',
    // 'destroyer-capsule',
    // 'laser-turret',

    // misc
    'empty-barrel',
    'cliff-explosives',
    //'steel-chest',
    'iron-stick',
    'repair-pack',
    'ammo-nano-termites',
    'ammo-nano-constructors',

    // nuclear-power
    r('heat-pipe', { segment: 'nuclear' }),
    r('heat-exchanger', { segment: 'nuclear' }),
    r('steam-turbine', { segment: 'nuclear' }),
    // 'centrifuge',
]);
