import { forwardRef, memo, useContext, useMemo } from 'react';
import { AccordionItem, type AccordionItemHeaderProps } from '../../Accordion';
import { DrawerCollapsibleItemContext } from './DrawerCollapsibleItem';
import { resolveStateVariant } from '../../../utils';
import { drawerCollapsibleItemHeaderStyles } from './utils';

export type Props = AccordionItemHeaderProps & {};

const DrawerCollapsibleItemHeader = memo(
    forwardRef(({ style, ...rest }: Props, ref: any) => {
        const { active } = useContext(DrawerCollapsibleItemContext);

        drawerCollapsibleItemHeaderStyles.useVariants({
            state: resolveStateVariant({
                active,
            }) as any,
        });

        const { leftElementStyle, rightElementStyle, contentStyle, headerStyle } = useMemo(() => {
            const { content, leftElement, rightElement } = drawerCollapsibleItemHeaderStyles;

            return {
                headerStyle: [style],
                leftElementStyle: leftElement,
                rightElementStyle: rightElement,
                contentStyle: content,
            };
        }, [style]);

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
