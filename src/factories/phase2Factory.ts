import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import _ from 'lodash';
import { reserve } from './factory';

export const beltMap: SupplyBeltMap = {
    'iron-plate': 1, //
    'copper-plate': 1, //
    'electronic-circuit': 2, //
    'iron-gear-wheel': 2, //
    'steel-plate': 3, //
    'coal': 3, //
    // 'advanced-circuit': 3, //
    // 'stone': 4, //
};

type Segment = 'nuclear' | 'blue-belts' | 'networks';
const segments: Segment[] = ['blue-belts'];

export const factorySequence: FactorioRecipeName[] = _.flatten([
    // first block can't have fluid supply because of the pipe arrangement
    reserve,
    'plastic-bar',
    'plastic-bar',
    'battery',
    'pipe',
    'engine-unit',
    'engine-unit',
    'electric-engine-unit',
    'electric-engine-unit',
    'copper-cable',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'copper-cable',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'flying-robot-frame',
    'flying-robot-frame',
    'flying-robot-frame',
    'construction-robot',
    'logistic-robot',
    'assembling-machine-1',
    'assembling-machine-2',
    'speed-module',
    'assembling-machine-3',
    'roboport',
    'steel-chest',
    'logistic-chest-passive-provider',
    'logistic-chest-requester',
    'logistic-chest-storage',
    'processing-unit',
]);

export const factory = [beltMap, factorySequence];