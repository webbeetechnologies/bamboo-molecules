import { forwardRef, memo, useCallback, useImperativeHandle } from 'react';
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

    const { hovered, actionsRef } = useActionState();

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

    useImperativeHandle(ref, () => actionsRef.current);

    return (
        <Text
            ref={actionsRef}
            style={componentStyles}
            onPress={onPress}
            accessibilityRole="button"
            {...rest}>
            {children}
        </Text>
    );
};

export default memo(forwardRef(Link));
