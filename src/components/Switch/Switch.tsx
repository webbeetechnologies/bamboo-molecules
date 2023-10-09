import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, SwitchProps } from 'react-native';
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
    const { Icon, View } = useMolecules();
    const { actionsRef, focused, hovered, pressed } = useActionState();

    const componentStyles = useComponentStyles('Switch', style, {
        states: {
            selected_hovered: !!value && !!hovered,
            selected_disabled: !!value && !!disabled,
            selected_pressed: !!value && !!pressed,
            selected_focused: !!value && !!focused,
            selected: !!value,
            disabled: !!disabled,
            hovered: !!hovered,
            focused: !!focused,
            pressed: !!pressed,
        },
    });
    const toggleMarginAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;
    const toggleSizeAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;

    const moveToggle = toggleMarginAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [!value && pressed ? 0 : size * 0.05, size * 1.08],
    });

    const toggleSize = toggleSizeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && !pressed && !unCheckedIcon ? size * 0.5 : value ? size * 0.8 : size,
            pressed && !value ? size * 1 : pressed && value ? size * 0.85 : size * 0.8,
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
            left: value ? size * -0.18 : !value && pressed ? size * -0.1 : size * -0.15,
            height: size * 1.2,
            width: size * 1.2,
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

    const { buttonStyle, toggleStyle, toggleWheelStyle, overlayStyle, iconStyle } = useMemo(() => {
        const { button, toggle, toggleWheel, icon } = componentStyles;
        return {
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
                    borderRadius: (size * (!value ? 1 : 0.85)) / 2,
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
        <Pressable ref={actionsRef} style={buttonStyle} onPress={handleValueChange}>
            <View style={toggleStyle}>
                <Animated.View style={overlayStyle} />
                <Animated.View style={toggleWheelStyle}>
                    {onIconComponent}
                    {!disabled && offIconComponent}
                </Animated.View>
            </View>
        </Pressable>
    );
};

export default memo(forwardRef(Switch));
