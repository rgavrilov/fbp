import { StackMap } from '../src/StackMap';
import { describe, expect, it } from '@jest/globals';

function iterate(stackMap: StackMap<string, string>) {
    const actual = [];
    for (const [k, v] of stackMap) {
        actual.push([k, v]);
    }
    return actual;
}

describe('StackMap', () => {
    describe('is iterable', () => {
        it('can iterate multiple values', () => {
            const stackMap = new StackMap<string, string>();
            stackMap.add('a', '1');
            stackMap.add('b', '2');
            stackMap.add('b', '3');
            const actual = iterate(stackMap);
            expect(actual).toStrictEqual([['a', '1'], ['b', '2'], ['b', '3']]);
        });
        it('can iterate empty', () => {
            const stackMap = new StackMap<string, string>();
            const actual = iterate(stackMap);
            expect(actual).toStrictEqual([]);
        });
        it('single value', () => {
            const stackMap = new StackMap<string, string>();
            stackMap.add('a', '1');
            const actual = iterate(stackMap);
            expect(actual).toStrictEqual([['a', '1']]);
        });
    });
});
