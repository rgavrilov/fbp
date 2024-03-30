import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import { FactoryBlockSpec, FactoryLayout, reserve } from './factory';
import _ from 'lodash';

export const supplyBeltMap: SupplyBeltMap = {
    'iron-plate': 1, //
    'copper-plate': 1, //
    'electronic-circuit': 2, //
    'iron-gear-wheel': 2, //
    'steel-plate': 3, //
    'coal': 3, //
    // 'advanced-circuit': 3, //
    // 'stone': 4, //
};

export const factorySequence: (FactorioRecipeName | FactoryBlockSpec)[] = _.flatten([
    // Note: first block can't have fluid supply because of the pipe arrangement
    'empty-barrel',
    'plastic-bar@100',
    'battery@50',
    'battery@50',
    'battery@50',
    'sulfur',
    'explosives',
    'explosives',
    'explosives',
    'explosive-cannon-shell',
    'artillery-shell',
    'grenade',
    'cliff-explosives',
    'firearm-magazine',
    'piercing-rounds-magazine',
    'piercing-rounds-magazine',
    'defender-capsule',
    'poison-capsule',
    'slowdown-capsule',
    'laser-turret',
    'laser-turret',
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
    reserve,
]);

export const militaryFactoryLayout: FactoryLayout = { supplyBeltMap, factorySequence };