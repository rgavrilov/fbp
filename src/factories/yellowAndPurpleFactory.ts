import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import { repeat } from './repeat';
import _ from 'lodash';

export const supplyBeltMap: SupplyBeltMap = {
    'copper-plate': 1, //
    'iron-plate': 1, //
    'steel-plate': 2, //
    'electronic-circuit': 2, //
    'coal': 3, //
    'stone': 3, //
    // 'iron-gear-wheel': 1, //
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

export const blockSequence: FactorioRecipeName[] = _.flatten([
    'electric-engine-unit',
    r('plastic-bar', { repeat: 1 }),
    r('low-density-structure', { repeat: 3 }),
    r('plastic-bar', { repeat: 1 }),
    r('low-density-structure', { repeat: 3 }),
    r('processing-unit',{ repeat: 2 }),
    r('battery', { repeat: 1 }),
    r('copper-cable', { repeat: 1 }),
    r('advanced-circuit', { repeat: 4 }),
    r('copper-cable', { repeat: 1 }),
    r('advanced-circuit', { repeat: 4 }),
    r('utility-science-pack', { repeat: 2 }),
    r('flying-robot-frame', { repeat: 2 }),
    'iron-gear-wheel',
    'pipe',
    'engine-unit',
    r('stone-brick', { repeat: 2 }),
    'electric-furnace',
    r('productivity-module', { repeat: 2 }),
    'iron-stick',
    'rail',
    r('production-science-pack', { repeat: 2 }),
]);
