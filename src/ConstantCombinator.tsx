import { Entity } from './Entity';
import _ from 'lodash';
import { SignalValue, toOutputSignal } from './circuit';

export class ConstantCombinator extends Entity {
    constructor(init?: Partial<ConstantCombinator> & { signals: SignalValue[] }) {
        super('constant-combinator', 1, 1);
        Object.assign(this, init);
    }

    signals!: SignalValue[];

    getBlueprintOutputAttributes() {
        return {
            control_behavior: {
                filters: _.map(this.signals, (value, index) => ({
                    count: value.count, signal: toOutputSignal(value.signal), index: index + 1,
                })),
            }, ...super.getBlueprintOutputAttributes(),
        };
    }
}
