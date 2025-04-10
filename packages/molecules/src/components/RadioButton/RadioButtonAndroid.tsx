import { forwardRef, memo, PropsWithoutRef, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import setColor from 'color';

import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { CallbackActionState, withActionState } from '../../hocs';
import { resolveStateVariant } from '../../utils';
import { StateLayer } from '../StateLayer';
import { ANIMATION_DURATION, radioButtonStyles } from './utils';

export type Props = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState & {
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
        /**
         * props for the stateLayer
         */
        stateLayerProps?: PropsWithoutRef<ViewProps>;
    };

const BORDER_WIDTH = 2;

const RadioButtonAndroid = (
    {
        disabled = false,
        status,
        testID,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        style,
        checked,
        onPress,
        stateLayerProps = {},
        hovered = false,
        ...rest
    }: Props,
    ref: any,
) => {
    const { current: borderAnim } = useRef<Animated.Value>(new Animated.Value(BORDER_WIDTH));

    const { current: radioAnim } = useRef<Animated.Value>(new Animated.Value(1));

    const isFirstRendering = useRef<boolean>(true);

    radioButtonStyles.useVariants({
        state: resolveStateVariant({
            disabled,
            checkedAndHovered: checked && hovered,
            checked,
            hovered,
        }) as any,
    });

    const {
        containerStyles,
        rippleColor,
        radioStyles,
        dotStyles,
        dotContainerStyles,
        stateLayerStyle,
    } = useMemo(() => {
        const {
            color: checkedColor,
            uncheckedColor,
            ..._radioButtonStyles
        } = StyleSheet.flatten([radioButtonStyles.root, style]) as any;

        const _color = checked ? colorProp || checkedColor : uncheckedColorProp || uncheckedColor;

        return {
            containerStyles: [radioButtonStyles.container, _radioButtonStyles],
            color: _color,
            rippleColor: setColor(_color).fade(0.32).rgb().string(),
            radioStyles: [
                radioButtonStyles.radio,
                {
                    borderColor: _color,
                    borderWidth: borderAnim,
                },
            ],
            dotContainerStyles: [StyleSheet.absoluteFill, radioButtonStyles.radioContainer],
            dotStyles: [
                radioButtonStyles.dot,
                {
                    backgroundColor: _color,
                    transform: [{ scale: radioAnim }],
                },
            ],
            stateLayerStyle: [radioButtonStyles.stateLayer, stateLayerProps?.style],
        };
    }, [
        borderAnim,
        checked,
        colorProp,
        radioAnim,
        stateLayerProps?.style,
        uncheckedColorProp,
        style,
    ]);

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
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }).start();
        } else {
            borderAnim.setValue(10);

            Animated.timing(borderAnim, {
                toValue: BORDER_WIDTH,
                duration: ANIMATION_DURATION,
                useNativeDriver: false,
            }).start();
        }
    }, [status, borderAnim, radioAnim]);

    return (
        <TouchableRipple
            {...rest}
            ref={ref}
            rippleColor={rippleColor}
            onPress={onPress}
            style={containerStyles}
            testID={testID}>
            <>
                <Animated.View style={radioStyles}>
                    {checked ? (
                        <View style={dotContainerStyles}>
                            <Animated.View style={dotStyles} />
                        </View>
                    ) : null}
                </Animated.View>

                <StateLayer
                    testID={testID ? `${testID}-stateLayer` : ''}
                    {...stateLayerProps}
                    style={stateLayerStyle}
                />
            </>
        </TouchableRipple>
    );
};

RadioButtonAndroid.displayName = 'RadioButton_Android';

export default memo(withActionState(forwardRef(RadioButtonAndroid)));
