import { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { Linking, Text, type GestureResponderEvent, type TextProps } from 'react-native';

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
    const { hovered, actionsRef } = useActionState();

    linkStyles.useVariants({
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
    });
    const componentStyles = useMemo(() => [linkStyles.root, style], [style]);

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
