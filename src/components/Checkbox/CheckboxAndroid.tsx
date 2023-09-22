import {
    useRef,
    useEffect,
    useMemo,
    memo,
    forwardRef,
    useCallback,
    PropsWithoutRef,
    useImperativeHandle,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import setColor from 'color';

import { useActionState, useComponentStyles, useMolecules } from '../../hooks';
import type { CheckBoxBaseProps } from './types';

export type Props = Omit<CheckBoxBaseProps, 'value' | 'defaultValue'> & {
    value: boolean;
    /**
     * props for the stateLayer
     */
    stateLayerProps?: PropsWithoutRef<ViewProps>;
};

const CheckboxAndroid = (
    {
        value: checked,
        indeterminate,
        disabled = false,
        size = 'md',
        onChange: onChangeProp,
        testID,
        style,
        color: colorProp,
        uncheckedColor: uncheckedColorProp,
        stateLayerProps = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { Icon, TouchableRipple, View, StateLayer } = useMolecules();
    const { current: scaleAnim } = useRef<Animated.Value>(new Animated.Value(1));
    const isFirstRendering = useRef<boolean>(true);

    const { hovered, actionsRef } = useActionState();

    const componentStyles = useComponentStyles('Checkbox', style, {
        variant: 'android',
        states: {
            disabled,
            checkedAndHovered: checked && !indeterminate && hovered,
            checked: checked && !indeterminate,
            hovered,
        },
        size,
    });

    const borderWidth = scaleAnim.interpolate({
        inputRange: [0.8, 1],
        outputRange: [7, 0],
    });

    const {
        iconSize,
        color,
        rippleColor,
        scale,
        animationDuration,
        rippleContainerStyles,
        filledContainerStyles,
        animatedContainerStyles,
        animatedFillStyles,
        stateLayerStyle,
    } = useMemo(() => {
        const {
            color: checkedColor,
            uncheckedColor,
            animationScale: _scale,
            animationDuration: _animationDuration,
            iconSize: _iconSize,
            padding,
            width,
            height,
            borderRadius,
            stateLayer,
            ...checkboxStyles
        } = componentStyles;

        const _color = checked ? colorProp || checkedColor : uncheckedColorProp || uncheckedColor;

        return {
            color: _color,
            iconSize: _iconSize,
            rippleColor: setColor(_color).fade(0.32).rgb().string(),
            checkboxStyle: checkboxStyles,
            scale: _scale,
            animationDuration: _animationDuration,
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
                { width: _iconSize / 2 + (padding - 2), height: _iconSize / 2 + (padding - 2) }, // 4 because padding - border(which is 1px each side)
                { borderColor: _color },
                { borderWidth },
            ],
            stateLayerStyle: [stateLayer, stateLayerProps?.style],
        };
    }, [
        borderWidth,
        checked,
        colorProp,
        componentStyles,
        scaleAnim,
        stateLayerProps?.style,
        uncheckedColorProp,
    ]);

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
    }, [checked, scaleAnim, scale, animationDuration]);

    const onChange = useCallback(() => {
        onChangeProp?.(!checked);
    }, [checked, onChangeProp]);

    const icon = indeterminate
        ? 'minus-box'
        : checked
        ? 'checkbox-marked'
        : 'checkbox-blank-outline';

    const accessibilityState = useMemo(() => ({ disabled, checked }), [checked, disabled]);

    useImperativeHandle(ref, () => actionsRef.current);

    return (
        <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={onChange}
            disabled={disabled}
            accessibilityRole="checkbox"
            accessibilityState={accessibilityState}
            accessibilityLiveRegion="polite"
            style={rippleContainerStyles}
            testID={testID}
            ref={actionsRef}>
            <>
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
                <StateLayer
                    testID={testID ? `${testID}-stateLayer` : ''}
                    {...stateLayerProps}
                    style={stateLayerStyle}
                />
            </>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    fillContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(forwardRef(CheckboxAndroid));
