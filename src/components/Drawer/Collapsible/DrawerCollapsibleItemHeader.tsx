import { forwardRef, memo, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemHeaderProps } from '../../Accordion';
import { DrawerCollapsibleItemContext } from './DrawerCollapsibleItem';

export type Props = AccordionItemHeaderProps & {};

const DrawerCollapsibleItemHeader = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { AccordionItem } = useMolecules();
        const { active } = useContext(DrawerCollapsibleItemContext);
        const componentStyles = useComponentStyles(
            'Drawer_CollapsibleItem_Header',
            {},
            {
                states: {
                    active,
                },
            },
        );

        return (
            <AccordionItem.Header
                {...rest}
                style={StyleSheet.flatten([componentStyles, style])}
                ref={ref}
            />
        );
    }),
);

DrawerCollapsibleItemHeader.displayName = 'AccordionItem.Header';

export default DrawerCollapsibleItemHeader;
