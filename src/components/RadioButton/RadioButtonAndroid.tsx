import { forwardRef, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { RadioButtonContext } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import setColor from 'color';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Value of the radio button
     */
    value: string;
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Whether radio is disabled.
     */
    disabled?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: (param?: any) => void;
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
        onPress,
        value,
        status,
        testID,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        style,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple } = useMolecules();
    const { value: contextValue, onValueChange } = useContext(RadioButtonContext);

    const { current: borderAnim } = useRef<Animated.Value>(new Animated.Value(BORDER_WIDTH));

    const { current: radioAnim } = useRef<Animated.Value>(new Animated.Value(1));

    const isFirstRendering = useRef<boolean>(true);

    const checked = useMemo(
        () =>
            isChecked({
                contextValue: contextValue,
                status,
                value,
            }) === 'checked',
        [contextValue, status, value],
    );

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
        accessibilityState,
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
            accessibilityState: { disabled, checked },
        };
    }, [borderAnim, checked, colorProp, componentStyles, disabled, radioAnim, uncheckedColorProp]);

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

    const onRadioPress = useMemo(
        () =>
            disabled
                ? undefined
                : () => {
                      handlePress({
                          onPress,
                          onValueChange,
                          value,
                      });
                  },
        [disabled, onPress, onValueChange, value],
    );

    return (
        <TouchableRipple
            {...rest}
            ref={ref}
            borderless
            rippleColor={rippleColor}
            onPress={onRadioPress}
            accessibilityRole="radio"
            accessibilityState={accessibilityState}
            accessibilityLiveRegion="polite"
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
