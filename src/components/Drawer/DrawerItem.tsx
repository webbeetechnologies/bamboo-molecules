import { forwardRef, memo, ReactNode, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { CallbackActionState } from '../../hocs';
import { withActionState } from '../../hocs';
import type { ViewStyle } from 'react-native';

export type Props = Omit<TouchableRippleProps, 'children' | 'disabled'> &
    CallbackActionState &
    WithElements<ReactNode> & {
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

    const { containerStyle, leftElementStyle, rightElementStyle, contentStyle, labelStyle } =
        useMemo(() => {
            const {
                leftElement,
                rightElement,
                label: _labelStyle,
                content,
                ...restStyle
            } = componentStyles;

            return {
                containerStyle: restStyle,
                leftElementStyle: leftElement,
                rightElementStyle: rightElement,
                labelStyle: _labelStyle,
                contentStyle: content,
            };
        }, [componentStyles]);

    return (
        <TouchableRipple style={containerStyle} {...rest} ref={ref}>
            <>
                <View style={leftElementStyle}>{left}</View>
                <View style={contentStyle}>
                    <Text style={labelStyle} selectable={false}>
                        {label}
                    </Text>
                    {children}
                </View>
                <View style={rightElementStyle}>{right}</View>
            </>
        </TouchableRipple>
    );
};

export default memo(withActionState(forwardRef(DrawerItem)));
