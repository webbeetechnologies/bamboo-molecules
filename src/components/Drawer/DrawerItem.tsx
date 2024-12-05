import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { CallbackActionState } from '../../hocs';
import { withActionState } from '../../hocs';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TextProps } from '@bambooapp/bamboo-atoms';

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
        [View, left, leftElementColor, leftElementStyle, _hoveredForLeftElement],
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
        [View, right, rightElementColor, rightElementStyle, _hoveredForRightElement],
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
