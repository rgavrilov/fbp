import { Entity } from './Entity';
import { Item } from './Items';

type SplitterConfiguration = Pick<Splitter, 'inputPriority' | 'outputPriority' | 'filter'>;

class SplitterBase extends Entity {
    inputPriority?: 'left' | 'right';
    outputPriority?: 'left' | 'right';
    filter?: Item;

    constructor(name: 'splitter' | 'fast-splitter' | 'express-splitter', configuration?: SplitterConfiguration) {
        super(name, 2, 1);
    }

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
