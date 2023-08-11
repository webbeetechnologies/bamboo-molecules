import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, SwitchProps } from 'react-native';
import { useActionState, useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';

type ToggleProps = SwitchProps & {
    onIcon?: string;
    offIcon?: string;
    size?: number;
};

const Switch = ({
    trackColor,
    size,
    thumbColor,
    onValueChange,
    disabled,
    value,
    onIcon,
    offIcon,
    style,
}: ToggleProps) => {
    const { Icon, TouchableRipple, View } = useMolecules();
    const { actionsRef, focused, hovered, pressed } = useActionState();

    const theme = useCurrentTheme();
    const componentStyles = useComponentStyles('NewSwitch', style, {
        states: {
            selected_disabled: !!value && !!disabled,
            active: !!value,
            offIcon: !!offIcon,
            disabled: !!disabled,
            hovered: !!hovered,
            selected_hovered: !!value && !!hovered,
            focused: !!focused,
            selected_focused: !!value && !!focused,
            pressed: !!hovered && !!pressed,
            selected_pressed: !!value && !!pressed,
        },
    });
    const switchAnimation = useRef(new Animated.Value(value ? 0 : 1)).current;

    const moveToggle = switchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [pressed ? 0 : 5, size ? (size - 15) * 2 : pressed ? 22 : 24],
    });

    const color = useMemo(
        () => (value ? trackColor?.true : trackColor?.false),
        [trackColor?.false, trackColor?.true, value],
    );

    useEffect(() => {
        Animated.timing(switchAnimation, {
            toValue: value ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [value, switchAnimation]);

    const getToggleWheelColor = useCallback(() => {
        if (thumbColor) return thumbColor;
        if (!!value && !!disabled) return theme.colors.surface;
        if (disabled) return theme.colors.onSurface;
        if (value) return theme.colors.onPrimary;
        return theme.colors.outline;
    }, [
        disabled,
        theme.colors.onPrimary,
        theme.colors.onSurface,
        theme.colors.outline,
        theme.colors.surface,
        thumbColor,
        value,
    ]);

    const thumbOverlay = useMemo(
        () => ({
            position: 'absolute',
            top: value ? -3 : -4.5,
            left: value ? -7 : -10,
            height: size ? size + 10 : 38,
            width: size ? size / 2 : 38,
            borderRadius: size ? size / 2 : 19,
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
                    size && { height: size, width: size * 2, borderRadius: size / 2 },
                ],
                toggleWheelStyle: [
                    toggleWheel,
                    {
                        marginLeft: moveToggle,
                        backgroundColor: getToggleWheelColor(),
                    },
                    pressed && {
                        height: size ? size / 2 : 28,
                        width: size ? size / 2 : 28,
                        borderRadius: size ? size / 2 / 2 : 14,
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
        }, [color, componentStyles, getToggleWheelColor, moveToggle, pressed, size, thumbOverlay]);

    const handleValueChage = useCallback(() => {
        onValueChange && onValueChange(!value);
    }, [value, onValueChange]);

    const renderIcon = useCallback(
        (icon: string | undefined, condition: boolean) => {
            return icon && condition ? <Icon style={iconStyle} name={icon} size={12} /> : null;
        },
        [Icon, iconStyle],
    );

    const onIconComponent = useMemo(() => renderIcon(onIcon, !!value), [onIcon, renderIcon, value]);
    const offIconComponent = useMemo(
        () => renderIcon(offIcon, !value),
        [offIcon, renderIcon, value],
    );

    return (
        <View ref={actionsRef} style={containerStyle}>
            <TouchableRipple style={buttonStyle} onPress={handleValueChage} disabled={disabled}>
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
