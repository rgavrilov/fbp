import { FactorioRecipeName } from '../recipesExport';
import { SupplyBeltMap } from '../supplySegment';
import _ from 'lodash';
import { block, FactoryBlockSpec, FactoryLayout } from './factory';

const supplyBeltMap: SupplyBeltMap = {
    'copper-plate': 1, //
    'iron-plate': 1, //
    'steel-plate': 2, //
    'electronic-circuit': 2, //
    'coal': 3, //
    'stone': 3, //
    // 'iron-gear-wheel': 1, //
};

const factorySequence: (FactorioRecipeName | FactoryBlockSpec)[] = [
    'iron-gear-wheel',
    'pipe',
    'engine-unit',
    'electric-engine-unit',
    'processing-unit',
    'processing-unit',
    'plastic-bar',
    'plastic-bar',
    'plastic-bar',
    'low-density-structure',
    'low-density-structure',
    'low-density-structure',
    'low-density-structure',
    'low-density-structure',
    'low-density-structure',
    'battery',
    'battery',
    'productivity-module',
    'productivity-module',
    'utility-science-pack',
    'utility-science-pack',
    'flying-robot-frame',
    'flying-robot-frame',
    'stone-brick',
    'stone-brick',
    'electric-furnace',
    'iron-stick',
    'rail',
    'production-science-pack',
    'production-science-pack',
    'copper-cable',
    'copper-cable',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
    'advanced-circuit',
].map(recipe => ({
    recipe: recipe, stockpileIngredientsForContinuousProduction: true, productLimit: 10, ingredientsMultiplier: 3,
}));

export const yellowAndPurpleFactory: FactoryLayout = { supplyBeltMap, factorySequence };