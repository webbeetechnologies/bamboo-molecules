import { forwardRef, memo, ReactNode, useCallback, useContext, useMemo } from 'react';
import { Text, View, type GestureResponderEvent, type TextProps } from 'react-native';

import type { WithElements } from '../../types';
import type { CallbackActionState } from '../../hocs';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { StateLayer, type StateLayerProps } from '../StateLayer';

import { MenuContext } from './Menu';
import { withActionState } from '../../hocs';
import { resolveStateVariant } from '../../utils';
import { menuItemStyles } from './utils';

export type Props = TouchableRippleProps &
    WithElements<ReactNode> &
    CallbackActionState & {
        size?: 'default' | 'dense';
        stateLayerProps?: StateLayerProps;
        textProps?: Omit<TextProps, 'children'>;
    };

const _MenuItem = (
    {
        onPress,
        left,
        right,
        children,
        disabled = false,
        size = 'default',
        style,
        hovered = false,
        testID,
        stateLayerProps,
        textProps = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { closeOnSelect, onClose } = useContext(MenuContext);

    menuItemStyles.useVariants({
        size: size as any,
        state: resolveStateVariant({
            disabled,
            hovered,
        }) as any,
    });

    const onPressItem = useCallback(
        (e: GestureResponderEvent) => {
            if (closeOnSelect) onClose();

            onPress?.(e);
        },
        [closeOnSelect, onClose, onPress],
    );

    const { containerStyle, leftElementStyle, rightElementStyle, textStyle, stateLayerStyle } =
        useMemo(() => {
            const { text, leftElement, rightElement, stateLayer } = menuItemStyles;

            return {
                containerStyle: [menuItemStyles.root, style],
                textStyle: [text, textProps?.style],
                leftElementStyle: leftElement,
                rightElementStyle: rightElement,
                stateLayerStyle: stateLayer,
            };
        }, [style, textProps?.style]);

    return (
        <TouchableRipple
            {...rest}
            testID={testID}
            style={containerStyle}
            disabled={disabled}
            onPress={onPressItem}
            ref={ref}>
            <>
                {left ? (
                    <View style={leftElementStyle} testID={testID ? `${testID}-left` : ''}>
                        {left}
                    </View>
                ) : null}

                <Text
                    style={textStyle}
                    numberOfLines={1}
                    {...textProps}
                    testID={testID ? `${testID}-text` : ''}>
                    {children}
                </Text>

                {right ? (
                    <View style={rightElementStyle} testID={testID ? `${testID}-right` : ''}>
                        {right}
                    </View>
                ) : null}

                <StateLayer
                    testID={testID ? `${testID}-stateLayer` : ''}
                    {...stateLayerProps}
                    style={stateLayerStyle}
                />
            </>
        </TouchableRipple>
    );
};

const MenuItem = memo(withActionState(forwardRef(_MenuItem)));

MenuItem.displayName = 'Menu_Item';

export default MenuItem;
