import memoize from 'lodash.memoize';
export { default as get } from 'lodash.get';
export { default as memoize } from 'lodash.memoize';
export { default as omit } from 'lodash.omit';
export { default as omitBy } from 'lodash.omitby';
export { default as isNil } from 'lodash.isnil';
export { default as noop } from 'lodash.noop';

const defaultResolver = (arg: any) => JSON.stringify(arg);
export const createMemoizedFunction = ({
    resolver = defaultResolver,
    Cache = Map,
}: {
    resolver?: (...args: any[]) => any;
    Cache?: typeof memoize.Cache;
} = {}) => {
    const memo = Object.assign(memoize, { Cache });
    return Object.assign(<T extends (...args: any[]) => any>(func: T) => memo(func, resolver));
};
