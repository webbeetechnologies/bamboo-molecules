import React, { forwardRef, memo, useMemo } from 'react';
import {
    BackgroundPropType,
    StyleProp,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    ViewStyle,
    StyleSheet,
} from 'react-native';
import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import { normalizeStyles } from '../../utils';

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_VERSION_PIE = 28;

type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
    borderless?: boolean;
    background?: BackgroundPropType;
    disabled?: boolean;
    onPress?: () => void | null;
    rippleColor?: string;
    underlayColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

const TouchableRipple = (
    {
        style,
        background,
        borderless = false,
        disabled: disabledProp,
        rippleColor,
        underlayColor,
        children,
        ...rest
    }: Props,
    ref: any,
) => {
    const disabled = disabledProp || !rest.onPress;
    const { View } = useMolecules();
    const currentTheme = useCurrentTheme();
    const { rippleColor: defaultRippleColor, ...componentStyles } = useComponentStyles(
        'TouchableRipple',
        style,
    );
    const normalizedColors = normalizeStyles({ rippleColor, underlayColor }, currentTheme);
    const calculatedRippleColor = normalizedColors.rippleColor || defaultRippleColor;
    const calculatedUnderlayColor = normalizedColors.underlayColor || calculatedRippleColor;
    const memoizedStyles = useMemo(
        () => [borderless && styles.borderless, componentStyles],
        [borderless, componentStyles],
    );

    // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
    // https://github.com/facebook/react-native/issues/6480
    const useForeground =
        Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless;

    if (TouchableRipple.supported) {
        return (
            <TouchableNativeFeedback
                {...rest}
                ref={ref}
                disabled={disabled}
                useForeground={useForeground}
                background={
                    background != null
                        ? background
                        : TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless)
                }>
                <View style={memoizedStyles}>{React.Children.only(children)}</View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableHighlight
            {...rest}
            ref={ref}
            disabled={disabled}
            style={memoizedStyles}
            underlayColor={calculatedUnderlayColor}>
            {React.Children.only(children)}
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    borderless: {
        overflow: 'hidden',
    },
});

TouchableRipple.supported =
    Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

export default memo(forwardRef(TouchableRipple));
