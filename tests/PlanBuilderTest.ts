import { describe, expect, test } from '@jest/globals';
import { Entity } from '../src/Entity';
import { Network } from '../src/circuit';
import { loadPlan, planToBlueprint } from '../src/PlanBuilder';
import { ConnectionPoint } from '../src/ConnectionPoint';
import { Connection } from '../src/Fbp';


const plan = `
aaU.bbR.
ccD.ddL.
`;

export class TestEntity extends Entity {
    constructor(public id: string, width: number = 1, height: number = 1) {
        super('battery', width, height);
    }

    public input: ConnectionPoint = new ConnectionPoint(this, '1');
    public output: ConnectionPoint = new ConnectionPoint(this, '2');
}

describe('loadPlan', () => {
    test('loads a plan', () => {
        const fbp = loadPlan(plan);
        expect(fbp.elements.keys()).toContain('aa');
    });
    test('ignores leading spaces', () => {
        const fbp = loadPlan('       aa .bb .');
        expect(fbp.elements.keys()).toContain('aa');
        expect(fbp.elements.keys()).toContain('bb');
    });
});

describe('planToBlueprint', () => {
    test('loads a plan as a blueprint', () => {
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
    test('supports connection', () => {
        const fbp = planToBlueprint('aa .bb .', {
            aa: () => new TestEntity('aa'), bb: () => new TestEntity('bb'),
        }, [[Network.Red, 'aa', 'bb']], { aa: 'aa', bb: 'bb' });
        expect(fbp.connections).toContainEqual({
            network: Network.Red,
            point1: new ConnectionPoint(fbp.exports['aa'] as Entity),
            point2: new ConnectionPoint(fbp.exports['bb'] as Entity),
        } as Connection);
    });
    test('supports connection id:circuit shortcut', () => {
        const fbp = planToBlueprint('aa .bb .', {
            aa: () => new TestEntity('aa'), bb: () => new TestEntity('bb'),
        }, [[Network.Red, 'aa:input', 'bb:output']], { aa: 'aa', bb: 'bb' });
        expect(fbp.connections).toContainEqual({
            network: Network.Red,
            point1: new ConnectionPoint(fbp.exports['aa'] as Entity, '1'),
            point2: new ConnectionPoint(fbp.exports['bb'] as Entity, '2'),
        } as Connection);
    });
});
