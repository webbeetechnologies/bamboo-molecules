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

export type Store = {
    currentIndex: number;
};

type UseStoreDataReturnType<IStore extends Record<string, any> = {}> = {
    get: () => IStore;
    set: (value: (prev: IStore) => Partial<IStore>) => void;
    store: MutableRefObject<IStore>;
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

export const createFastContext = <IStore extends Record<string, any> = {}, TDefaultValue = any>(
    defaultValue: TDefaultValue,
) => createContext<UseStoreDataReturnType<IStore> | TDefaultValue>(defaultValue);

export const createProvider = <IStore extends Record<string, any> = {}>(
    StoreContext: Context<IStore>,
) =>
    typedMemo(({ value, children }: { value: IStore; children: ReactNode }) => {
        return (
            <StoreContext.Provider value={useStoreData<IStore>(value) as any}>
                {children}
            </StoreContext.Provider>
        );
    });

export const createUseContext = <IStore extends Record<string, any>>(
    _Context: Context<UseStoreDataReturnType<IStore> | null>,
) => {
    return <SelectorOutput,>(selector: (store: IStore) => SelectorOutput) =>
        useStore<SelectorOutput, IStore>(_Context, selector);
};

export function useStore<SelectorOutput, IStore extends Record<string, any> = {}>(
    _Context: Context<UseStoreDataReturnType<IStore> | null>,
    selector: (store: IStore) => SelectorOutput,
): [SelectorOutput, (value: (prev: IStore) => Partial<IStore>) => void] {
    const store = useContext(_Context);
    if (!store) {
        throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
}
