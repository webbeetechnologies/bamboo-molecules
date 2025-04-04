import type { ComponentType, Context as ContextType, PropsWithChildren } from 'react';
import { Fragment, useContext, useId, useMemo, useRef, useState } from 'react';
import typedMemo from '../hocs/typedMemo';
import { Repository } from '@bambooapp/bamboo-atoms/repository';

export const createContextBridge = <T extends object>(
    bridgeName: string,
    Wrapper: ComponentType<T>,
    contexts: ContextType<any>[] = [],
) => {
    const respository = new Repository<ContextType<any>[]>({
        name: bridgeName,
        onRegister: (arg, name, registry) => {
            return [registry[name] ?? [], arg].flat();
        },
    });

    return {
        registerContextToBridge: (updatedContexts: ContextType<any> | ContextType<any>[]) => {
            respository.register('contexts', ([] as ContextType<any>[]).concat(updatedContexts));
        },
        BridgedComponent: typedMemo((props: PropsWithChildren<T> & { name?: string }) => {
            const { name, ...rest } = props;
            const contextValuesRef = useRef<any[]>([]);

            const id = useId();

            const [allContexts] = useState(() =>
                Array.from(new Set([...contexts, ...Object.values(respository.getAll()).flat()])),
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
                }, <>{props.children}</>);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [...contextValuesRef.current, allContexts, props.children]);

            const _key = name ? name + id : id;
            return (
                <Wrapper name={name} {...(rest as T)}>
                    <Fragment key={_key}>{content}</Fragment>
                </Wrapper>
            );
        }),
    };
};
