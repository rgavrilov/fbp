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
    r('plastic-bar', { repeat: 1 }),
    r('copper-cable', { repeat: 1 }),
    r('advanced-circuit', { repeat: 4 }),
]);
