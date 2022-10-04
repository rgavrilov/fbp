import { Entity } from './Entity';
import { Condition, renderCondition } from './condition';
import _ from 'lodash';
import { Item } from './Items';

type TransportBeltConfiguration = Pick<TransportBeltBase, 'enableCondition' | 'readContent'>

class TransportBeltBase extends Entity {
    enableCondition?: Condition;
    readContent?: 'pulse' | 'hold';

    constructor(name: Item, configuration?: TransportBeltConfiguration) {
        super(name, 1, 1);
        _.assign(this, configuration);
    }

    getBlueprintOutputAttributes(): {} {
        return {
            ...super.getBlueprintOutputAttributes(), control_behavior: {
                circuit_condition: this.enableCondition && renderCondition(this.enableCondition),
                circuit_enable_disable: !!this.enableCondition,
                circuit_read_hand_contents: !!this.readContent,
                circuit_contents_read_mode: !!this.readContent ? (this.readContent === 'pulse' ? 0 : 1) : undefined,
            },
        };
    }
}

// transport-belt, fast-transport-belt, express-transport-belt
export class TransportBelt extends TransportBeltBase {
    constructor(configuration?: TransportBeltConfiguration) {super('transport-belt', configuration);}
}

export class FastTransportBelt extends TransportBeltBase {
    constructor(configuration?: TransportBeltConfiguration) {super('fast-transport-belt', configuration);}
}

export class ExpressTransportBelt extends TransportBeltBase {
    constructor(configuration?: TransportBeltConfiguration) {super('express-transport-belt', configuration);}
}
