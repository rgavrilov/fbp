import { Entity } from './Entity';
import { Recipe } from './Recipe';

export class AssemblingMachine extends Entity {
    constructor(init?: Partial<AssemblingMachine> & { recipe: Recipe }) {
        super('assembling-machine-3', 3, 3);
        Object.assign(this, init);
    }

    recipe!: Recipe;

    getBlueprintOutputAttributes() {
        return { recipe: this.recipe.item, ...super.getBlueprintOutputAttributes() };
    }
}
