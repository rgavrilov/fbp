﻿import { FactorioRecipeName } from '../recipesExport';
import { repeat } from './repeat';

export const sciencePacksFactory: FactorioRecipeName[] = [
    ...repeat('plastic-bar', 3),
    'electric-engine-unit',
    'sulfur',
    'battery',
    ...repeat('processing-unit', 2),

    'copper-cable',
    'copper-cable',
    'electronic-circuit',
    'copper-cable',
    'electronic-circuit',
    'copper-cable',
    'electronic-circuit',

    'copper-cable',
    ...repeat('advanced-circuit', 4),
    'copper-cable',
    ...repeat('advanced-circuit', 4),
    'iron-gear-wheel',
    ...repeat('automation-science-pack', 1),
    'inserter',
    'transport-belt',
    ...repeat('logistic-science-pack', 2),
    'pipe',
    ...repeat('engine-unit', 3),
    ...repeat('flying-robot-frame', 2),
    ...repeat('low-density-structure', 4),
    ...repeat('utility-science-pack', 2),
    'productivity-module',
    ...repeat('stone-brick', 4),
    'electric-furnace',
    'stone-wall',
    'firearm-magazine',
    'piercing-rounds-magazine',
    'grenade',
    ...repeat('military-science-pack', 1),
    ...repeat('chemical-science-pack', 3),
    'iron-stick',
    'rail',
    ...repeat('production-science-pack', 2),
];