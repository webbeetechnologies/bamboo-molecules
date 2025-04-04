import { forwardRef, memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type {
    GestureResponderEvent,
    TextProps,
    ViewProps,
    PressableProps,
    StyleProp,
    ViewStyle,
} from 'react-native';

import { CallbackActionState, withActionState } from '../../hocs';
import { Icon, type IconProps, type IconType } from '../Icon';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { Badge, type BadgeProps } from '../Badge';
import { resolveStateVariant } from '../../utils';
import { StateLayer } from '../StateLayer';
import { navigationRailItemStyles } from './utils';

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
        iconContainerProps?: Partial<Omit<TouchableRippleProps, 'ref'>>;
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
                navigationRailItemStyles.useVariants({
                    state: resolveStateVariant({
                        activeAndHovered: active && hovered,
                        active,
                        hovered,
                    }) as any,
                    size,
                });
                // const componentStyles = useComponentStyles(
                //     'NavigationRail_Item',
                //     [
                //         style,
                //         {
                //             iconContainer: iconContainerProps.style || {},
                //             icon: iconProps.style || {},
                //             badge: StyleSheet.flatten([
                //                 badgeLabel && badgeProps.size !== 'sm' && styles.badgeWithLabel,
                //                 badgeProps.style || {},
                //             ]),
                //             label: labelProps.style || {},
                //             stateLayer: stateLayerProps.style || {},
                //         },
                //     ],
                //     {

                //     },
                // );

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
                    } = navigationRailItemStyles;
                    const { iconSize: _iconSize, ...restStyle } = navigationRailItemStyles.root;

                    return {
                        containerStyle: [restStyle, style] as StyleProp<ViewStyle>,
                        iconContainerStyle: [
                            iconContainer,
                            !label && {
                                height: iconContainer.width,
                            },
                            iconContainerProps.style,
                        ],
                        iconStyle: [icon, iconProps.style],
                        badgeStyle: [
                            badge,
                            badgeLabel && badgeProps.size !== 'sm' && styles.badgeWithLabel,
                            badgeProps.style,
                        ] as StyleProp<ViewStyle>,
                        labelStyle: _label,
                        stateLayerStyle: [stateLayer, stateLayerProps.style],
                        iconSize: navigationRailItemStyles.root.iconSize,
                    };
                }, [
                    badgeLabel,
                    badgeProps.size,
                    badgeProps.style,
                    iconContainerProps.style,
                    iconProps.style,
                    label,
                    stateLayerProps.style,
                    style,
                ]);

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
