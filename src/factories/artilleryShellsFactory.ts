import { FactorioRecipeName } from '../recipesExport';
import { block } from './factory';
import { SupplyBeltMap } from '../supplySegment';

export const supplyBeltMap: SupplyBeltMap = {
    'copper-plate': 1, //
    'iron-plate': 1, //
    'steel-plate': 2, //
    // 'electronic-circuit': 2, //
    'coal': 2, //
    // 'stone': 3, //
    // 'iron-gear-wheel': 1, //
};

export const factory: FactorioRecipeName[] = [
    'copper-cable',
    'iron-gear-wheel',
    'electronic-circuit',
    'radar',
    'sulfur',
    ...block('explosives', { repeat: 3 }),
    'plastic-bar',
    ...block('explosive-cannon-shell', { repeat: 3 }),
    'artillery-shell',
];
