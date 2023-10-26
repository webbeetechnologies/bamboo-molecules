import memoize from 'lodash.memoize';
export { default as get } from 'lodash.get';
export { default as memoize } from 'lodash.memoize';
export { default as omit } from 'lodash.omit';
export { default as omitBy } from 'lodash.omitby';
export { default as isNil } from 'lodash.isnil';
export { default as noop } from 'lodash.noop';
export { default as keyBy } from 'lodash.keyby';
export { default as groupBy } from 'lodash.groupby';

const uniqueIdFactory = () => {
    let number = Number.MAX_SAFE_INTEGER;
    return () => number--;
};

const getUniqueId = uniqueIdFactory();
const weakMemoize = Object.assign(memoize.bind(null), { Cache: WeakMap });
const getObjectMemoryAddress = weakMemoize((x: unknown | null) => x && getUniqueId());

export const allArgumentResolver = (...args: unknown[]) =>
    args
        .map(x => {
            const type = typeof x;
            switch (type) {
                case 'object':
                case 'function':
                    return type.slice(0, 2)! + getObjectMemoryAddress(x);
                default:
                    return type.slice(0, 2)! + String(x);
            }
        })
        .join('_');

export const createMemoizedFunction = ({
    resolver = allArgumentResolver,
    Cache = Map,
}: {
    resolver?: (...args: any[]) => any;
    Cache?: typeof memoize.Cache;
} = {}) => {
    const memo = Object.assign(memoize.bind(null), { Cache });
    return Object.assign(
        <T extends (...args: any[]) => any>(func: T, resolverOverwride?: (...args: any[]) => any) =>
            memo(func, resolverOverwride ?? resolver),
    );
};

export const weakMemoized = createMemoizedFunction({
    resolver: x => x,
    Cache: WeakMap,
});
