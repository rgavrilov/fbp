// Builds a graph of materials given an item and a rate
import { Recipe, recipes } from '../Recipe';
import { Fluid, Item, items } from '../Items';
import _ from 'lodash';

export type Tree<N> = {
    value: N; children: Tree<N>[];
};

export type OutputRate = { recipe: Recipe, outputRate: number };

export type Bom = Tree<OutputRate>;

export function printTree<T>(tree: Tree<T>,
    nodePrinter: (value: Tree<T>['value']) => string,
    indentation: number = 0,
): string {
    const tabSize = 2;
    const indentationText = ' '.repeat(indentation * tabSize);
    const result = indentationText + nodePrinter(tree.value) + '\n' +
        tree.children.map(c => printTree(c, nodePrinter, indentation + 1)).join('');
    return result;
}

// traverse the tree child-first
export function traverseTreeChildFirst<T>(tree: Tree<T>, visit: (value: Tree<T>['value']) => void) {
    for (const child of tree.children) {
        traverseTreeChildFirst(child, visit);
    }
    visit(tree.value);
}

export function flattenTree<T>(tree: Tree<T>): T[] {
    const result: T[] = [];
    traverseTreeChildFirst(tree, value => result.push(value));
    return result;
}

export function transformAndCopyTree<T>(tree: Tree<T>, nodeTransformation: (value: T) => T): Tree<T> {
    const newTree: Tree<T> = {
        value: nodeTransformation(tree.value),
        children: _.map(tree.children, child => transformAndCopyTree(child, nodeTransformation)),
    };
    return newTree;
}

// Given a recipe and desired rate of production, build a bom graph.
// note: For now fluids are ignored and will be handled by the block builder.
export function buildBom(recipe: Recipe, outputRate: number, rawMaterials: (Item | Fluid)[]): Bom {
    const multiplier = outputRate / recipe.output;
    const children: Bom[] = [];
    const nonFluidIngredients = _.pickBy(recipe.ingredients, (value, key) => items.includes(key as Item));
    for (const key in nonFluidIngredients) {
        const ingredientItem = key as Item;
        const ingredientCount = recipe.ingredients[ingredientItem]!;
        if (!rawMaterials.includes(ingredientItem)) {
            children.push(buildBom(recipes[ingredientItem]!, ingredientCount * multiplier, rawMaterials));
        }
    }

    return {
        value: { recipe, outputRate }, children: children,
    };
}

