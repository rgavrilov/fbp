import { Entity } from './Entity';
import { Signal, toOutputSignal } from './circuit';
import _ from 'lodash';
import { ConnectionPoint } from './ConnectionPoint';

export class ArithmeticCombinator extends Entity {
    firstOperand!: Signal | number;
    operation!: '*' | '+' | '-' | '<<' | '>>' | '/' | '%' | '^' | 'AND' | 'OR' | 'XOR';
    secondOperand!: Signal | number;
    outputSignal!: Signal;

    constructor(init: Partial<ArithmeticCombinator> & Pick<ArithmeticCombinator, 'firstOperand' | 'secondOperand' | 'operation' | 'outputSignal'>) {
        super('arithmetic-combinator', 1, 2);
        _.assign(this, init);
        this.input = new ConnectionPoint(this, '1');
        this.output = new ConnectionPoint(this, '2');
    }

    input: ConnectionPoint;
    output: ConnectionPoint;

    getBlueprintOutputAttributes() {
        return {
            control_behavior: {
                arithmetic_conditions: {
                    [typeof this.firstOperand === 'number'
                        ? 'first_constant'
                        : 'first_signal']: typeof this.firstOperand === 'number' ? this.firstOperand : toOutputSignal(
                        this.firstOperand),
                    operation: this.operation,
                    [typeof this.secondOperand === 'number'
                        ? 'second_constant'
                        : 'second_signal']: typeof this.secondOperand === 'number'
                        ? this.secondOperand
                        : toOutputSignal(this.secondOperand),
                    output_signal: toOutputSignal(this.outputSignal),
                },
            },
        };
    }
}

export class Inverter extends ArithmeticCombinator {
    constructor() {
        super({
            firstOperand: 'signal-each', operation: '*', secondOperand: -1, outputSignal: 'signal-each',
        });
    }
}

export class IdentityCombinator extends ArithmeticCombinator {
    constructor() {
        super({
            firstOperand: 'signal-each', operation: '*', secondOperand: 1, outputSignal: 'signal-each',
        });
    }
}
