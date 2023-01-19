import { forwardRef, memo, useCallback } from 'react';
import type { TextProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { GestureResponderEvent } from 'react-native';
import { Linking } from 'react-native';

export type Props = TextProps &
    CallbackActionState & {
        href: string;
        disabled?: boolean;
    };

const Link = (
    {
        style,
        children,
        hovered = false,
        onPress: onPressProp,
        href,
        disabled = false,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Text } = useMolecules();
    const componentStyles = useComponentStyles('Link', style, {
        states: {
            disabled,
            hovered,
        },
    });

    const onPress = useCallback(
        (e: GestureResponderEvent) => {
            if (disabled) return;

            onPressProp?.(e);

            Linking.openURL(href);
        },
        [disabled, onPressProp, href],
    );

    return (
        <Text
            ref={ref}
            style={componentStyles}
            onPress={onPress}
            accessibilityRole="button"
            {...rest}>
            {children}
        </Text>
    );
};

export default memo(withActionState(forwardRef(Link)));
