import type { ReactElement } from 'react';
import { Children, FC, isValidElement, useMemo } from 'react';
import { camelCase } from '../utils';

export type UseSubcomponentsProps = {
    children: ReactElement | ReactElement[];
    /**
     * array of displayName is this format 'Component.Subcomponent' - eg 'Tooltip.Trigger'
     * */
    allowedChildren: string[];
};

/**
 *  This will return an object with the camelCase format of the subComponents' displayNames as the properties
 *  eg. allowedChildren: ['Drawer.Header', 'Drawer.Content', 'Drawer.Footer', 'DrawerItem'];
 *
 *  return value -> {
 *    header: [],
 *    content: [],
 *    footer: [],
 *    drawerItem: [],
 *  }
 *  */
const useSubcomponents = ({ children, allowedChildren }: UseSubcomponentsProps) => {
    return useMemo(() => {
        // this will create properties with default empty array values even if they don't exist in the children
        const defaultContext = allowedChildren.reduce((context, childName) => {
            // the displayNames may not always have the dot // we will allow it to be flexible
            const name = camelCase(childName.split('.')[1] || childName);

            if (!name) return context;

            return {
                ...context,
                [name]: [],
            };
        }, {}) as {
            [key: string]: ReactElement[];
        };

        return Children.map(children, child => child).reduce((context, child) => {
            if (!isValidElement(child)) return context;

            if (
                !allowedChildren.find(name => name === ((child.type as FC).displayName as string))
            ) {
                return context;
            }

            const name = camelCase(
                (child.type as FC).displayName?.split('.')[1] || (child.type as FC).displayName,
            );

            if (!name) return context;

            return {
                ...context,
                [name]: [...context[name], child],
            };
        }, defaultContext);
    }, [allowedChildren, children]);
};

export default useSubcomponents;
