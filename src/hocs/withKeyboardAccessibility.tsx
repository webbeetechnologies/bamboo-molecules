import {
    ComponentType,
    createContext,
    forwardRef,
    Fragment,
    memo,
    ReactNode,
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useSyncExternalStore,
} from 'react';
import type { FlatList } from 'react-native';
import type { SectionList } from 'react-native';
import { Platform } from 'react-native';

export type Store = {
    currentIndex: number;
};

function useStoreData() {
    const store = useRef({
        currentIndex: 0,
    });

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: (prev: Store) => Partial<Store>) => {
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
}

const StoreContext = createContext<ReturnType<typeof useStoreData> | null>(null);

function Provider({ children }: { children: ReactNode }) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
}

export function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
): [SelectorOutput, (value: (prev: Store) => Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
}

const withKeyboardAccessibility = <P extends Record<string, any>>(
    Component: ComponentType<any>,
    key: string = 'records',
    isFlat: boolean = false,
) =>
    forwardRef((props: P, ref: any) => {
        const componentRef = useRef<FlatList | SectionList>(null);
        const records = props[key] as any[];

        const recordsIndexMap = useMemo(() => {
            if (!records) return {};

            const flattenRecords = isFlat
                ? records
                : records.reduce((acc, item, sectionIndex) => {
                      return acc.concat(
                          (item.data || []).map((t: any) => ({ ...t, sectionIndex })),
                      );
                  }, [] as any[]);

            return flattenRecords.reduce((acc: Record<number, any>, item: any, i: number) => {
                acc[i] = item;

                return acc;
            }, {} as Record<number, any>);
        }, [records]);

        const length = useMemo(() => {
            if (!isFlat) {
                return records.reduce((acc, item) => {
                    acc += item.data.length;
                    return acc;
                }, 0);
            }

            return records.length;
        }, [records]);

        const onSelectItem = useCallback(
            (index: number) => {
                const selectItem = recordsIndexMap[index];

                if (!selectItem) return props.onSelectionChange?.(props.selection);

                props.onSelectionChange?.(
                    props.multiple ? [...props.selection, selectItem] : selectItem,
                );
            },
            [props, recordsIndexMap],
        );

        useImperativeHandle(ref, () => componentRef.current);

        const Wrapper =
            props.withKeyboardAccessibility && Platform.OS === 'web'
                ? AccessibilityWrapper
                : Fragment;

        const accessibilityWrapperProps =
            props.withKeyboardAccessibility && Platform.OS === 'web'
                ? {
                      listRef: componentRef as any,
                      listLength: length,
                      onSelectItem: onSelectItem,
                      isFlat,
                      onCancel: props.onCancel,
                  }
                : {};

        return (
            <Provider>
                <Wrapper {...(accessibilityWrapperProps as AccessibilityWrapperProps)}>
                    <Component {...(props as P)} ref={componentRef} />
                </Wrapper>
            </Provider>
        );
    });

type AccessibilityWrapperProps = {
    children: ReactNode;
    listRef: RefObject<FlatList> | RefObject<SectionList>;
    listLength: number;
    onSelectItem: (index: number) => void;
    isFlat: boolean;
    onCancel?: () => void;
};

const AccessibilityWrapper = memo(
    ({
        children,
        listRef,
        listLength,
        onSelectItem,
        isFlat,
        onCancel,
    }: AccessibilityWrapperProps) => {
        const [currentIndex, setStore] = useStore(state => state.currentIndex);

        const currentIndexRef = useContext(StoreContext)!.store;

        const keyToFunctionMap = useMemo(
            () => ({
                ArrowUp: () =>
                    setStore(prev => ({
                        currentIndex:
                            prev.currentIndex === null || prev.currentIndex === 0
                                ? listLength - 1
                                : prev.currentIndex - 1,
                    })),
                ArrowDown: () =>
                    setStore(prev => ({
                        currentIndex:
                            prev.currentIndex === null || prev.currentIndex === listLength - 1
                                ? 0
                                : prev.currentIndex + 1,
                    })),
                Enter: () => onSelectItem(currentIndexRef.current.currentIndex),
                Escape: () => onCancel?.(),
            }),
            [currentIndexRef, listLength, onCancel, onSelectItem, setStore],
        );

        const onKeyPress = useCallback(
            (e: KeyboardEvent) => {
                const keyFunction = keyToFunctionMap[e.key as keyof typeof keyToFunctionMap];

                if (!keyFunction) return;

                e.preventDefault();
                keyFunction();
            },
            [keyToFunctionMap],
        );

        useEffect(() => {
            if (listRef && !!listRef.current) {
                if (isFlat) {
                    (listRef as RefObject<FlatList>).current?.scrollToIndex?.({
                        index: currentIndex || 0,
                        animated: false,
                    });
                } else {
                    (listRef as RefObject<SectionList>).current?.scrollToLocation({
                        animated: false,
                        sectionIndex: 0,
                        itemIndex: currentIndex,
                    });
                }
            }
        }, [currentIndex, isFlat, listRef]);

        useEffect(() => {
            const controller = new AbortController();
            window.addEventListener('keydown', onKeyPress, {
                capture: true,
                signal: controller.signal,
            } as AddEventListenerOptions);

            return () => {
                controller.abort();
            };
        }, [onKeyPress]);

        const checkIsCurrentIndex = useCallback(
            (index: number) => index === currentIndex,
            [currentIndex],
        );

        const contextValue = useMemo(
            () => ({
                checkIsCurrentIndex,
            }),
            [checkIsCurrentIndex],
        );

        return (
            <KeyboardAccessibilityContext.Provider value={contextValue}>
                {children}
            </KeyboardAccessibilityContext.Provider>
        );
    },
);

export const KeyboardAccessibilityContext = createContext<{
    checkIsCurrentIndex: (index: number) => boolean;
}>({
    checkIsCurrentIndex: (_index: number) => false,
});

export default withKeyboardAccessibility;
