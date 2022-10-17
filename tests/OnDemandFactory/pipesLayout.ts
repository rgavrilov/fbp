import { expect, test } from '@jest/globals';

import _ from 'lodash';
import { getBlueprintExchangeString } from '../../src/blueprintExport';
import { layoutPipeLane, layoutPipes } from '../../src/FluidBus';

function layoutToString(layout: { [p: number]: 'down' | 'up' | 'straight' | 'connect' }) {
    const layoutLength = _.findLastIndex(layout as []) + 1;
    return _.reduce(layout, (sum, item, key) => {
        const position = Number(key);
        const map = { down: 'd', up: 'u', straight: '=', connect: 'T' };
        if (!!map[item]) {
            return sum.substring(0, position) + map[item] + sum.substring(position + 1);
        }
        return sum;
    }, new Array(layoutLength + 1).join('.') as string);
}

function input(spec: string) {
    const args = _.reduce(spec, (sum, item, position) => {
        switch (item) {
            case 'c':
                sum.connections.push(position);
                break;
            case 'o':
                sum.obstacles.push(position);
                break;
        }
        return sum;
    }, { connections: [] as number[], obstacles: [] as number[] });
    return args;
}

function runLayoutTestCase(spec: string, expected: string, segmentLength: number = 4) {
    const inputArgs = input(spec);
    const actualLayout = layoutPipeLane(inputArgs.connections, inputArgs.obstacles, segmentLength);
    const actual = layoutToString(actualLayout);

    expect(actual).toBe(expected);
}

test('one connection', () => {
    const i = '....c...';
    const o = 'd..uT';
    runLayoutTestCase(i, o);
});

test('one far connection', () => {
    const i = '........c...';
    const o = 'd..ud..uT';
    runLayoutTestCase(i, o);
});

test('need pipe', () => {
    const i = '.........c...';
    const o = 'd..ud..u=T';
    runLayoutTestCase(i, o);
});

test('immediate', () => {
    const i = 'c';
    const o = 'T';
    runLayoutTestCase(i, o);
});

test('short segment', () => {
    const i = '...c';
    const o = 'd.uT';
    runLayoutTestCase(i, o);
});

test('multiple connections', () => {
    const i = '...cc.c..c....c';
    const o = 'd.uTT=TduTd..uT';
    runLayoutTestCase(i, o);
});

test('unobtrusive obstacle', () => {
    const i = '.o..c';
    const o = 'd..uT';
    runLayoutTestCase(i, o);
});

test('obstructing obstacle', () => {
    const i = '...o.c';
    const o = 'dud.uT';
    runLayoutTestCase(i, o);
});

test('ignore obstacles after last connection', () => {
    const i = '..coooooooooooooooooo';
    const o = 'duT';
    runLayoutTestCase(i, o);
});

test('one-over-one obstacles', () => {
    const i = '...o.o.c';
    const o = 'dud...uT';
    runLayoutTestCase(i, o, 5);
});

test('complicated case', () => {
    const i = '........c.c...ooo..oo.c.oo';
    const o = 'd...ud.uT=Tdud...ud..uT';
    runLayoutTestCase(i, o, 5);
});

test('layout pipe segment', () => {
    const fbp = layoutPipes([
        { fluid: 'water', position: 5 },
        { fluid: 'petroleum-gas', position: 7 },
        { fluid: 'petroleum-gas', position: 3 },
    ], ['water', 'petroleum-gas']);
    const string = getBlueprintExchangeString(fbp);
});
