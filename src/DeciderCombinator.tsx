import { Entity } from './Entity';
import { ConnectionPoint } from './ConnectionPoint';
import { Signal, toOutputSignal } from './circuit';
import _ from 'lodash';
import { Condition, renderCondition } from './condition';

export class DeciderCombinator extends Entity {

    condition!: Condition;
    outputSignal!: Signal;
    copyCountFromInput?: boolean;
    input: ConnectionPoint;
    output: ConnectionPoint;

    constructor(init: Partial<DeciderCombinator> & Pick<DeciderCombinator, 'condition' | 'outputSignal' | 'copyCountFromInput'>) {
        super('decider-combinator', 1, 2);
        _.assign(this, init);
        this.input = new ConnectionPoint(this, '1');
        this.output = new ConnectionPoint(this, '2');
    }

    getBlueprintOutputAttributes() {
        return {
            control_behavior: {
                decider_conditions: {
                    ...renderCondition(this.condition),
                    output_signal: toOutputSignal(this.outputSignal),
                    copy_count_from_input: this.copyCountFromInput === false ? false : undefined,
                },
            },
        };
    }
}

/**
 * Passes through positive channels only.
 */
export class PositiveFilter extends DeciderCombinator {
    constructor() {
        super({
            condition: {
                firstOperand: 'signal-each', operator: 'gt', secondOperand: 0,
            }, outputSignal: 'signal-each', copyCountFromInput: true,
        });
    }
}

/**
 * Outputs 1 for each channel that has positive number.
 */
export class HeavisideGate extends DeciderCombinator {
    constructor() {
        super({
            condition: {
                firstOperand: 'signal-each', operator: 'gt', secondOperand: 0,
            }, outputSignal: 'signal-each', copyCountFromInput: false,
        });
    }
}
