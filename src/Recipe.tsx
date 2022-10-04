import { Fluid, Item } from './Items';
import { factorioRecipes } from './recipesExport';
import _ from 'lodash';

type ManufacturingEquipment = 'assembling-machine' | 'oil-refinery' | 'chemical-plant' | 'furnace';

export class Recipe {
    constructor(
        public item: Item,
        public ingredients: Partial<Record<Item | Fluid, number>>,
        public craftingTime?: number,
        public output: number = 1,
        public equipment: ManufacturingEquipment = 'assembling-machine',
    ) {}
}

// export const recipes = {
//     copperCable: new Recipe('copper-cable', { 'copper-plate': 1 }, 0.5, 2),
//     electronicCircuit: new Recipe('electronic-circuit', { 'copper-cable': 3, 'iron-plate': 1 }, 0.5),
//     advancedCircuit: new Recipe('advanced-circuit',
//         { 'copper-cable': 4, 'electronic-circuit': 2, 'plastic-bar': 2 },
//         6,
//     ),
//     plasticBar: new Recipe('plastic-bar', {
//         'petroleum-gas': 20, coal: 1,
//     }, 1, 2, 'chemical-plant'),
//     ironGearWheel: new Recipe('iron-gear-wheel', { 'iron-plate': 2 }, undefined, 1),
//     ironStick: new Recipe('iron-stick', { 'iron-plate': 1 }, undefined, 2),
// } as const;

const toIngredients: (ingredients: { amount: number, name: Item | Fluid }[]) => Partial<Record<Item | Fluid, number>> = (ingredients) => {
    return _.chain(ingredients).keyBy('name').mapValues('amount').value();
};

type FactorioManufacturingTypes =
    'crafting'
    | 'chemistry'
    | 'oil-processing'
    | 'crafting-with-fluid'
    | 'smelting'
    | 'advanced-crafting'
    | 'centrifuging'
    | 'rocket-building';
const categoryToEquipmentMap: Partial<{ [Key in FactorioManufacturingTypes]: ManufacturingEquipment }> = {
    'crafting': 'assembling-machine',
    'chemistry': 'chemical-plant',
    'crafting-with-fluid': 'assembling-machine',
    'oil-processing': 'oil-refinery',
    'smelting': 'furnace',
};

export const recipes = _.mapValues(factorioRecipes, (recipe, key) => new Recipe(
    key as Item,
    toIngredients(recipe.ingredients as any as ({ amount: number, name: Item | Fluid }[])),
    undefined,
    recipe.results[0].amount,
    categoryToEquipmentMap[recipe.category],
));
