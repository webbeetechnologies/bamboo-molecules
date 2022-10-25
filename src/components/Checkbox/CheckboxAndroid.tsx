import { useRef, useEffect, useMemo, memo, forwardRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { CheckBoxBaseProps } from './types';

export type Props = CheckBoxBaseProps & {};

// From https://material.io/design/motion/speed.html#duration
// const ANIMATION_DURATION = 100;

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.android.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.android.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const CheckboxAndroid = (
    {
        status,
        disabled = false,
        size = 'md',
        onChange,
        testID,
        style,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Icon, TouchableRipple, View } = useMolecules();
    const { current: scaleAnim } = useRef<Animated.Value>(new Animated.Value(1));
    const isFirstRendering = useRef<boolean>(true);

    const checked = status === 'checked';
    const indeterminate = status === 'indeterminate';

    const {
        color: checkedColor,
        uncheckedColor,
        animationScale: scale,
        animationDuration,
        iconSize,
        padding,
        width,
        height,
        borderRadius,
        ...checkboxStyles
    } = useComponentStyles('Checkbox', style, {
        variant: 'android',
        states: {
            disabled,
            checked,
        },
        size,
    });

    const color = checked ? colorProp || checkedColor : uncheckedColorProp || uncheckedColor;
    const rippleColor = useMemo(() => setColor(color).fade(0.32).rgb().string(), [color]);

    useEffect(() => {
        // Do not run animation on very first rendering
        if (isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        }

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.85,
                duration: checked ? animationDuration * scale : 0,
                useNativeDriver: false,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: checked ? animationDuration * scale : animationDuration * scale * 1.75,
                useNativeDriver: false,
            }),
        ]).start();
    }, [status, checked, scaleAnim, scale, animationDuration]);

    const borderWidth = scaleAnim.interpolate({
        inputRange: [0.8, 1],
        outputRange: [7, 0],
    });

    const icon = indeterminate
        ? 'minus-box'
        : checked
        ? 'checkbox-marked'
        : 'checkbox-blank-outline';

    const {
        rippleContainerStyles,
        animatedContainerStyles,
        filledContainerStyles,
        animatedFillStyles,
    } = useMemo(
        () => ({
            rippleContainerStyles: [
                {
                    borderRadius,
                    width,
                    height,
                    padding,
                },
                checkboxStyles,
            ],
            animatedContainerStyles: { transform: [{ scale: scaleAnim }] },
            filledContainerStyles: [StyleSheet.absoluteFill, styles.fillContainer],
            // for toggle animation // This needs to be computed because it's opinionated animation
            animatedFillStyles: [
                { width: iconSize / 2 + (padding - 2), height: iconSize / 2 + (padding - 2) }, // 4 because padding - border(which is 1px each side)
                { borderColor: color },
                { borderWidth },
            ],
        }),
        [
            borderRadius,
            width,
            height,
            padding,
            checkboxStyles,
            scaleAnim,
            iconSize,
            color,
            borderWidth,
        ],
    );

    return (
        <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={onChange}
            disabled={disabled}
            accessibilityRole="checkbox"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={rippleContainerStyles}
            testID={testID}
            ref={ref}>
            <Animated.View style={animatedContainerStyles}>
                <Icon
                    allowFontScaling={false}
                    type="material-community"
                    name={icon}
                    size={iconSize}
                    color={color}
                />
                <View style={filledContainerStyles}>
                    <Animated.View style={animatedFillStyles} />
                </View>
            </Animated.View>
        </TouchableRipple>
    );
};

CheckboxAndroid.displayName = 'Checkbox.Android';

const styles = StyleSheet.create({
    fillContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(forwardRef(CheckboxAndroid));
