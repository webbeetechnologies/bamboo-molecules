import type { Context as ContextType, ReactNode } from 'react';
import { memo, useContext, useMemo, useRef } from 'react';

export type Props = {
    children: ReactNode;
    render: (children: ReactNode) => ReactNode;
};

export const createContextBridge = (contexts: ContextType<any>[]) => {
    const reversedContexts = [...contexts].reverse();

    return memo(({ children, render }: Props) => {
        const contextValuesRef = useRef<any[]>([]);

        for (const i in reversedContexts) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            contextValuesRef.current[i] = useContext(contexts[i]);
        }

        const content = useMemo(() => {
            return reversedContexts.reduce((acc, Context, currentIndex) => {
                return (
                    <Context.Provider value={contextValuesRef.current[currentIndex]}>
                        {acc}
                    </Context.Provider>
                );
            }, <>{children}</>);
        }, [children]);

        return <>{render(content)}</>;
    });
};
