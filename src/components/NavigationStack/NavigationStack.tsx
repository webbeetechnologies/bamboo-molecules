import {
    useState,
    createContext,
    useMemo,
    useCallback,
    ReactElement,
    forwardRef,
    memo,
    useImperativeHandle,
    Children,
    isValidElement,
    FC,
} from 'react';

export type Props = {
    initialRouteName?: string;
    children: ReactElement | ReactElement[];
};

export type NavigationStackHandle = {
    currentRoute: string;
    push: (route: string) => void;
    pop: () => void;
    navigate: (route: string) => void;
    goBack: () => void;
};

const NavigationStack = ({ initialRouteName, children: childrenProp }: Props, ref: any) => {
    // NavigationStack.Item can only be the direct children
    const children = useMemo(
        () =>
            Children.map(childrenProp, child => child).reduce((context, child) => {
                if (!isValidElement(child)) return context;

                if ((child.type as FC).displayName !== 'NavigationStack.Item') {
                    return context;
                }

                return [...context, child];
            }, [] as ReactElement[]),
        [childrenProp],
    );
    const [currentStack, setCurrentStack] = useState<string[]>([
        initialRouteName || children[0]?.props?.name || '',
    ]);
    const currentRoute = currentStack[currentStack.length - 1] || '';

    const push = useCallback(
        (item: string) => {
            setCurrentStack([...currentStack, item]);
        },
        [currentStack],
    );

    const pop = useCallback(() => {
        // we don't want to remove the last item in the stack
        if (currentStack.length <= 1) return;

        const newStack = [...currentStack];

        newStack.pop();
        setCurrentStack(newStack);
    }, [currentStack]);

    const contextValue = useMemo(
        () => ({
            currentRoute,
            push,
            pop,
            navigate: push,
            goBack: pop,
        }),
        [currentRoute, pop, push],
    );

    // the ref will get the same methods as the context
    useImperativeHandle(ref, () => contextValue);

    return (
        <NavigationStackContext.Provider value={contextValue}>
            {children}
        </NavigationStackContext.Provider>
    );
};

type NavigationStackContextType = NavigationStackHandle & {};

export const NavigationStackContext = createContext<NavigationStackContextType>({
    currentRoute: '',
    push: () => {},
    pop: () => {},
    navigate: () => {},
    goBack: () => {},
});

export default memo(forwardRef(NavigationStack));
