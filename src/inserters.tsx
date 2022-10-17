import { Entity } from './Entity';
import { Item } from './Items';
import * as _ from 'lodash';
import { Signal, toOutputSignal } from './circuit';
import { Condition, renderCondition } from './condition';

// long-handed-inserter
// stack-inserter
// filter-inserter
// fast-inserter
// stack-filter-inserter

type InserterOptions = Pick<InserterBase, 'stackSize' | 'stackSizeSignal' | 'enabledCondition' | 'readHandContent'>;

class InserterBase extends Entity {
    stackSize?: number;
    enabledCondition?: Condition;
    stackSizeSignal?: Signal;
    readHandContent?: 'pulse' | 'hold';

    constructor(name: Item, init?: InserterOptions) {
        super(name, 1, 1);
        _.assign(this, init);
    }

    getMode(): number {
        const enableMode = !!this.enabledCondition;
        if (!enableMode) {
            // none
            return 3;
        } else {
            // enable/disable
            return 0;
        }
    }

    getBlueprintOutputAttributes() {
        return {
            ...super.getBlueprintOutputAttributes(), override_stack_size: this.stackSize, control_behavior: {
                circuit_condition: !!this.enabledCondition ? renderCondition(this.enabledCondition) : undefined,
                circuit_mode_of_operation: this.getMode(),
                circuit_read_hand_contents: !!this.readHandContent || undefined,
                circuit_hand_read_mode: this.readHandContent !== undefined
                    ? (this.readHandContent === 'pulse' ? 0 : 1)
                    : undefined,
                stack_control_input_signal: this.stackSizeSignal ? toOutputSignal(this.stackSizeSignal) : undefined,
                circuit_set_stack_size: !!this.stackSizeSignal ? true : undefined,
            },
        };
    }
}

export class Inserter extends InserterBase {
    constructor(init?: { stackSize?: number }) {
        super('inserter', init);
    }
}

export class FastInserter extends InserterBase {
    constructor(init?: InserterOptions) {
        super('fast-inserter', init);
    }
}

export class StackInserter extends InserterBase {
    constructor(init?: InserterOptions) {
        super('stack-inserter', init);
    }
}

type FilterInserterOptions = Pick<FilterInserterBase, 'filters' | 'filterMode' | 'enabledCondition' | 'setFilterFromCircuit' | 'stackSizeSignal' | 'readHandContent'>;

class FilterInserterBase extends InserterBase {
    filters?: Item[];
    filterMode?: 'whitelist' | 'blacklist';
    setFilterFromCircuit?: boolean;

    constructor(name: Item, init?: InserterOptions & FilterInserterOptions) {
        super(name, init);
        _.assign(this, init);
        this.filters = init?.filters;
    }

    getMode(): number {
        const enableMode = !!this.enabledCondition;
        const setFilterMode = !!this.setFilterFromCircuit;
        if (enableMode && setFilterMode) {
            throw new Error('Can\'t have both enable/disable mode and set filter mode.');
        }
        if (!enableMode && !setFilterMode) {
            // none
            return 3;
        } else if (enableMode) {
            // enable/disable
            return 0;
        } else {
            // set filter
            return 1;
        }
    }

    getBlueprintOutputAttributes() {
        return {
            ...super.getBlueprintOutputAttributes(),
            filters: _.map(this.filters, (item, index) => ({ index: index + 1, name: item })),
            filter_mode: this.filterMode,
        };
    }
}

export class FilterInserter extends FilterInserterBase {
    constructor(init?: InserterOptions & FilterInserterOptions) {
        super('filter-inserter', init);
    }

    getBlueprintOutputAttributes() {
        return super.getBlueprintOutputAttributes();
    }
}

export class StackFilterInserter extends FilterInserterBase {
    constructor(init?: InserterOptions & FilterInserterOptions) {

        if (init && init.filters && init.filters.length > 1) {
            throw new Error('Stack filter inserter can not have more than one filter.');
        }

        super('stack-filter-inserter', init);
    }

    getBlueprintOutputAttributes() {
        return super.getBlueprintOutputAttributes();
    }
}

export class LongHandedInserter extends InserterBase {
    constructor(init?: InserterOptions) {
        super('long-handed-inserter', init);
    }
}
