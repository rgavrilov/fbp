import { describe, expect, test } from '@jest/globals';
import { Entity } from '../src/Entity';
import { Network } from '../src/circuit';
import { loadPlan, planToBlueprint } from '../src/PlanBuilder';


const plan = `
aaU.bbR.
ccD.ddL.
`;

class TestEntity extends Entity {
    constructor(public id: string) {
        super('battery', 1, 1);
    }
}

describe('loadPlan', () => {
    test('loads a plan', () => {
        const fbp = loadPlan(plan);
        expect(fbp.elements.keys()).toContain('aa');
    });
});

describe('planToBuleprint', () => {
    test('loads plan as blueprint', () => {
        const fbp = planToBlueprint(plan, {
            aa: () => new TestEntity('aa'),
            bb: () => new TestEntity('bb'),
            cc: () => new TestEntity('cc'),
            dd: () => new TestEntity('dd'),
        }, [
            [Network.Green, 'aa', 'bb'],
        ], { exp1: 'bb' });

        expect(fbp.elements.find(e => e.position.x === 0 && e.position.y === 0 && (e.entity as TestEntity).id === 'aa'))
            .toBeTruthy();
        expect(fbp.exports['exp1']).toBeTruthy();
        expect((fbp.exports['exp1'] as TestEntity).id).toBe('bb');
    });
});
