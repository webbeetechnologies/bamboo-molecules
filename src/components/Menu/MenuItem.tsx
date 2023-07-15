import { forwardRef, memo, ReactNode, useCallback, useContext, useMemo } from 'react';
import type { GestureResponderEvent } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { CallbackActionState } from '../../hocs';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { StateLayerProps } from '../StateLayer';

import { MenuContext } from './Menu';
import { withActionState } from '../../hocs';
import type { TextProps } from '@bambooapp/bamboo-atoms';

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
    const { TouchableRipple, View, Text, StateLayer } = useMolecules();
    const { closeOnSelect, onClose } = useContext(MenuContext);

    const componentStyles = useComponentStyles(
        'Menu_Item',
        [{ text: textProps?.style || {} }, style],
        {
            size,
            states: {
                disabled,
                hovered,
            },
        },
    );

    const onPressItem = useCallback(
        (e: GestureResponderEvent) => {
            if (closeOnSelect) onClose();

            onPress?.(e);
        },
        [closeOnSelect, onClose, onPress],
    );

    const { containerStyle, leftElementStyle, rightElementStyle, textStyle, stateLayerStyle } =
        useMemo(() => {
            const { text, leftElement, rightElement, stateLayer, ...restStyle } = componentStyles;

            return {
                containerStyle: restStyle,
                textStyle: text,
                leftElementStyle: leftElement,
                rightElementStyle: rightElement,
                stateLayerStyle: stateLayer,
            };
        }, [componentStyles]);

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
