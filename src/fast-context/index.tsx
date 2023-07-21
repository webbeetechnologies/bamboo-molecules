import {
    createContext,
    MutableRefObject,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    Context,
} from 'react';
import typedMemo from '../hocs/typedMemo';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

type UseStoreDataReturnType<T> = {
    get: () => T;
    set: (value: (prev: T) => Partial<T>) => void;
    store: MutableRefObject<T>;
    subscribe: (callback: () => void) => () => void;
};

const useStoreData = <IStore extends Record<string, any> = {}>(
    defaultValue: IStore,
): UseStoreDataReturnType<IStore> => {
    const store = useRef<IStore>(defaultValue as IStore);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: (prev: IStore) => Partial<IStore>) => {
        store.current = { ...store.current, ...value(store.current) };

        subscribers.current.forEach(callback => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
        subscribers.current.add(callback);

        return () => subscribers.current.delete(callback);
    }, []);

    return {
        get,
        set,
        subscribe,
        store,
    };
};

// TODO - fix typescript issues
export const createFastContext = <T extends Record<string, any> = {}>(defaultValue: T) => {
    const context = createContext<UseStoreDataReturnType<T>>(
        defaultValue as unknown as UseStoreDataReturnType<T>,
    );

    return {
        // this will never cause rerender if we use it with useContext because it's just a ref
        useStoreRef: createUseRefContext(context),
        Provider: createProvider<T>(context as unknown as Context<T>),
        // returns an array, first item is getter and the second item is setter
        useContext: createUseContext<T>(context as unknown as Context<T>),
    };
};

export const createProvider = <T extends Record<string, any> = {}>(StoreContext: Context<T>) =>
    typedMemo(({ defaultValue, children }: { defaultValue: T; children: ReactNode }) => {
        return (
            <StoreContext.Provider value={useStoreData<T>(defaultValue) as any}>
                {children}
            </StoreContext.Provider>
        );
    });

export const createUseContext = <T extends Record<string, any> = {}>(_Context: Context<T>) => {
    return <SelectorOutput,>(selector: (store: T) => SelectorOutput) =>
        useStore<SelectorOutput, T>(_Context, selector);
};

export const createUseRefContext = <T,>(_Context: Context<UseStoreDataReturnType<T>>) => {
    return () => useContext<UseStoreDataReturnType<T>>(_Context);
};

export function useStore<SelectorOutput, IStore extends Record<string, any> = {}>(
    _Context: Context<IStore>,
    selector: (store: IStore) => SelectorOutput,
): [SelectorOutput, (value: (prev: IStore) => Partial<IStore>) => void] {
    const store = useContext(_Context);
    if (!store) {
        throw new Error('Store not found');
    }

    const state = useSyncExternalStoreWithSelector(
        store.subscribe,
        () => {
            return store.get();
        },
        undefined,
        snapshot => {
            return selector(snapshot);
        },
    );

    return [state, store.set];
}
