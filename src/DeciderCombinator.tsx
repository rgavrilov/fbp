import { Entity } from './Entity';
import { ConnectionPoint } from './ConnectionPoint';
import { Signal, toOutputSignal } from './circuit';
import _ from 'lodash';
import { Condition, renderCondition } from './condition';

export class DeciderCombinator extends Entity {

    condition!: Condition;
    outputSignal!: Signal;
    copyCountFromInput?: boolean;

    constructor(init: Partial<DeciderCombinator> & Pick<DeciderCombinator, 'condition' | 'outputSignal' | 'copyCountFromInput'>) {
        super('decider-combinator', 1, 2);
        _.assign(this, init);
        this.input = new ConnectionPoint(this, '1');
        this.output = new ConnectionPoint(this, '2');
    }

    input: ConnectionPoint;
    output: ConnectionPoint;

    getBlueprintOutputAttributes() {
        return {
            control_behavior: {
                decider_conditions: {
                    ...renderCondition(this.condition),
                    output_signal: toOutputSignal(this.outputSignal),
                    copy_count_from_input: this.copyCountFromInput || undefined,
                },
            },
        };
    }
}

export class PositiveFilter extends DeciderCombinator {
    constructor() {
        super({
            condition: {
                firstOperand: 'signal-each', operator: 'gt', secondOperand: 0,
            }, outputSignal: 'signal-each', copyCountFromInput: true,
        });
    }
}
