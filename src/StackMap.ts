class StackMapIterator<K, V> implements IterableIterator<[K, V]> {
    private _map: StackMap<K, V>;
    private _mapIterator: IterableIterator<[K, V[]]>;
    private _currentKey: K | undefined;
    private _valueArrayIterator: IterableIterator<V> | undefined;

    constructor(map: StackMap<K, V>) {
        this._map = map;
        this._mapIterator = this._map.map[Symbol.iterator]();
        const nextKeyResult: IteratorYieldResult<[K, V[]]> | IteratorReturnResult<any> = this._mapIterator.next();
        if (nextKeyResult.done) {
            return;
        }
        this._currentKey = nextKeyResult.value[0];
        this._valueArrayIterator = nextKeyResult.value[1][Symbol.iterator]();
    }

    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this;
    }

    next(...args: [] | [undefined]): IteratorResult<[K, V], any> {
        while (this._valueArrayIterator) {
            const nextValueResult = this._valueArrayIterator.next();
            if (nextValueResult.done) {
                this._valueArrayIterator = undefined;
                const nextKeyResult = this._mapIterator.next();
                if (!nextKeyResult.done) {
                    this._currentKey = nextKeyResult.value[0];
                    this._valueArrayIterator = nextKeyResult.value[1][Symbol.iterator]();
                }
            } else {
                return { done: false, value: [this._currentKey!, nextValueResult.value] };
            }
        }
        return { done: true, value: undefined };
    }
}

export class StackMap<K, V> implements Iterable<[K, V]> {
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return new StackMapIterator<K, V>(this);
    }

    map: Map<K, V[]> = new Map<K, V[]>();

    forEach(cb: (kvp: [K, V]) => void) {
        for (let [k, v] of this.map) {
            for (let i in v) {
                cb([k, v[i]]);
            }
        }
    }

    keys(): IterableIterator<K> {
        return this.map.keys();
    }

    get(key: K): V {
        if (!this.map.has(key)) {
            throw new Error(`No value under key ${ key } is found in the map.`);
        }
        return this.map.get(key)![0];
    }

    add(key: K, value: V) {
        if (this.map.has(key)) {
            this.map.get(key)!.push(value);
        } else {
            this.map.set(key, [value]);
        }
    }
}
