import { Entity } from './Entity';
import { Recipe } from './Recipe';

export class ChemicalPlant extends Entity {
    recipe!: Recipe;

    constructor(configuration: { recipe: Recipe }) {
        super('chemical-plant', 3, 3);
        Object.assign(this, configuration);
    }

    getBlueprintOutputAttributes() {
        return { recipe: this.recipe.item, ...super.getBlueprintOutputAttributes() };
    }
}
