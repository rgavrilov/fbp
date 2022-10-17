import { Entity } from './Entity';
import _ from 'lodash';
import { SignalValue, toOutputSignal } from './circuit';

export class ConstantCombinator extends Entity {
    signals!: SignalValue[];

    constructor(init?: Partial<ConstantCombinator> & { signals: SignalValue[] }) {
        super('constant-combinator', 1, 1);
        Object.assign(this, init);
    }

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
