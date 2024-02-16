import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import { repeat } from './repeat';
import _ from 'lodash';

export const mallSequence1SupplyBeltMap: SupplyBeltMap = {
    'iron-plate': 1, //
    'copper-plate': 1, //
    'electronic-circuit': 2, //
    'iron-gear-wheel': 2, //
    'steel-plate': 3, //
    // 'advanced-circuit': 3, //
    'coal': 4, //
    'stone': 4, //
};

type Segment = 'nuclear' | 'blue-belts' | 'networks';
const segments: Segment[] = ['blue-belts'];

const r = (recipe: FactorioRecipeName, options?: { repeat?: number, segment?: Segment }) => {
    if (options?.segment && !segments.includes(options.segment)) {
        return [reserve];
    }

    return options?.repeat !== undefined ? repeat(recipe, options.repeat) : recipe;
};

const reserve: FactorioRecipeName = 'wooden-chest';

export const mallSequence1: FactorioRecipeName[] = _.flatten([
    // first block can't have fluid supply because of the pipe arrangement
    reserve,

    r('express-transport-belt', { segment: 'blue-belts' }),
    r('express-underground-belt', { segment: 'blue-belts' }),
    r('express-splitter', { segment: 'blue-belts' }),

    // fluid ingredients
    'sulfur',
    'plastic-bar',
    'processing-unit',
    'explosives',
    reserve,
    r('battery', { repeat: 6 }),
    reserve,
    reserve,
    reserve,

    'engine-unit',
    'electric-engine-unit',

    // parts
    // 'copper-cable',
    // 'copper-cable',
    // 'electronic-circuit',
    // 'copper-cable',
    // 'electronic-circuit',
    // 'copper-cable',
    // 'copper-cable',
    // 'electronic-circuit',
    // 'copper-cable',
    // 'electronic-circuit',
    'copper-cable',
    r('advanced-circuit', { repeat: 6 }),
    reserve,
    reserve,
    // r('iron-gear-wheel', {repeat:3}),

    // belts
    'transport-belt',
    'underground-belt',
    'splitter',

    'fast-transport-belt',
    'fast-underground-belt',
    'fast-splitter',

    // inserters
    // 'iron-gear-wheel',
    'inserter',
    'fast-inserter',
    'long-handed-inserter',
    'filter-inserter',
    'stack-inserter',
    reserve, // 'stack-filter-inserter',

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
    // 'iron-gear-wheel',
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
    'assembling-machine-3',

    // smelting
    'stone-brick',
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

    // robots
    'flying-robot-frame',
    'construction-robot',
    'logistic-robot',

    // military
    'stone-brick',
    'stone-wall',
    // 'gate'
    'grenade',
    'firearm-magazine',
    'piercing-rounds-magazine',
    'poison-capsule',
    'slowdown-capsule',
    'defender-capsule',
    reserve,
    reserve, // 'destroyer-capsule',
    reserve, // 'distractor-capsule',
    'laser-turret',

    // misc
    'empty-barrel',
    'cliff-explosives',
    'steel-chest',
    'iron-stick',
    'repair-pack',
    'ammo-nano-termites',
    'ammo-nano-constructors',

    // nuclear-power
    r('heat-pipe', { segment: 'nuclear' }),
    r('heat-exchanger', { segment: 'nuclear' }),
    r('steam-turbine', { segment: 'nuclear' }),
    r('centrifuge', { segment: 'nuclear' }),

    r(reserve, { repeat: 21 }),
]);
