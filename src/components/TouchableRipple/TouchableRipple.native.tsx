import React, { memo } from 'react';
import {
    BackgroundPropType,
    StyleProp,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    ViewStyle,
} from 'react-native';
import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import { withNormalizedStyleProp } from '../../hocs';
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

const TouchableRipple = ({
    style,
    background,
    borderless = false,
    disabled: disabledProp,
    rippleColor,
    underlayColor,
    children,
    ...rest
}: Props) => {
    const disabled = disabledProp || !rest.onPress;
    const { View } = useMolecules();
    const currentTheme = useCurrentTheme();
    const rippleStyles = useComponentStyles('TouchableRipple');
    const normalizedColors = normalizeStyles({ rippleColor, underlayColor }, currentTheme);
    const calculatedRippleColor = normalizedColors.rippleColor || rippleStyles.rippleColor;
    const calculatedUnderlayColor = normalizedColors.underlayColor || calculatedRippleColor;

    // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
    // https://github.com/facebook/react-native/issues/6480
    const useForeground =
        Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless;

    if (TouchableRipple.supported) {
        return (
            <TouchableNativeFeedback
                {...rest}
                disabled={disabled}
                useForeground={useForeground}
                background={
                    background != null
                        ? background
                        : TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless)
                }>
                <View style={[borderless && rippleStyles?.borderless, style]}>
                    {React.Children.only(children)}
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableHighlight
            {...rest}
            disabled={disabled}
            style={[borderless && rippleStyles?.borderless, style]}
            underlayColor={calculatedUnderlayColor}>
            {React.Children.only(children)}
        </TouchableHighlight>
    );
};

TouchableRipple.supported =
    Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

export default memo(withNormalizedStyleProp(TouchableRipple));
