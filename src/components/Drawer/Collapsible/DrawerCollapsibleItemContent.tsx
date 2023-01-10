import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemContentProps } from '../../Accordion';

export type Props = AccordionItemContentProps & {};

const DrawerCollapsibleItemContent = memo(({ style, ...rest }: Props) => {
    const { AccordionItem } = useMolecules();
    const componentStyles = useComponentStyles('Drawer_CollapsibleItem_Content');

    return <AccordionItem.Content {...rest} style={StyleSheet.flatten([componentStyles, style])} />;
});

DrawerCollapsibleItemContent.displayName = 'AccordionItem.Content';

export default DrawerCollapsibleItemContent;
