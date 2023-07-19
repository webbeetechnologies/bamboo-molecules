import type { TouchableRippleProps } from '../TouchableRipple';
import { memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native';
import type { IconType, IconProps } from '../Icon';
import { CallbackActionState, withActionState } from '../../hocs';
import type { TextProps, ViewProps } from '@bambooapp/bamboo-atoms';

const DEFAULT_ICON_SIZE = 24;

export type TabItemProps = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState & {
        /**
         * name of the tab. This should be unique like a route name
         * */
        name: string;
        /**
         * Allows to define if TabItem is active.
         * */
        active?: boolean;
        /**
         * variant according to m3 guidelines
         * */
        variant?: 'primary' | 'secondary';
        /**
         * active color for the label and the icon. This should normally come from the parent component - (Tabs)
         * */
        activeColor?: string;
        /**
         * label of the tab
         * */
        label?: string;
        labelStyle?: TextStyle;
        labelProps?: Omit<TextProps, 'children' | 'style'>;
        /**
         * icon properties
         * */
        iconName?: string;
        iconType?: IconType;
        iconProps?: Omit<IconProps, 'name' | 'type'>;
        iconStyle?: TextStyle;
        contentsContainerStyle?: ViewStyle;
        contentsContainerProps?: Omit<ViewProps, 'children' | 'style' | 'onLayout'>;
        onLayoutContent?: (e: LayoutChangeEvent) => void;
    };

const emptyObj = {};

const TabItemWithActionState = withActionState(
    ({
        active = false,
        variant = 'primary',
        label,
        style,
        onLayout,
        onLayoutContent,
        iconName,
        iconType,
        iconProps,
        iconStyle: iconStyleProp = emptyObj,
        activeColor: activeColorProp,
        hovered = false,
        labelStyle: labelStyleProp,
        labelProps,
        contentsContainerStyle: contentsContainerStyleProp,
        contentsContainerProps,
        ...rest
    }: TabItemProps) => {
        const { TouchableRipple, Text, Icon, View, StateLayer } = useMolecules();

        const componentStyles = useComponentStyles(
            'Tabs_Item',
            [
                style,
                {
                    icon: iconStyleProp,
                    ...(activeColorProp ? { activeColor: activeColorProp } : {}),
                    label: labelStyleProp || {},
                    contentsContainer: contentsContainerStyleProp || {},
                },
            ],
            {
                variant,
                states: {
                    activeAndHovered: active && hovered,
                    hovered,
                    active,
                },
            },
        );

        const { contentsContainerStyle, stateLayerStyle, labelStyle, iconStyle, containerStyle } =
            useMemo(() => {
                const {
                    minHeight,
                    activeColor,
                    contentsContainer,
                    label: _labelStyle,
                    icon,
                    stateLayer,
                    ...restStyle
                } = componentStyles;

                return {
                    containerStyle: [
                        {
                            minHeight:
                                iconName && label
                                    ? minHeight + (iconProps?.size || DEFAULT_ICON_SIZE) - 4
                                    : minHeight,
                        },
                        restStyle,
                    ],
                    contentsContainerStyle: contentsContainer,
                    labelStyle: [
                        _labelStyle,
                        active && {
                            color: activeColor,
                        },
                    ],
                    iconStyle: [
                        icon,
                        active && {
                            color: activeColor,
                        },
                    ],
                    stateLayerStyle: stateLayer,
                };
            }, [active, componentStyles, iconName, iconProps?.size, label]);

        const { accessibilityState, accessibilityValue } = useMemo(
            () => ({
                accessibilityState: { selected: active },
                accessibilityValue: typeof label === 'string' ? { text: label } : undefined,
            }),
            [active, label],
        );

        return (
            <TouchableRipple
                style={containerStyle}
                accessibilityRole="tab"
                accessibilityState={accessibilityState}
                accessibilityValue={accessibilityValue}
                {...rest}
                onLayout={onLayout}>
                <>
                    <View
                        style={contentsContainerStyle}
                        {...contentsContainerProps}
                        onLayout={onLayoutContent}>
                        {iconName && (
                            <Icon
                                style={iconStyle}
                                name={iconName}
                                type={iconType}
                                size={DEFAULT_ICON_SIZE}
                                {...iconProps}
                            />
                        )}
                        <Text style={labelStyle} numberOfLines={1} {...labelProps}>
                            {label}
                        </Text>
                    </View>

                    <StateLayer style={stateLayerStyle} />
                </>
            </TouchableRipple>
        );
    },
);

const TabItem = memo(
    ({ actionStateContainerProps: _actionStateContainerProps, ...rest }: TabItemProps) => {
        const { actionStateContainerProps } = useMemo(
            () => ({
                actionStateContainerProps: {
                    ..._actionStateContainerProps,
                    style: [{ flex: 1 }, _actionStateContainerProps?.style],
                },
            }),
            [_actionStateContainerProps],
        );

        return (
            <TabItemWithActionState
                {...rest}
                actionStateContainerProps={actionStateContainerProps}
            />
        );
    },
);

TabItem.displayName = 'Tabs_Item';

export default TabItem;
