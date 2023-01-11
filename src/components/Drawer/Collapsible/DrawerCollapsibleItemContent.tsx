import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemContentProps } from '../../Accordion';

export type Props = AccordionItemContentProps & {};

const DrawerCollapsibleItemContent = memo(({ style, ...rest }: Props) => {
    const { AccordionItem } = useMolecules();
    const componentStyles = useComponentStyles('Drawer_CollapsibleItem_Content');

    const styles = useMemo(
        () => StyleSheet.flatten([componentStyles, style]),
        [componentStyles, style],
    );

    return <AccordionItem.Content {...rest} style={styles} />;
});

DrawerCollapsibleItemContent.displayName = 'AccordionItem_Content';

export default DrawerCollapsibleItemContent;
