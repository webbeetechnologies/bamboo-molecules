import { forwardRef, memo, useContext, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import type { AccordionItemHeaderProps } from '../../Accordion';
import { DrawerCollapsibleItemContext } from './DrawerCollapsibleItem';

export type Props = AccordionItemHeaderProps & {};

const DrawerCollapsibleItemHeader = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { AccordionItem } = useMolecules();
        const { active } = useContext(DrawerCollapsibleItemContext);
        const componentStyles = useComponentStyles('Drawer_CollapsibleItem_Header', style, {
            states: {
                active,
            },
        });

        const { leftElementStyle, rightElementStyle, contentStyle, headerStyle } = useMemo(() => {
            const { content, leftElement, rightElement, ...restStyles } = componentStyles;

            return {
                headerStyle: restStyles,
                leftElementStyle: leftElement,
                rightElementStyle: rightElement,
                contentStyle: content,
            };
        }, [componentStyles]);

        return (
            <AccordionItem.Header
                {...rest}
                style={headerStyle}
                contentStyle={contentStyle}
                leftElementStyle={leftElementStyle}
                rightElementStyle={rightElementStyle}
                ref={ref}
            />
        );
    }),
);

DrawerCollapsibleItemHeader.displayName = 'AccordionItem_Header';

export default DrawerCollapsibleItemHeader;
