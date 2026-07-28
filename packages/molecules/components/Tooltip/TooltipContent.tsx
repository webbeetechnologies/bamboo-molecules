import { memo, type ReactNode, useContext, useMemo } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Popover, type PopoverProps } from '../Popover';
import { Text } from '../Text';
import { TooltipContext } from './Tooltip';
import { tooltipDefaultProps, tooltipStyles } from './utils';

export type Props = Omit<PopoverProps, 'isOpen' | 'triggerRef' | 'onClose' | 'children'> & {
    children?: ReactNode;
};

const TooltipContent = memo(
    ({ children, style, inverted = tooltipDefaultProps.inverted, ...rest }: Props) => {
        const { isOpen, triggerRef, onClose, onMouseEnter, onMouseLeave } =
            useContext(TooltipContext);

        const popoverStyle = useMemo<StyleProp<ViewStyle>>(
            () => [tooltipStyles.content, style],
            [style],
        );

        if (!isOpen) return null;

        return (
            <Popover
                isOpen={isOpen}
                inverted={inverted}
                triggerRef={triggerRef}
                onClose={onClose}
                {...rest}
                style={popoverStyle}
                // @ts-ignore — onMouseEnter/onMouseLeave spread onto the inner View via ...rest in Popover
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                <Text style={tooltipStyles.contentText}>{children}</Text>
            </Popover>
        );
    },
);

TooltipContent.displayName = 'Tooltip_Content';
export default TooltipContent;
