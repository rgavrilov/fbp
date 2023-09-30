import { Fluid, fluids, Item, items } from './Items';
import _ from 'lodash';

export type Circuit = '1' | '2';

export enum Network {
    Red, Green, Electric
}

export type SignalType = 'item' | 'virtual' | 'fluid';

export const virtualSignals = ['signal-each', 'signal-everything', 'signal-T'];

export type VirtualSignal = typeof virtualSignals[number];

export type Signal = Item | Fluid | VirtualSignal;

export type SignalValue = { signal: Signal, count: number };

function getSignalType(signal: Signal) {
    if (_.includes(items, signal)) {
        return 'item';
    } else if (_.includes(fluids, signal)) {
        return 'fluid';
    } else if (_.includes(virtualSignals, signal)) {
        return 'virtual';
    } else {
        throw new Error(`Couldn't determine a type of signal '${ signal }'.`);
    }
}

export function toOutputSignal(signal: Signal) {
    return {
        type: getSignalType(signal), name: signal,
    };
}
