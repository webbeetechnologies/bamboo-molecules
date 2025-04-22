import { forwardRef, memo, ReactNode, useCallback, useContext, useMemo } from 'react';
import type { WithElements } from '../../types';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { AccordionItemContext } from './AccordionItem';
import { View, type GestureResponderEvent, type TextStyle, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { accordionItemHeaderStyles } from './utils';
import { resolveStateVariant } from '../../utils';
import { useActionState } from '../../hooks';

export type AccordionHeaderElementProps = {
    color: string;
    expanded: boolean;
};

type Element = ReactNode | ((props: AccordionHeaderElementProps) => ReactNode);

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<Element> & {
        children: ReactNode;
        leftElementStyle?: ViewStyle;
        rightElementStyle?: ViewStyle;
        contentStyle?: TextStyle;
    };

const emptyArr = {};

const AccordionItemHeader = memo(
    forwardRef(
        (
            {
                left,
                right,
                style,
                children,
                leftElementStyle: leftElementStyleProp = emptyArr,
                rightElementStyle: rightElementStyleProp = emptyArr,
                contentStyle: contentStyleProp = emptyArr,
                onPress: onPressProp,
                ...rest
            }: Props,
            ref: any,
        ) => {
            const { hovered, actionsRef } = useActionState({ ref, actionsToListen: ['hover'] });

            const { expanded, onExpandedChange } = useContext(AccordionItemContext);

            // @ts-ignore // TODO - fix this issue
            accordionItemHeaderStyles.useVariants({
                state: {
                    states: resolveStateVariant({
                        expandedAndHovered: expanded && hovered,
                        expanded,
                        hovered,
                    }),
                },
            });

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
                const { leftElement, rightElement, content } = accordionItemHeaderStyles;

                return {
                    containerStyle: [accordionItemHeaderStyles.root, style],
                    leftElementStyle: [leftElement, leftElementStyleProp],
                    rightElementStyle: [rightElement, rightElementStyleProp],
                    labelStyle: [content, contentStyleProp],
                    elementColor: accordionItemHeaderStyles.root.elementColor,
                };
            }, [contentStyleProp, leftElementStyleProp, rightElementStyleProp, style]);

            const elementProps = useMemo(
                () => ({
                    color: elementColor,
                    expanded,
                }),
                [elementColor, expanded],
            );

            return (
                <TouchableRipple
                    style={containerStyle}
                    {...rest}
                    onPress={onPress}
                    ref={actionsRef}>
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
);

AccordionItemHeader.displayName = 'AccordionItem_Header';

export default AccordionItemHeader;
