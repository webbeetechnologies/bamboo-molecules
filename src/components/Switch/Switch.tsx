import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Pressable, SwitchProps, ViewStyle } from 'react-native';
import { useActionState, useComponentStyles, useMolecules } from '../../hooks';

export type ToggleProps = SwitchProps & {
    checkedIcon?: string;
    unCheckedIcon?: string;
    size?: number;
    checkedIconType?: IconType;
    uncheckedIconType?: IconType;
};

type IconType =
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'feather'
    | 'fontisto'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'antdesign'
    | 'font-awesome-5'
    | undefined;

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
    checkedIconType,
    uncheckedIconType,
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
        outputRange: [
            !value && pressed && !unCheckedIcon
                ? 0
                : !value && unCheckedIcon
                ? size * 0.04
                : size * 0.2,
            pressed ? size * 0.74 : size * 0.81,
        ],
    });

    const toggleSize = toggleSizeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [
            !value && !pressed && !unCheckedIcon
                ? size * 0.5
                : value || unCheckedIcon
                ? size * 0.74
                : size * 0.84,
            pressed && !value ? size : pressed && value ? size * 0.81 : size * 0.64,
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
            left:
                value && pressed
                    ? size * -0.21
                    : value || unCheckedIcon
                    ? size * -0.28
                    : !unCheckedIcon && !pressed
                    ? size * -0.36
                    : size * -0.16,
            right: 0,
            height: size * 1.2,
            width: size * 1.2,
            borderRadius: (size * 1.2) / 2,
            backgroundColor: pressed
                ? 'rgba(0, 0, 0, 0.15)'
                : focused
                ? 'rgba(0, 0, 0, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
            display: hovered || focused || pressed ? 'flex' : 'none',
        }),
        [focused, hovered, pressed, size, unCheckedIcon, value],
    );

    const { parentViewStyle, buttonStyle, toggleStyle, toggleWheelStyle, overlayStyle, iconStyle } =
        useMemo(() => {
            const { button, toggle, toggleWheel, icon } = componentStyles;
            return {
                buttonStyle: [button, size && { borderRadius: size / 2 }],
                parentViewStyle: {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                toggleStyle: [
                    toggle,
                    color && { backgroundColor: color },
                    {
                        height: size,
                        width: size * 1.62,
                        borderRadius: size / 1.62,
                        borderWidth: Math.floor(size * 0.095),
                    },
                    value && { borderWidth: 0 },
                ],
                toggleWheelStyle: [
                    toggleWheel,
                    {
                        marginLeft: moveToggle,
                        width: toggleSize,
                        height: toggleSize,
                        borderRadius: (size * 0.84) / 2,
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
        (icon: string | undefined, condition: boolean, type?: IconType) => {
            return icon && condition ? (
                <Icon style={iconStyle} name={icon} size={size * 0.5} type={type} />
            ) : null;
        },
        [Icon, iconStyle, size],
    );

    const onIconComponent = useMemo(
        () => renderIcon(checkedIcon, !!value, checkedIconType),
        [renderIcon, checkedIcon, value, checkedIconType],
    );
    const offIconComponent = useMemo(
        () => renderIcon(unCheckedIcon, !value, uncheckedIconType),
        [renderIcon, unCheckedIcon, value, uncheckedIconType],
    );

    return (
        <Pressable ref={actionsRef} style={buttonStyle} onPress={handleValueChange}>
            <View style={toggleStyle}>
                <Animated.View style={parentViewStyle as ViewStyle}>
                    <Animated.View style={toggleWheelStyle}>
                        {onIconComponent}
                        {!disabled && offIconComponent}
                    </Animated.View>
                </Animated.View>
                <Animated.View style={overlayStyle} />
            </View>
        </Pressable>
    );
};

export default memo(forwardRef(Switch));
