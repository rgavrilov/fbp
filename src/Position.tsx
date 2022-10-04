import { Dimensions } from './Dimensions';

export class Position {
    constructor(public x: number, public y: number) {}

    static O: Position = new Position(0, 0);

    inBox(position: Position, dimensions: Dimensions) {
        return this.x >= position.x && this.x < (position.x + dimensions.width) && this.y >= position.y && this.y <
            (position.y + dimensions.height);
    }

    add(other: Position) {
        return new Position(this.x + other.x, this.y + other.y);
    }

    toString() {
        return `(${ this.x }, ${ this.y })`;
    }
}
