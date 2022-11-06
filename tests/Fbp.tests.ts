import { describe, expect, it } from '@jest/globals';
import { Element, Fbp } from '../src/Fbp';
import { TestEntity } from './PlanBuilderTest';
import { planToBlueprint } from '../src/PlanBuilder';
import _ from 'lodash';
import { Direction } from '../src/Direction';

describe('Fbp', () => {
    function getElement(rotatedFbp: Fbp, id: string): Element {
        const element = rotatedFbp.elements.find(e => (e.entity as TestEntity).id === id);
        expect(element).toBeDefined();
        return element!;
    }

    it('can rotate', () => {
        const plan = `
            aaU.bbR.
            ---.---.
            ccD.ddL.
        `;

        const fbp = planToBlueprint(plan, {
            aa: () => new TestEntity('aa'), //
            bb: () => new TestEntity('bb'), //
            cc: () => new TestEntity('cc'), //
            dd: () => new TestEntity('dd'),
        }, [], { aa: 'aa', bb: 'bb', cc: 'cc', dd: 'dd' });

        // Act
        fbp.rotate(1);

        // Assert
        const { aa, bb, cc, dd } = _.chain(['aa', 'bb', 'cc', 'dd'])
            .keyBy()
            .mapValues(id => getElement(fbp, id))
            .value();

        expect(aa.position).toEqual({ x: 2, y: 0 });
        expect(aa.direction).toBe(Direction.Right);

        expect(bb.position).toEqual({ x: 2, y: 1 });
        expect(bb.direction).toBe(Direction.Down);

        expect(cc.position).toEqual({ x: 0, y: 0 });
        expect(cc.direction).toBe(Direction.Left);

        expect(dd.position).toEqual({ x: 0, y: 1 });
        expect(dd.direction).toBe(Direction.Up);
    });

    it('can rotate large blocks', () => {
        const plan = `
            aaD.---.
            ---.---.
            ---.---.
        `;

        const fbp = planToBlueprint(plan, {
            aa: () => new TestEntity('aa', 2, 3), //
        }, [], { aa: 'aa' });

        // Act
        fbp.rotate(1);

        // Assert
        const { aa } = _.chain(['aa'])
            .keyBy()
            .mapValues(id => getElement(fbp, id))
            .value();

        expect(aa.position).toEqual({ x: 0, y: 0 });
        expect(aa.direction).toBe(Direction.Left);
    });

    it('can rotate 1x2 block', () => {
        const plan = `
            aaD.---.
            ---.---.
            bbR.---.
        `;

        const fbp = planToBlueprint(plan, {
            aa: () => new TestEntity('aa', 1, 2), //
            bb: () => new TestEntity('bb', 1, 2), //
        }, [], { aa: 'aa', bb: 'bb' });

        // Act
        fbp.rotate(1);

        // Assert
        const { aa, bb } = _.chain(['aa', 'bb'])
            .keyBy()
            .mapValues(id => getElement(fbp, id))
            .value();

        expect(aa.position).toEqual({ x: 1, y: 0 });
        expect(aa.direction).toBe(Direction.Left);

        expect(bb.position).toEqual({ x: 0, y: 0 });
        expect(bb.direction).toBe(Direction.Down);
    });

    it('calculates dimensions', () => {
        const plan = `
            aaD.---.
            ---.---.
            ---.---.
        `;

        const fbp = planToBlueprint(plan, {
            aa: () => {
                const testEntity = new TestEntity('aa');
                testEntity.dimensions.width = 2;
                testEntity.dimensions.height = 3;
                return testEntity;
            }, //
        }, [], { aa: 'aa' });

        // Assert
        expect(fbp.getDimensions()).toEqual({ width: 2, height: 3 });
    });
});
