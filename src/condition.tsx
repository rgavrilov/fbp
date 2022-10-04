import { Signal, toOutputSignal } from './circuit';

export type ConditionOperator = 'lt' | 'eq' | 'gt' | 'lte' | 'gte' | 'ne';

export type Condition = { firstOperand: Signal, operator: ConditionOperator, secondOperand: Signal | number };

export const renderCondition = (condition: Condition) => ({
    first_signal: toOutputSignal(condition.firstOperand),
    comparator: {
        lt: '<', gt: '>', eq: '=', ne: '≠', gte: '≥', lte: '≤',
    }[condition.operator],
    [typeof condition.secondOperand === 'number' ? 'constant' : 'second_signal']: (typeof condition.secondOperand ===
    'number' ? condition.secondOperand : toOutputSignal(condition.secondOperand)),
});
