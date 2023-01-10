import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { CallbackActionState } from '../../hocs';
import { withActionState } from '../../hocs';
import type { ViewStyle } from 'react-native';

export type DrawerItemElementProps = { color: string };

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
        labelStyle?: ViewStyle;
    };

const DrawerItem = (
    {
        left,
        right,
        label,
        children,
        style,
        active = false,
        hovered = false,
        leftElementContainerStyle = {},
        rightElementContainerStyle = {},
        labelStyle: labelStyleProp = {},
        contentStyle: contentStyleProp = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple, View } = useMolecules();
    const componentStyles = useComponentStyles(
        'Drawer_Item',
        [
            style,
            {
                leftElement: leftElementContainerStyle,
                rightElement: rightElementContainerStyle,
                content: contentStyleProp,
                label: labelStyleProp,
            },
        ],
        {
            states: {
                activeAndHovered: active && hovered,
                active,
                hovered,
            },
        },
    );

    const {
        leftElementColor,
        rightElementColor,
        containerStyle,
        leftElementStyle,
        rightElementStyle,
        contentStyle,
        labelStyle,
    } = useMemo(() => {
        const {
            leftElementColor: _leftElementColor,
            rightElementColor: _rightElementColor,
            leftElement,
            rightElement,
            label: _labelStyle,
            content,
            ...restStyle
        } = componentStyles;

        return {
            leftElementColor: _leftElementColor,
            rightElementColor: _rightElementColor,
            containerStyle: restStyle,
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
            labelStyle: _labelStyle,
            contentStyle: content,
        };
    }, [componentStyles]);

    const leftElement = useMemo(
        () =>
            left ? (
                <View style={leftElementStyle}>
                    {typeof left === 'function'
                        ? left?.({
                              color: leftElementColor,
                          })
                        : left}
                </View>
            ) : null,
        [View, left, leftElementColor, leftElementStyle],
    );

    const rightElement = useMemo(
        () =>
            right ? (
                <View style={rightElementStyle}>
                    {typeof right === 'function'
                        ? right?.({
                              color: rightElementColor,
                          })
                        : right}
                </View>
            ) : null,
        [View, right, rightElementColor, rightElementStyle],
    );

    return (
        <TouchableRipple style={containerStyle} {...rest} ref={ref}>
            <>
                {leftElement}
                <View style={contentStyle}>
                    <Text style={labelStyle} selectable={false}>
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
