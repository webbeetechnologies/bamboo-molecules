import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import type { TextProps } from '@bambooapp/bamboo-atoms';
import { Linking, GestureResponderEvent } from 'react-native';

import { useActionState, useComponentStyles, useMolecules } from '../../hooks';

export type Props = TextProps & {
    href?: string;
    disabled?: boolean;
};

const Link = (
    { style, children, onPress: onPressProp, href, disabled = false, ...rest }: Props,
    ref: any,
) => {
    const { Text } = useMolecules();

    const triggerRef = useRef(null);
    const { hovered } = useActionState({ ref: triggerRef });

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

            if (href) Linking.openURL(href);
        },
        [disabled, onPressProp, href],
    );

    useImperativeHandle(ref, () => triggerRef.current);

    return (
        <Text
            ref={triggerRef}
            style={componentStyles}
            onPress={onPress}
            accessibilityRole="button"
            {...rest}>
            {children}
        </Text>
    );
};

export default memo(forwardRef(Link));
