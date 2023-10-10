import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, SwitchProps, ViewStyle } from 'react-native';
import { useActionState, useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { IconType } from '../Icon';

export type ToggleProps = SwitchProps & {
    checkedIcon?: string;
    unCheckedIcon?: string;
    size?: number;
    checkedIconType?: IconType;
    uncheckedIconType?: IconType;
};

// TODO: Ask alex to create design tokens
const MOTION_OVERSHOOT = Easing.bezier(0.175, 0.885, 0.32, 1.275);

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
}: ToggleProps) => {
    const { Icon } = useMolecules();
    const { actionsRef, focused, hovered, pressed } = useActionState();

    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onValueChange as any,
        defaultValue: false,
        disabled,
    });

    const componentStyles = useComponentStyles(
        'Switch',
        [
            style,
            trackColor?.true && { checkedColor: trackColor?.true },
            trackColor?.false && { checkedColor: trackColor?.false },
            thumbColor && { thumbColor },
        ],
        {
            states: {
                selected_hovered_pressed: !!value && !!hovered && !!pressed,
                selected_focused_pressed: !!value && !!focused && !!pressed,
                selected_hovered: !!value && !!hovered,
                selected_disabled: !!value && !!disabled,
                selected_pressed: !!value && !!pressed,
                selected_focused: !!value && !!focused,
                selected: !!value,
                hovered_pressed: !!hovered && !!pressed,
                disabled: !!disabled,
                hovered: !!hovered,
                focused: !!focused,
                pressed: !!pressed,
            },
        },
    );
    const toggleMarginAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;
    const toggleSizeAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;

    const thumbPosition = toggleMarginAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && pressed && !unCheckedIcon ? 0 : unCheckedIcon ? size * 0.04 : size * 0.2,
            pressed ? size * 0.74 : size * 0.81,
        ],
    });

    const thumbSize = toggleSizeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && !pressed && !unCheckedIcon
                ? size * 0.5
                : value || unCheckedIcon
                ? size * 0.74
                : size * 0.88,
            pressed && !value ? size : pressed && value ? size * 0.81 : size * 0.64,
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
        let left = size * -0.16;

        if (value && pressed) {
            left = size * -0.21;
        } else if (value || unCheckedIcon) {
            left = size * -0.28;
        } else if (!unCheckedIcon && !pressed) {
            left = size * -0.36;
        }

        return {
            left,
            height: size * 1.2,
            width: size * 1.2,
            borderRadius: (size * 1.2) / 2,
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

            return {
                switchStyle: [
                    switchContainer,
                    {
                        height: size,
                        width: size * 1.62,
                        borderRadius: size / 1.62,
                        borderWidth: Math.floor(size * 0.0625),
                        backgroundColor: value ? _checkedColor : _uncheckedColor,
                    },
                    value && { borderWidth: 0 },
                ],
                thumbContainerStyle: [
                    thumbContainer,
                    {
                        height: size,
                        width: size * 1.62,
                        borderRadius: size / 1.62,
                    },
                ],
                thumbStyle: [
                    thumb,
                    {
                        marginLeft: thumbPosition,
                        width: thumbSize,
                        height: thumbSize,
                        borderRadius: (size * 0.88) / 2,
                        backgroundColor: _thumbColor,
                    },
                    !value &&
                        !unCheckedIcon &&
                        !pressed && {
                            borderRadius: (size * 0.5) / 2,
                        },
                    pressed && {
                        borderRadius: (size * (!value ? 1 : 0.88)) / 2,
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
        onChange(!value);
    }, [value, onChange]);

    return (
        <Pressable ref={actionsRef} style={switchStyle} onPress={handleValueChange}>
            <Animated.View style={thumbContainerStyle as ViewStyle}>
                <Animated.View style={thumbStyle}>
                    {checkedIcon || unCheckedIcon ? (
                        <Icon
                            style={iconStyle}
                            name={(value ? checkedIcon : unCheckedIcon) as string}
                            size={size * 0.5}
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
