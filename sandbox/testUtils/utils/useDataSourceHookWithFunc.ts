import { useEffect, useRef } from 'react';

export type UseDataSourceHookWithFunc<T = any> = (hook: () => T, callback?: (args: T) => void) => T;
export type CreateDataSourceHookWithFunc = <T = unknown>(
    hook: () => T,
) => (callback?: (args: T) => void) => T;

export const useDataSourceHookWithFunc: UseDataSourceHookWithFunc = (
    hook,
    callback = _args => {},
) => {
    const dataSource = hook();
    const dsRef = useRef(dataSource);
    const callbackRef = useRef(callback).current;

    useEffect(() => {
        callbackRef(dsRef.current);
    }, [callbackRef]);

    return dataSource;
};

export const createDataSourceHookWithFunc: CreateDataSourceHookWithFunc = hook => callback =>
    useDataSourceHookWithFunc(hook, callback);
