import { Dimensions } from './Dimensions';
import { Item } from './Items';

export class Entity {
    constructor(public name: Item, width: number, height: number) {
        this.dimensions = new Dimensions(width, height);
    }

    dimensions: Dimensions;

    getBlueprintOutputAttributes() {
        return {};
    }
}
