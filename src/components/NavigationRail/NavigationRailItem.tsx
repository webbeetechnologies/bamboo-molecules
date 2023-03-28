import { forwardRef, memo, useCallback, useMemo } from 'react';
import { GestureResponderEvent, Pressable, PressableProps, StyleSheet } from 'react-native';
import type { TextProps, ViewProps } from '@bambooapp/bamboo-atoms';

import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { IconProps, IconType } from '../Icon';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { BadgeProps } from '../Badge';

export type Props = Omit<PressableProps, 'children' | 'disabled' | 'onPress'> &
    CallbackActionState & {
        /**
         * Whether the NavigationRailItem is active or not
         * */
        active?: boolean;
        /**
         * label of the NavigationRailItem, if not specified only the icon will be shown and active indicator with be circular
         * */
        label?: string;
        /**
         * name of the icon
         * */
        iconName: string;
        /**
         * type of the icon
         * */
        iconType?: IconType;
        /**
         * name of the active icon. If not specified, iconName will be used
         * */
        activeIconName?: string;
        /**
         * type of the active icon. If not specified, default iconType will be used
         * */
        activeIconType?: IconType;
        /**
         * Icon Props
         * */
        iconProps?: Omit<IconProps, 'name' | 'type'>;
        /**
         * size of the NavigationRailItem
         * */
        size?: 'sm' | 'md' | 'lg';
        /**
         * onPress event for the icon, the same event will be triggered if it's click on the icon, the label or the overall item
         * */
        onPress?: (e: GestureResponderEvent) => void;
        /**
         * Icon Container Props
         * */
        iconContainerProps?: Partial<TouchableRippleProps>;
        /**
         * Label Props
         * */
        labelProps?: Partial<TextProps>;
        /**
         * Whether to display the badge or not
         * */
        showBadge?: boolean;
        /**
         * Badge Label, if it's not specified and showBadge is true, sm badge will display
         * */
        badgeLabel?: BadgeProps['label'];
        /**
         * Badge Props
         * */
        badgeProps?: Omit<BadgeProps, 'label'>;
        /**
         * Props for the state layer
         * */
        stateLayerProps?: ViewProps;
    };

const emptyObj = {};

const NavigationRailItem = memo(
    withActionState(
        forwardRef(
            (
                {
                    active = false,
                    iconName,
                    iconType,
                    activeIconName,
                    activeIconType,
                    iconProps = emptyObj,
                    style,
                    label,
                    hovered = false,
                    size = 'md',
                    onPress,
                    iconContainerProps = emptyObj,
                    labelProps = emptyObj,
                    showBadge = false,
                    badgeLabel,
                    badgeProps = emptyObj,
                    stateLayerProps = emptyObj,
                    testID,
                    ...rest
                }: Props,
                ref: any,
            ) => {
                const { Badge, Icon, TouchableRipple, StateLayer, Text } = useMolecules();

                const componentStyles = useComponentStyles(
                    'NavigationRail_Item',
                    [
                        style,
                        {
                            iconContainer: iconContainerProps.style || {},
                            icon: iconProps.style || {},
                            badge: StyleSheet.flatten([
                                badgeLabel && badgeProps.size !== 'sm' && styles.badgeWithLabel,
                                badgeProps.style || {},
                            ]),
                            label: labelProps.style || {},
                            stateLayer: stateLayerProps.style || {},
                        },
                    ],
                    {
                        states: {
                            activeAndHovered: active && hovered,
                            active,
                            hovered,
                        },
                        size,
                    },
                );

                const {
                    containerStyle,
                    iconContainerStyle,
                    iconStyle,
                    badgeStyle,
                    labelStyle,
                    stateLayerStyle,
                    iconSize,
                } = useMemo(() => {
                    const {
                        iconContainer,
                        icon,
                        label: _label,
                        badge,
                        stateLayer,
                        iconSize: _iconSize,
                        ...restStyle
                    } = componentStyles;

                    return {
                        containerStyle: restStyle,
                        iconContainerStyle: [
                            iconContainer,
                            !label && {
                                height: iconContainer.width,
                            },
                        ],
                        iconStyle: icon,
                        badgeStyle: badge,
                        labelStyle: _label,
                        stateLayerStyle: stateLayer,
                        iconSize: _iconSize,
                    };
                }, [componentStyles, label]);

                const onPressIconContainer = useCallback(
                    (e: GestureResponderEvent) => {
                        iconContainerProps.onPress?.(e);
                        onPress?.(e);
                    },
                    [iconContainerProps, onPress],
                );

                // TODO: abstract the stateLayer
                return (
                    <Pressable
                        style={containerStyle}
                        onPress={onPress}
                        accessibilityRole="button"
                        testID={testID}
                        {...rest}
                        ref={ref}>
                        <TouchableRipple
                            borderless
                            testID={testID ? `${testID}-iconContainer` : ''}
                            {...iconContainerProps}
                            style={iconContainerStyle}
                            onPress={onPressIconContainer}>
                            <>
                                <Icon
                                    size={iconSize}
                                    testID={testID ? `${testID}-icon` : ''}
                                    {...iconProps}
                                    style={iconStyle}
                                    name={active ? activeIconName || iconName : iconName}
                                    type={active ? activeIconType || iconType : iconType}>
                                    {showBadge && (
                                        <Badge
                                            label={badgeLabel}
                                            {...badgeProps}
                                            style={badgeStyle}
                                        />
                                    )}
                                </Icon>
                                <StateLayer
                                    testID={testID ? `${testID}-stateLayer` : ''}
                                    {...stateLayerProps}
                                    style={stateLayerStyle}
                                />
                            </>
                        </TouchableRipple>
                        <>
                            {label && (
                                <Text
                                    selectable={false}
                                    testID={testID ? `${testID}-label` : ''}
                                    {...labelProps}
                                    style={labelStyle}>
                                    {label}
                                </Text>
                            )}
                        </>
                    </Pressable>
                );
            },
        ),
    ),
);

NavigationRailItem.displayName = 'NavigationRail_Item';

const styles = StyleSheet.create({
    badgeWithLabel: {
        bottom: '55%',
        left: '45%',
    },
});

export default NavigationRailItem;
