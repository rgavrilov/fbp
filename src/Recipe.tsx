import { Fluid, Item } from './Items';
import { FactorioManufacturingTypes, FactorioRecipe, factorioRecipes } from './recipesExport';
import _ from 'lodash';

// Hack: to support a rated factory we use 'collector' as a manufacturing equipment, but it is not really.
type ManufacturingEquipment = 'assembling-machine' | 'oil-refinery' | 'chemical-plant' | 'furnace' | 'collector';

export class Recipe {
    constructor(public item: Item,
        public ingredients: Partial<Record<Item | Fluid, number>>,
        public craftingTime: number,
        public output: number = 1,
        public equipment: ManufacturingEquipment = 'assembling-machine',
    ) {}
}

const toIngredients: (ingredients: {
    amount: number,
    name: Item | Fluid
}[]) => Partial<Record<Item | Fluid, number>> = (ingredients) => {
    return _.chain(ingredients)
        .keyBy('name')
        .mapValues('amount')
        .value();
};

const categoryToEquipmentMap: Partial<Record<FactorioManufacturingTypes, ManufacturingEquipment>> = {
    'crafting': 'assembling-machine',
    'chemistry': 'chemical-plant',
    'crafting-with-fluid': 'assembling-machine',
    'oil-processing': 'oil-refinery',
    'smelting': 'furnace',
} as const;

export const recipes: Partial<Record<Item, Recipe>> = _.mapValues(factorioRecipes, (recipe: FactorioRecipe, key) => {
    return new Recipe(key as Item,
        toIngredients(recipe.ingredients as any as ({ amount: number, name: Item | Fluid }[])),
        recipe.energy_required,
        recipe.results[0].amount,
        categoryToEquipmentMap[recipe.category as FactorioManufacturingTypes],
    );
});
