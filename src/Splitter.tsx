import { Entity } from './Entity';
import { Item } from './Items';

type SplitterConfiguration = Pick<Splitter, 'inputPriority' | 'outputPriority' | 'filter'>;

class SplitterBase extends Entity {
    constructor(name: 'splitter' | 'fast-splitter' | 'express-splitter', configuration?: SplitterConfiguration) {
        super(name, 2, 1);
    }

    inputPriority?: 'left' | 'right';
    outputPriority?: 'left' | 'right';
    filter?: Item;

    getBlueprintOutputAttributes(): {} {
        return {
            ...super.getBlueprintOutputAttributes(),
            input_priority: this.inputPriority,
            output_priority: this.outputPriority,
            filter: this.filter,
        };
    }
}

export class Splitter extends SplitterBase {
    constructor(configuration?: SplitterConfiguration) {super('splitter', configuration);}
}

export class FastSplitter extends SplitterBase {
    constructor(configuration?: SplitterConfiguration) {
        super('fast-splitter', configuration);
    }
}

export class ExpressSplitter extends SplitterBase {
    constructor(configuration?: SplitterConfiguration) {super('express-splitter', configuration);}
}
