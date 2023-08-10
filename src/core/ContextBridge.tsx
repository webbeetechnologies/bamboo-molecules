import type { ComponentType, Context, ReactNode } from 'react';
import { memo } from 'react';

export type Props = {
    children: ReactNode;
    context: Context<any>;
    Wrapper: ComponentType<any>;
};

// TODO - support nested context tree
const ContextBridge = ({ children, context: Context, Wrapper }: Props) => {
    return (
        <Context.Consumer>
            {value => (
                <Wrapper>
                    <Context.Provider value={value}>{children}</Context.Provider>
                </Wrapper>
            )}
        </Context.Consumer>
    );
};

export default memo(ContextBridge);
