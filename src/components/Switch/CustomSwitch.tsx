import { forwardRef, memo, useCallback, useEffect, useState, useMemo } from 'react';
import { Animated, Easing, NativeModules, Platform, StyleSheet, SwitchProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import setColor from 'color';

const version = NativeModules.PlatformConstants
    ? NativeModules.PlatformConstants.reactNativeVersion
    : undefined;

type ToggleProps = SwitchProps & {
    label?: string;
    labelStyle?: object;
    onIcon?: string;
    offIcon?: string;
};

const Switch = ({
    trackColor = { false: 'colors.onSurface', true: 'colors.primary' },
    thumbColor = 'green',
    label = '',
    onValueChange,
    disabled,
    value,
    labelStyle = {},
    onIcon,
    offIcon,
    style,
}: ToggleProps) => {
    const { Icon, TouchableRipple, View, Text } = useMolecules();
    const componentStyles = useComponentStyles(
        'NewSwitch',
        [
            style,
            {
                checkedColor: trackColor.true,
                thumbTintColor: thumbColor,
            },
        ],
        {
            states: {
                selected_disabled: !!value && !!disabled,
                active: !!value,
                disabled: !!disabled,
            },
        },
    );
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        setAnimatedValue(new Animated.Value(value ? 0 : 1));
    }, [value]);

    const moveToggle = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 20],
    });

    const color = value ? trackColor.true : trackColor.false;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [value, animatedValue]);

    const { switchStyle, props } = useMemo(() => {
        const {
            checkedColor,
            onTintColor: _onTintColor,
            thumbTintColor: _thumbTintColor,
            ...switchStyles
        } = componentStyles;

        const thumbTintColor = value && !disabled ? checkedColor : _thumbTintColor;
        const onTintColor =
            value && !disabled ? setColor(checkedColor).alpha(0.5).rgb().string() : _onTintColor;

        return {
            switchStyle: switchStyles,
            props:
                version && version.major === 0 && version.minor <= 56
                    ? {
                          onTintColor,
                          thumbTintColor,
                      }
                    : Platform.OS === 'web'
                    ? {
                          activeTrackColor: onTintColor,
                          thumbColor: thumbTintColor,
                          activeThumbColor: checkedColor,
                      }
                    : {
                          thumbColor: thumbTintColor,
                          trackColor: {
                              true: onTintColor,
                              false: onTintColor,
                          },
                      },
        };
    }, [componentStyles, disabled, value]);

    const handleValueChage = useCallback(() => {
        onValueChange && onValueChange(!value);
    }, [value, onValueChange]);

    return (
        <View style={styles.container}>
            {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableRipple
                onPress={handleValueChage}
                disabled={disabled}
                style={switchStyle}
                {...props}>
                <View
                    style={[
                        styles.toggleContainer,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                            backgroundColor: color ? color : 'colors.primary', // check/uncheck color
                            borderWidth: value ? 0 : 1,
                            borderColor: 'colors.onSurface',
                        },
                    ]}>
                    <Animated.View
                        style={[
                            styles.toggleWheelStyle,
                            // eslint-disable-next-line react-native/no-inline-styles
                            {
                                marginLeft: moveToggle,
                                backgroundColor: thumbColor, // thumbColor
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: value ? 24 : 16,
                                height: value ? 24 : 16,
                            },
                        ]}>
                        {onIcon && value && <Icon name={onIcon} size={12} color="white" />}
                        {offIcon && !value && <Icon name={offIcon} size={12} color="white" />}
                    </Animated.View>
                </View>
            </TouchableRipple>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleContainer: {
        width: 52,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
    },
    label: {
        marginRight: 2,
    },
    toggleWheelStyle: {
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 1.5,
    },
});

export default memo(forwardRef(Switch));
