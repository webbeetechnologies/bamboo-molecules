import { memo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemContentProps } from '../../Accordion';

export type Props = AccordionItemContentProps & {};

const DrawerCollapsibleItemContent = memo(({ style, ...rest }: Props) => {
    const { AccordionItem } = useMolecules();
    const componentStyles = useComponentStyles('Drawer_CollapsibleItem_Content', style);

    return <AccordionItem.Content {...rest} style={componentStyles} />;
});

DrawerCollapsibleItemContent.displayName = 'AccordionItem_Content';

export default DrawerCollapsibleItemContent;
