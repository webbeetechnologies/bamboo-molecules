import type { ComponentType, Context as ContextType, ReactNode } from 'react';
import { useContext, useMemo, useRef } from 'react';
import { typedMemo } from '../hocs';

export const createContextBridge = <T extends { children: ReactNode }>(
    contexts: ContextType<any>[],
    Wrapper: ComponentType<T>,
) => {
    const reversedContexts = [...contexts].reverse();

    return typedMemo(({ children, ...rest }: T) => {
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...contextValuesRef.current, children]);

        return <Wrapper {...(rest as T)}>{content}</Wrapper>;
    });
};
