import { forwardRef, memo, useCallback } from 'react';
import { Linking, Platform, type GestureResponderEvent, type TextProps } from 'react-native';

import { Text } from '../Text';

import { useActionState } from '../../hooks';
import { resolveStateVariant } from '../../utils';
import { linkStyles } from './utils';

export type Props = TextProps & {
    href?: string;
    disabled?: boolean;
};

const Link = (
    { style, children, onPress: onPressProp, href, disabled = false, ...rest }: Props,
    ref: any,
) => {
    const { hovered, actionsRef } = useActionState({ ref, actionsToListen: ['hover'] });

    linkStyles.useVariants({
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
    });

    const onPress = useCallback(
        (e: GestureResponderEvent) => {
            if (disabled) return;

            onPressProp?.(e);

            if (href) Linking.openURL(href);
        },
        [disabled, onPressProp, href],
    );

    return (
        <Text
            ref={actionsRef}
            style={[linkStyles.root, style]}
            {...(Platform.OS === 'web' ? { href } : { onPress })}
            accessibilityRole="link"
            {...rest}>
            {children}
        </Text>
    );
};

export default memo(forwardRef(Link));
