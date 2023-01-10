import { createContext, forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemProps } from '../../Accordion';

export type Props = AccordionItemProps & {
    active?: boolean;
};

const DrawerCollapsibleItem = memo(
    forwardRef(({ style, active = false, children, ...rest }: Props, ref: any) => {
        const { AccordionItem } = useMolecules();
        const componentStyles = useComponentStyles('Drawer_CollapsibleItem');

        const contextValue = useMemo(
            () => ({
                active,
            }),
            [active],
        );

        return (
            <DrawerCollapsibleItemContext.Provider value={contextValue}>
                <AccordionItem
                    {...rest}
                    style={StyleSheet.flatten([componentStyles, style])}
                    ref={ref}>
                    {children}
                </AccordionItem>
            </DrawerCollapsibleItemContext.Provider>
        );
    }),
);

export const DrawerCollapsibleItemContext = createContext({
    active: false,
});

DrawerCollapsibleItem.displayName = 'AccordionItem';

export default DrawerCollapsibleItem;
