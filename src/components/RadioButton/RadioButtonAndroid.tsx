import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import setColor from 'color';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Whether radio is disabled.
     */
    disabled?: boolean;
    /**
     * Custom color for unchecked radio.
     */
    uncheckedColor?: string;
    /**
     * Custom color for radio.
     */
    color?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * passed from RadioButton component
     */
    checked: boolean;
    onPress: (() => void) | undefined;
};

const BORDER_WIDTH = 2;

/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.android.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.android.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const RadioButtonAndroid = (
    {
        disabled,
        status,
        testID,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        style,
        checked,
        onPress,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, View } = useMolecules();

    const { current: borderAnim } = useRef<Animated.Value>(new Animated.Value(BORDER_WIDTH));

    const { current: radioAnim } = useRef<Animated.Value>(new Animated.Value(1));

    const isFirstRendering = useRef<boolean>(true);

    const componentStyles = useComponentStyles('RadioButton', style, {
        states: {
            disabled: !!disabled,
            checked,
        },
    });

    const {
        containerStyles,
        rippleColor,
        scale,
        animationDuration,
        radioStyles,
        dotStyles,
        dotContainerStyles,
    } = useMemo(() => {
        const {
            color: checkedColor,
            uncheckedColor,
            animationScale: _scale,
            animationDuration: _animationDuration,
            container,
            radio,
            radioContainer,
            dot,
            ...radioButtonStyles
        } = componentStyles;

        const _color = checked ? colorProp || checkedColor : uncheckedColorProp || uncheckedColor;

        return {
            containerStyles: [container, radioButtonStyles],
            color: _color,
            rippleColor: setColor(_color).fade(0.32).rgb().string(),
            scale: _scale,
            animationDuration: _animationDuration,
            radioStyles: [
                radio,
                {
                    borderColor: _color,
                    borderWidth: borderAnim,
                },
            ],
            dotContainerStyles: [StyleSheet.absoluteFill, radioContainer],
            dotStyles: [
                dot,
                {
                    backgroundColor: _color,
                    transform: [{ scale: radioAnim }],
                },
            ],
        };
    }, [borderAnim, checked, colorProp, componentStyles, radioAnim, uncheckedColorProp]);

    useEffect(() => {
        // Do not run animation on very first rendering
        if (isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        }

        if (status === 'checked') {
            radioAnim.setValue(1.2);

            Animated.timing(radioAnim, {
                toValue: 1,
                duration: animationDuration * scale,
                useNativeDriver: true,
            }).start();
        } else {
            borderAnim.setValue(10);

            Animated.timing(borderAnim, {
                toValue: BORDER_WIDTH,
                duration: animationDuration * scale,
                useNativeDriver: false,
            }).start();
        }
    }, [status, borderAnim, radioAnim, scale, animationDuration]);

    return (
        <TouchableRipple
            {...rest}
            ref={ref}
            rippleColor={rippleColor}
            onPress={onPress}
            style={containerStyles}
            testID={testID}>
            <Animated.View style={radioStyles}>
                {checked ? (
                    <View style={dotContainerStyles}>
                        <Animated.View style={dotStyles} />
                    </View>
                ) : null}
            </Animated.View>
        </TouchableRipple>
    );
};

RadioButtonAndroid.displayName = 'RadioButton.Android';

export default memo(forwardRef(RadioButtonAndroid));
