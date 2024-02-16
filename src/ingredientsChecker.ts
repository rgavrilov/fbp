import { FactorioRecipe, FactorioRecipeName, factorioRecipes } from './recipesExport';
import { FactoryBlockSpec } from './factories/factory';
import _ from 'lodash';

export function getMissingRecipes(
    productionBlocks: FactoryBlockSpec[],
    available: FactorioRecipe[],
): FactorioRecipeName[] {

    const productionRecipes = _.map(productionBlocks, 'recipe');

    const processed = new Set<FactorioRecipeName>();
    const unprocessedQueue = new Set<FactorioRecipeName>();
    productionRecipes.forEach(r => {
        unprocessedQueue.add(r);
    });

    // crete a full dependency list
    while (unprocessedQueue.size > 0) {
        const recipeName = unprocessedQueue.values().next().value;
        unprocessedQueue.delete(recipeName);
        if (!processed.has(recipeName)) {
            processed.add(recipeName);
            const recipe = factorioRecipes[recipeName];
            const isRawIngredient = !recipe;
            if (!isRawIngredient) {
                recipe.ingredients.forEach((i: FactorioRecipe) => {
                    if (!available.includes(i.name)) {
                        unprocessedQueue.add(i.name);
                    }
                });
            }
        }
    }

    // subtract productionRecipes from processed
    const missing: FactorioRecipeName[] = [];
    processed.forEach(r => {
        if (!productionRecipes.includes(r)) {
            missing.push(r);
        }
    });

    return missing;
}
