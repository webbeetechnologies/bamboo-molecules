import { forwardRef, memo } from 'react';
import { StyleSheet } from 'react-native';
import type { AccordionProps } from '../../Accordion';
import { useComponentStyles, useMolecules } from '../../../hooks';

export type Props = AccordionProps & {};

const DrawerCollapsible = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { Accordion } = useMolecules();
        const componentStyles = useComponentStyles('Drawer_Collapsible');

        return (
            <Accordion {...rest} style={StyleSheet.flatten([componentStyles, style])} ref={ref} />
        );
    }),
);

DrawerCollapsible.displayName = 'Drawer.Collapsible';

export default DrawerCollapsible;
