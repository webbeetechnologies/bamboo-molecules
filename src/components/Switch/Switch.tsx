import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, SwitchProps, TextStyle, ViewStyle } from 'react-native';
import {
    useActionState,
    useComponentStyles,
    useControlledValue,
    useLatest,
    useMolecules,
} from '../../hooks';
import type { IconType } from '../Icon';

export type Props = SwitchProps & {
    checkedIcon?: string;
    unCheckedIcon?: string;
    size?: number;
    checkedIconType?: IconType;
    uncheckedIconType?: IconType;
    thumbStyle?: ViewStyle;
    thumbContainerStyle?: ViewStyle;
    switchOverlayStyle?: ViewStyle;
    iconStyle?: TextStyle;
};

// TODO: Ask alex to create design tokens
const MOTION_OVERSHOOT = Easing.bezier(0.175, 0.885, 0.32, 1.275);
const MIN_SIZE_OFFSET = 0.5;
const CHECKED_OR_WITH_UNCHECKED_ICON_INITIAL_SIZE_OFFSET = 0.74;
const MAX_INITIAL_SIZE_OFFSET = 0.88;
const CHECKED_PRESSED_FINAL_SIZE_OFFSET = 0.81;
const MIN_FINAL_SIZE_OFFSET = 0.75;
const UN_CHECKED_INITIAL_MARGIN_OFFSET = 0.04;
const DEFAULT_INITIAL_MARGIN_OFFSET = 0.2;
const PRESSED_FINAL_MARGIN_OFFSET = 0.74;
const DEFAULT_FINAL_MARGIN_OFFSET = 0.75;
const SWITCH_SIZE_OFFSET = 1.62;
const SWITCH_BORDER_OFFSET = 0.0625;
const SWITCH_OVERLAY_SIZE_OFFSET = 1.2;
const MAX_SIZE_OFFSET = 0.88;
const DEFAULT_OVERLAY_OFFSET = -0.16;
const SELECTED_PRESSED_OVERLAY_OFFSET = -0.21;
const SELECTED_OR_WITH_ICON_OVERLAY_OFFSET = -0.22;
const WITHOUT_ICON_OVERLAY_OFFSET = -0.36;

const Switch = ({
    trackColor,
    size = 32,
    thumbColor,
    onValueChange,
    disabled,
    value: valueProp,
    checkedIcon,
    unCheckedIcon,
    style,
    checkedIconType,
    uncheckedIconType,
    thumbStyle: _thumbStyle,
    thumbContainerStyle: _thumbContainerStyle,
    switchOverlayStyle: _switchOverlayStyle,
    iconStyle: _iconStyle,
    ...rest
}: Props) => {
    const { Icon, Pressable } = useMolecules();
    const { actionsRef, focused, hovered, pressed } = useActionState();

    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onValueChange as any,
        defaultValue: !!valueProp,
        disabled,
    });

    const switchValueRef = useLatest(valueProp);

    const componentStyles = useComponentStyles(
        'Switch',
        [
            trackColor?.true && { checkedColor: trackColor?.true },
            trackColor?.false && { checkedColor: trackColor?.false },
            thumbColor && { thumbColor },
            style && { switchContainer: style },
            _thumbStyle && { thumb: _thumbStyle },
            _thumbContainerStyle && { thumbContainer: _thumbContainerStyle },
            _switchOverlayStyle && { overlay: _switchOverlayStyle },
            _iconStyle && { icon: _iconStyle },
        ],
        {
            states: {
                selected_hovered_pressed: !!value && !!hovered && !!pressed,
                selected_focused_pressed: !!value && !!focused && !!pressed,
                selected_hovered: !!value && !!hovered,
                selected_disabled: !!value && !!disabled,
                selected_pressed: !!value && !!pressed,
                selected_focused: !!value && !!focused && !!hovered,
                selected: !!value,
                hovered_pressed: !!hovered && !!pressed,
                disabled: !!disabled,
                hovered: !!hovered,
                focused: !!focused && !!hovered,
                pressed: !!pressed,
            },
        },
    );
    const toggleMarginAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;
    const toggleSizeAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;

    const thumbPosition = toggleMarginAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && pressed && !unCheckedIcon
                ? 0
                : unCheckedIcon
                ? size * UN_CHECKED_INITIAL_MARGIN_OFFSET
                : size * DEFAULT_INITIAL_MARGIN_OFFSET,
            pressed ? size * PRESSED_FINAL_MARGIN_OFFSET : size * DEFAULT_FINAL_MARGIN_OFFSET,
        ],
    });

    const thumbSize = toggleSizeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && !pressed && !unCheckedIcon
                ? size * MIN_SIZE_OFFSET
                : value || unCheckedIcon
                ? size * CHECKED_OR_WITH_UNCHECKED_ICON_INITIAL_SIZE_OFFSET
                : size * MAX_INITIAL_SIZE_OFFSET,
            pressed && !value
                ? size
                : pressed && value
                ? size * CHECKED_PRESSED_FINAL_SIZE_OFFSET
                : size * MIN_FINAL_SIZE_OFFSET,
        ],
    });

    useEffect(() => {
        Animated.timing(toggleMarginAnimation, {
            toValue: value ? 1 : 0,
            duration: 300,
            easing: MOTION_OVERSHOOT,
            useNativeDriver: false,
        }).start();
        Animated.timing(toggleSizeAnimation, {
            toValue: value ? 1 : 0,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [value, toggleMarginAnimation, toggleSizeAnimation]);

    const thumbOverlay = useMemo(() => {
        let left = size * DEFAULT_OVERLAY_OFFSET;

        if (value && pressed) {
            left = size * SELECTED_PRESSED_OVERLAY_OFFSET;
        } else if (value || unCheckedIcon) {
            left = size * SELECTED_OR_WITH_ICON_OVERLAY_OFFSET;
        } else if (!unCheckedIcon && !pressed) {
            left = size * WITHOUT_ICON_OVERLAY_OFFSET;
        }

        return {
            left,
            height: size * SWITCH_OVERLAY_SIZE_OFFSET,
            width: size * SWITCH_OVERLAY_SIZE_OFFSET,
            borderRadius: (size * SWITCH_OVERLAY_SIZE_OFFSET) / 2,
        };
    }, [pressed, size, unCheckedIcon, value]);

    const { switchStyle, thumbContainerStyle, thumbStyle, thumbOverlayStyle, iconStyle } =
        useMemo(() => {
            const {
                switchContainer,
                thumbContainer,
                thumb,
                icon,
                overlay,
                uncheckedColor: _uncheckedColor,
                checkedColor: _checkedColor,
                thumbColor: _thumbColor,
            } = componentStyles;

            const borderWidth = Math.floor(size * SWITCH_BORDER_OFFSET);

            return {
                switchStyle: [
                    switchContainer,
                    {
                        height: size,
                        width: size * SWITCH_SIZE_OFFSET,
                        borderRadius: size / SWITCH_SIZE_OFFSET,
                        borderWidth: borderWidth <= 1 ? 1 : borderWidth,
                        backgroundColor: value ? _checkedColor : _uncheckedColor,
                    },
                    value && { borderWidth: 0 },
                ],
                thumbContainerStyle: [
                    thumbContainer,
                    {
                        height: size,
                        width: size * SWITCH_SIZE_OFFSET,
                        borderRadius: size / SWITCH_SIZE_OFFSET,
                    },
                ],
                thumbStyle: [
                    thumb,
                    {
                        marginLeft: thumbPosition,
                        width: thumbSize,
                        height: thumbSize,
                        borderRadius: (size * MAX_SIZE_OFFSET) / 2,
                        backgroundColor: _thumbColor,
                    },
                    !value &&
                        !unCheckedIcon &&
                        !pressed && {
                            borderRadius: (size * MIN_SIZE_OFFSET) / 2,
                        },
                    pressed && {
                        borderRadius: (size * (!value ? 1 : MAX_SIZE_OFFSET)) / 2,
                    },
                ],
                thumbOverlayStyle: [
                    thumb,
                    {
                        marginLeft: thumbPosition,
                    },
                    thumbOverlay,
                    overlay,
                ],
                iconStyle: icon,
            };
        }, [
            componentStyles,
            size,
            thumbPosition,
            thumbSize,
            value,
            unCheckedIcon,
            pressed,
            thumbOverlay,
        ]);

    const handleValueChange = useCallback(() => {
        onChange(!switchValueRef.current);
    }, [onChange, switchValueRef]);

    return (
        <Pressable ref={actionsRef} style={switchStyle} onPress={handleValueChange} {...rest}>
            <Animated.View style={thumbContainerStyle as ViewStyle}>
                <Animated.View style={thumbStyle}>
                    {checkedIcon || unCheckedIcon ? (
                        <Icon
                            style={iconStyle}
                            name={(value ? checkedIcon : unCheckedIcon) as string}
                            size={size * MIN_SIZE_OFFSET}
                            type={value ? checkedIconType : uncheckedIconType}
                        />
                    ) : null}
                </Animated.View>
            </Animated.View>
            <Animated.View style={thumbOverlayStyle} />
        </Pressable>
    );
};

export default memo(forwardRef(Switch));
