import { Entity } from './Entity';
import { Recipe } from './Recipe';

export class ChemicalPlant extends Entity {
    constructor(configuration: { recipe: Recipe }) {
        super('chemical-plant', 3, 3);
        Object.assign(this, configuration);
    }

    recipe!: Recipe;

    getBlueprintOutputAttributes() {
        return { recipe: this.recipe.item, ...super.getBlueprintOutputAttributes() };
    }
}
