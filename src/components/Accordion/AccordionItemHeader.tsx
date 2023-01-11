import { forwardRef, memo, ReactNode, useCallback, useContext, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { TouchableRippleProps } from '../TouchableRipple';
import { AccordionItemContext } from './AccordionItem';
import { CallbackActionState, withActionState } from '../../hocs';
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';

export type AccordionHeaderElementProps = {
    color: string;
    expanded: boolean;
};

type Element = ReactNode | ((props: AccordionHeaderElementProps) => ReactNode);

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<Element> &
    CallbackActionState & {
        children: ReactNode;
        leftElementStyle?: ViewStyle;
        rightElementStyle?: ViewStyle;
        contentStyle?: TextStyle;
    };

const AccordionItemHeader = memo(
    withActionState(
        forwardRef(
            ({
                left,
                right,
                style,
                children,
                hovered = false,
                leftElementStyle: leftElementStyleProp = {},
                rightElementStyle: rightElementStyleProp = {},
                contentStyle: contentStyleProp = {},
                onPress: onPressProp,
                ...rest
            }: Props) => {
                const { View, TouchableRipple, Text } = useMolecules();
                const { expanded, onExpandedChange } = useContext(AccordionItemContext);
                const componentStyles = useComponentStyles(
                    'AccordionItem_Header',
                    [
                        style,
                        {
                            leftElement: leftElementStyleProp,
                            rightElement: rightElementStyleProp,
                            content: contentStyleProp,
                        },
                    ],
                    {
                        states: {
                            expandedAndHovered: expanded && hovered,
                            expanded,
                            hovered,
                        },
                    },
                );

                const onPress = useCallback(
                    (e: GestureResponderEvent) => {
                        onPressProp?.(e);

                        onExpandedChange(!expanded);
                    },
                    [expanded, onPressProp, onExpandedChange],
                );

                const {
                    containerStyle,
                    leftElementStyle,
                    rightElementStyle,
                    labelStyle,
                    elementColor,
                } = useMemo(() => {
                    const {
                        leftElement,
                        rightElement,
                        content,
                        elementColor: _elementColor,
                        ...restStyles
                    } = componentStyles;

                    return {
                        containerStyle: restStyles,
                        leftElementStyle: leftElement,
                        rightElementStyle: rightElement,
                        labelStyle: content,
                        elementColor: _elementColor,
                    };
                }, [componentStyles]);

                const elementProps = useMemo(
                    () => ({
                        color: elementColor,
                        expanded,
                    }),
                    [elementColor, expanded],
                );

                return (
                    <TouchableRipple style={containerStyle} {...rest} onPress={onPress}>
                        <>
                            {left && (
                                <View style={leftElementStyle}>
                                    {typeof left === 'function' ? left(elementProps) : left}
                                </View>
                            )}
                            <Text style={labelStyle} selectable={false}>
                                {children}
                            </Text>
                            {right && (
                                <View style={rightElementStyle}>
                                    {typeof right === 'function' ? right(elementProps) : right}
                                </View>
                            )}
                        </>
                    </TouchableRipple>
                );
            },
        ),
    ),
);

AccordionItemHeader.displayName = 'AccordionItem_Header';

export default AccordionItemHeader;
