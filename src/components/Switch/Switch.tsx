import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, SwitchProps } from 'react-native';
import { useActionState, useComponentStyles, useMolecules } from '../../hooks';

export type ToggleProps = SwitchProps & {
    checkedIcon?: string;
    unCheckedIcon?: string;
    size?: number;
};

const Switch = ({
    trackColor,
    size = 32,
    thumbColor,
    onValueChange,
    disabled,
    value,
    checkedIcon,
    unCheckedIcon,
    style,
}: ToggleProps) => {
    const { Icon, TouchableRipple, View } = useMolecules();
    const { actionsRef, focused, hovered, pressed } = useActionState();

    const componentStyles = useComponentStyles('Switch', style, {
        states: {
            selected: !!value && !hovered && !focused && !pressed,
            selected_disabled: !!value && !!disabled,
            disabled: !!disabled,
            hovered: !!hovered,
            selected_hovered: !!value && !!hovered,
            focused: !!focused,
            selected_focused: !!value && !!focused,
            pressed: !!hovered && !!pressed,
            selected_pressed: !!value && !!pressed,
        },
    });
    const toggleMarginAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;
    const toggleSizeAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;

    const moveToggle = toggleMarginAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [size * 0.05, size * 1.08],
    });

    const toggleSize = toggleSizeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && !pressed && !unCheckedIcon ? size * 0.5 : size * 0.8,
            pressed ? size * 0.85 : size * 0.8,
        ],
    });

    const color = useMemo(
        () => (value ? trackColor?.true : trackColor?.false),
        [trackColor?.false, trackColor?.true, value],
    );

    useEffect(() => {
        Animated.timing(toggleMarginAnimation, {
            toValue: value ? 1 : 0,
            duration: 300,
            easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
            useNativeDriver: false,
        }).start();
        Animated.timing(toggleSizeAnimation, {
            toValue: value ? 1 : 0,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [value, toggleMarginAnimation, toggleSizeAnimation]);

    const thumbOverlay = useMemo(
        () => ({
            position: 'absolute',
            left: value ? size * -0.08 : size * -0.12,
            height: size * 1.1,
            width: size * 1.1,
            borderRadius: (size * 1.1) / 2,
            backgroundColor: pressed
                ? 'rgba(0, 0, 0, 0.15)'
                : focused
                ? 'rgba(0, 0, 0, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
            display: hovered || focused || pressed ? 'flex' : 'none',
        }),
        [focused, hovered, pressed, size, value],
    );

    const { containerStyle, buttonStyle, toggleStyle, toggleWheelStyle, overlayStyle, iconStyle } =
        useMemo(() => {
            const { container, button, toggle, toggleWheel, icon } = componentStyles;
            return {
                containerStyle: container,
                buttonStyle: [button, size && { borderRadius: size / 2 }],
                toggleStyle: [
                    toggle,
                    color && { backgroundColor: color },
                    {
                        height: size,
                        width: size * 2,
                        borderRadius: size / 2,
                    },
                ],
                toggleWheelStyle: [
                    toggleWheel,
                    {
                        marginLeft: moveToggle,
                        width: toggleSize,
                        height: toggleSize,
                        borderRadius: (size * 0.8) / 2,
                    },
                    thumbColor && { backgroundColor: thumbColor },
                    !value &&
                        !unCheckedIcon &&
                        !pressed && {
                            borderRadius: (size * 0.5) / 2,
                        },
                    pressed && {
                        borderRadius: (size * 0.85) / 2,
                    },
                ],
                overlayStyle: [
                    toggleWheel,
                    {
                        marginLeft: moveToggle,
                    },
                    thumbOverlay,
                ],
                iconStyle: icon,
            };
        }, [
            componentStyles,
            size,
            color,
            moveToggle,
            toggleSize,
            thumbColor,
            value,
            unCheckedIcon,
            pressed,
            thumbOverlay,
        ]);

    const handleValueChange = useCallback(() => {
        onValueChange && onValueChange(!value);
    }, [value, onValueChange]);

    const renderIcon = useCallback(
        (icon: string | undefined, condition: boolean) => {
            return icon && condition ? (
                <Icon style={iconStyle} name={icon} size={size * 0.5} />
            ) : null;
        },
        [Icon, iconStyle, size],
    );

    const onIconComponent = useMemo(
        () => renderIcon(checkedIcon, !!value),
        [renderIcon, checkedIcon, value],
    );
    const offIconComponent = useMemo(
        () => renderIcon(unCheckedIcon, !value),
        [unCheckedIcon, renderIcon, value],
    );

    return (
        <View ref={actionsRef} style={containerStyle}>
            <TouchableRipple style={buttonStyle} onPress={handleValueChange} disabled={disabled}>
                <View style={toggleStyle}>
                    <Animated.View style={overlayStyle} />
                    <Animated.View style={toggleWheelStyle}>
                        {onIconComponent}
                        {!disabled && offIconComponent}
                    </Animated.View>
                </View>
            </TouchableRipple>
        </View>
    );
};

export default memo(forwardRef(Switch));
