import {
    createContext,
    MutableRefObject,
    ReactNode,
    useCallback,
    useContext,
    useRef,
    useSyncExternalStore,
    Context,
} from 'react';
import typedMemo from '../hocs/typedMemo';

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
export const createFastContext = <T,>(defaultValue: T) => {
    const context = createContext<UseStoreDataReturnType<T>>(
        defaultValue as unknown as UseStoreDataReturnType<T>,
    );

    return {
        // this will never cause rerender if we use it with useContext because it's just a ref
        RefContext: context,
        Provider: createProvider<T>(context as unknown as Context<T>),
        useSelector: createUseContext<T>(context as unknown as Context<T>),
    };
};

export const createProvider = <T,>(StoreContext: Context<T>) =>
    typedMemo(({ value, children }: { value: T; children: ReactNode }) => {
        return (
            <StoreContext.Provider value={useStoreData<T>(value) as any}>
                {children}
            </StoreContext.Provider>
        );
    });

export const createUseContext = <T,>(_Context: Context<T>) => {
    return <SelectorOutput,>(selector: (store: T) => SelectorOutput) =>
        useStore<SelectorOutput, T>(_Context, selector);
};

export function useStore<SelectorOutput, IStore extends Record<string, any> = {}>(
    _Context: Context<IStore>,
    selector: (store: IStore) => SelectorOutput,
): [SelectorOutput, (value: (prev: IStore) => Partial<IStore>) => void] {
    const store = useContext(_Context);
    if (!store) {
        throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
}
