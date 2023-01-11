import { forwardRef, memo, useContext, useMemo } from 'react';
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
                style={StyleSheet.flatten([headerStyle, style])}
                contentStyle={contentStyle}
                leftElementStyle={leftElementStyle}
                rightElementStyle={rightElementStyle}
                ref={ref}
            />
        );
    }),
);

DrawerCollapsibleItemHeader.displayName = 'AccordionItem.Header';

export default DrawerCollapsibleItemHeader;
