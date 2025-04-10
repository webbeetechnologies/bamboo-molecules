import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { type TextStyle, type ViewStyle, type TextProps, View } from 'react-native';
import { Text } from '../Text';

import type { WithElements } from '../../types';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import type { CallbackActionState } from '../../hocs';
import { withActionState } from '../../hocs';
import { resolveStateVariant } from '../../utils';
import { drawerItemStyles } from './utils';

export type DrawerItemElementProps = { color: string; hovered: boolean };

export type DrawerItemElement = ReactNode | ((props: DrawerItemElementProps) => ReactNode);

export type Props = Omit<TouchableRippleProps, 'children' | 'disabled'> &
    CallbackActionState &
    WithElements<DrawerItemElement> & {
        label?: string;
        active?: boolean;
        children?: ReactNode;

        leftElementContainerStyle?: ViewStyle;
        rightElementContainerStyle?: ViewStyle;
        contentStyle?: ViewStyle;
        labelStyle?: TextStyle;
        labelProps?: Omit<TextProps, 'children' | 'style'>;
    };

const emptyObj = {};

const DrawerItem = (
    {
        left,
        right,
        label,
        children,
        style,
        active = false,
        hovered = false,
        leftElementContainerStyle = emptyObj,
        rightElementContainerStyle = emptyObj,
        labelStyle: labelStyleProp = emptyObj,
        contentStyle: contentStyleProp = emptyObj,
        labelProps,
        ...rest
    }: Props,
    ref: any,
) => {
    drawerItemStyles.useVariants({
        state: resolveStateVariant({
            activeAndHovered: active && hovered,
            active,
            hovered,
        }) as any,
    });

    const {
        leftElementColor,
        rightElementColor,
        containerStyle,
        leftElementStyle,
        rightElementStyle,
        contentStyle,
        labelStyle,
    } = useMemo(() => {
        const { leftElement, rightElement, label: _labelStyle, content } = drawerItemStyles;
        const {
            leftElementColor: _leftElementColor,
            rightElementColor: _rightElementColor,
            ...restStyle
        } = drawerItemStyles.root;

        return {
            leftElementColor: _leftElementColor,
            rightElementColor: _rightElementColor,
            containerStyle: [restStyle, style],
            leftElementStyle: [leftElement, leftElementContainerStyle],
            rightElementStyle: [rightElement, rightElementContainerStyle],
            labelStyle: [_labelStyle, labelStyleProp],
            contentStyle: [content, contentStyleProp],
        };
    }, [
        contentStyleProp,
        labelStyleProp,
        leftElementContainerStyle,
        rightElementContainerStyle,
        style,
    ]);

    const _hoveredForLeftElement = typeof left === 'function' ? hovered : false;
    const _hoveredForRightElement = typeof right === 'function' ? hovered : false;

    const leftElement = useMemo(
        () =>
            left ? (
                <View style={leftElementStyle}>
                    {typeof left === 'function'
                        ? left?.({
                              color: leftElementColor,
                              hovered: _hoveredForLeftElement,
                          })
                        : left}
                </View>
            ) : null,
        [left, leftElementColor, leftElementStyle, _hoveredForLeftElement],
    );

    const rightElement = useMemo(
        () =>
            right ? (
                <View style={rightElementStyle}>
                    {typeof right === 'function'
                        ? right?.({
                              color: rightElementColor,
                              hovered: _hoveredForRightElement,
                          })
                        : right}
                </View>
            ) : null,
        [right, rightElementColor, rightElementStyle, _hoveredForRightElement],
    );

    return (
        <TouchableRipple style={containerStyle} {...rest} ref={ref}>
            <>
                {leftElement}
                <View style={contentStyle}>
                    <Text style={labelStyle} selectable={false} {...labelProps}>
                        {label}
                    </Text>
                    {children}
                </View>
                {rightElement}
            </>
        </TouchableRipple>
    );
};

export default memo(withActionState(forwardRef(DrawerItem)));
