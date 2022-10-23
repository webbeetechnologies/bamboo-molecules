import { useRef, useEffect, useMemo, memo, forwardRef } from 'react';
import { Animated, StyleProp, StyleSheet, TextStyle } from 'react-native';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icon.
     * Should be a number or a Design Token
     */
    size?: number | string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;

    style?: StyleProp<TextStyle>;
};

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
        size: sizeProp,
        onPress,
        testID,
        style: styleProp,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Icon, TouchableRipple, View } = useMolecules();
    const { current: scaleAnim } = useRef<Animated.Value>(new Animated.Value(1));
    const isFirstRendering = useRef<boolean>(true);

    const style = useMemo(
        () => ({
            ...StyleSheet.flatten((styleProp || {}) as TextStyle),
            ...(colorProp ? { color: colorProp } : {}), // to avoid undefined value overriding the color from the theme provider
            ...(uncheckedColorProp ? { uncheckedColor: uncheckedColorProp } : {}),
            ...(sizeProp ? { size: sizeProp } : {}),
        }),
        [colorProp, styleProp, uncheckedColorProp, sizeProp],
    );

    const checked = status === 'checked';
    const indeterminate = status === 'indeterminate';

    const {
        color: checkedColor,
        uncheckedColor,
        animationScale: scale,
        animationDuration,
        size,
        checkboxPadding,
        ...checkboxStyles
    } = useComponentStyles('Checkbox', style, {
        states: {
            disabled,
            checked,
        },
    });

    const color = checked ? checkedColor : uncheckedColor;
    const rippleColor = setColor(color).fade(0.32).rgb().string();

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
                    borderRadius: size / 2 + checkboxPadding,
                    width: size + checkboxPadding * 2,
                    height: size + checkboxPadding * 2,
                    padding: checkboxPadding,
                },
                checkboxStyles,
            ],
            animatedContainerStyles: { transform: [{ scale: scaleAnim }] },
            filledContainerStyles: [StyleSheet.absoluteFill, styles.fillContainer],
            // for toggle animation
            animatedFillStyles: [
                { width: size / 2 + 4, height: size / 2 + 4 }, // 4 because padding - border(which is 1px each side)
                { borderColor: color },
                { borderWidth },
            ],
        }),
        [checkboxPadding, borderWidth, checkboxStyles, color, scaleAnim, size],
    );

    return (
        <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={onPress}
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
                    size={size}
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
