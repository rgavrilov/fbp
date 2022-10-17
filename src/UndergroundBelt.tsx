import { Entity } from './Entity';
import _ from 'lodash';

type UndergroundBeltConfiguration = Pick<UndergroundBelt, 'beltDirection'>;

class UndergroundBeltBase extends Entity {
    beltDirection!: 'input' | 'output';

    constructor(
        name: 'underground-belt' | 'fast-underground-belt' | 'express-underground-belt',
        configuration: UndergroundBeltConfiguration,
    ) {
        super(name, 1, 1);
        _.assign(this, configuration);
    }

    getBlueprintOutputAttributes(): {} {
        return {
            ...super.getBlueprintOutputAttributes(), type: this.beltDirection,
        };
    }
}

export class UndergroundBelt extends UndergroundBeltBase {
    constructor(configuration: UndergroundBeltConfiguration) {super('underground-belt', configuration);}
}

export class FastUndergroundBelt extends UndergroundBeltBase {
    constructor(configuration: UndergroundBeltConfiguration) {super('fast-underground-belt', configuration);}
}

export class ExpressUndergroundBelt extends UndergroundBeltBase {
    constructor(configuration: UndergroundBeltConfiguration) {super('express-underground-belt', configuration);}
}
