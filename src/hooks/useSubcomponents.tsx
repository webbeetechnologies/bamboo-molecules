import type { ReactElement } from 'react';
import { Children, FC, isValidElement, useMemo } from 'react';

export type UseSubcomponentsProps = {
    children: ReactElement | ReactElement[];
    /**
     * array of displayName is this format 'Component.Subcomponent' - eg 'Tooltip.Trigger'
     * */
    allowedChildren: string[];
};

const useSubcomponents = ({ children, allowedChildren }: UseSubcomponentsProps) => {
    return useMemo(
        () =>
            Children.map(children, child => child).reduce((context, child) => {
                if (!isValidElement(child)) return context;

                if (
                    !allowedChildren.find(
                        name => name === ((child.type as FC).displayName as string),
                    )
                ) {
                    return context;
                }

                const name = (child.type as FC).displayName?.split('.')[1]?.toLowerCase();

                if (!name) return context;

                return {
                    ...context,
                    [name]: child,
                };
            }, {} as any),
        [allowedChildren, children],
    );
};

export default useSubcomponents;
