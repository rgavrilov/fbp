import { FactorioRecipeName } from '../recipesExport';
import { repeat as r } from './repeat';
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
    ...r(
        'explosives',
        3,
    ),
    'plastic-bar',
    ...r(
        'explosive-cannon-shell',
        3,
    ),
    'artillery-shell',
];
