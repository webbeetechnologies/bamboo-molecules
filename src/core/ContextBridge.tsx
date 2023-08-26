import type { ComponentType, Context as ContextType, ReactNode } from 'react';
import { useContext, useMemo, useRef, useState } from 'react';
import { typedMemo } from '../hocs';
import { Repository } from '@bambooapp/bamboo-atoms/repository';

const portalContextRepository = new Repository<ContextType<any>[]>({
    name: 'portal-context',
    onRegister: (arg, name, registry) => {
        return [registry[name] ?? [], arg].flat();
    },
});

export const registerPortalContext = (contexts: ContextType<any> | ContextType<any>[]) => {
    portalContextRepository.register('contexts', ([] as ContextType<any>[]).concat(contexts));
};

export const createContextBridge = <T extends { children: ReactNode }>(
    contexts: ContextType<any>[],
    Wrapper: ComponentType<T>,
) => {
    return typedMemo(({ children, ...rest }: T) => {
        const contextValuesRef = useRef<any[]>([]);

        const [allContexts] = useState(() =>
            Array.from(
                new Set([...contexts, ...Object.values(portalContextRepository.getAll()).flat()]),
            ),
        );

        for (const i in allContexts) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            contextValuesRef.current[i] = useContext(allContexts[i]);
        }

        const content = useMemo(() => {
            return allContexts.reduce((acc, Context, currentIndex) => {
                return (
                    <Context.Provider value={contextValuesRef.current[currentIndex]}>
                        {acc}
                    </Context.Provider>
                );
            }, <>{children}</>);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [...contextValuesRef.current, allContexts, children]);

        return <Wrapper {...(rest as T)}>{content}</Wrapper>;
    });
};
