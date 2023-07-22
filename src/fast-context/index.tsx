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

type StoreDataType = Record<string, any>;

type SelectorOutputType<IStore, SelectorOutput> = (store: IStore) => SelectorOutput;

type UseStoreDataReturnType<T> = {
    get: () => T;
    set: (value: (prev: T) => Partial<T>) => void;
    store: MutableRefObject<T>;
    subscribe: (callback: () => void) => () => void;
};

const useStoreData = <IStore extends StoreDataType>(
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

export const createFastContext = <T extends StoreDataType = {}>() => {
    const context = createContext<UseStoreDataReturnType<T> | null>(null);

    return {
        /**
         * using the value from here will never cause a rerender as context is based on refs.
         */
        useStoreRef: createUseRefContext(context),

        /**
         *
         * the value is memoized and thus changing the value will have no effect.
         * use key prop to unmount and remount if necessary. alternatively use set from the context to update the value.
         *
         */
        Provider: createProvider<T>(context as Context<UseStoreDataReturnType<T>>),

        /**
         *
         * @param selector
         * @param equalityCheck
         * @returns tuple, first item is return value of the selector and the second item is setter
         *
         */
        useContext: <SelectorOutput,>(
            selector: SelectorOutputType<T, SelectorOutput>,
            equalityCheck = Object.is,
        ) => useStore(context as Context<UseStoreDataReturnType<T>>, selector, equalityCheck),

        /**
         *
         * @param selector
         * @param equalityCheck
         * @returns return value of the selector
         *
         */
        useContextValue: <SelectorOutput,>(
            selector: SelectorOutputType<T, SelectorOutput>,
            equalityCheck = Object.is,
        ) => useStoreValue(context as Context<UseStoreDataReturnType<T>>, selector, equalityCheck),
    };
};

export const createProvider = <T extends Record<string, any> = {}>(
    StoreContext: Context<UseStoreDataReturnType<T>>,
) =>
    typedMemo(({ value, children }: { value: T; children: ReactNode }) => {
        return (
            <StoreContext.Provider value={useStoreData<T>(value) as any}>
                {children}
            </StoreContext.Provider>
        );
    });

export const createUseRefContext = <T,>(_Context: Context<UseStoreDataReturnType<T> | null>) => {
    return () => {
        const value = useContext<UseStoreDataReturnType<T> | null>(_Context);
        if (value === null)
            throw 'Fast Context requires the value to be wrapped in a Provider with a value.';

        return value;
    };
};

export const useStore = <IStore extends StoreDataType, SelectorOutput>(
    _Context: Context<UseStoreDataReturnType<IStore>>,
    selector: SelectorOutputType<IStore, SelectorOutput>,
    equalityFn = Object.is,
): [SelectorOutput, (value: (prev: IStore) => Partial<IStore>) => void] => {
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
        equalityFn,
    );

    return [state, store.set];
};

export const useStoreValue = <IStore extends StoreDataType, SelectorOutput>(
    _Context: Context<UseStoreDataReturnType<IStore>>,
    selector: SelectorOutputType<IStore, SelectorOutput>,
    equalityFn = Object.is,
) => {
    return useStore(_Context, selector, equalityFn)[0];
};
