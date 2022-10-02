import { useEffect, useCallback, useRef } from 'react';
import { Animated, View, ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native';
import color from 'color';

import { useMolecules, useCurrentTheme } from '../../hooks';
import type { IconType } from '../Icon/types';
import type { SurfaceProps } from '../Surface';
import { ButtonMode, getButtonColors } from './utils';

export type Props = SurfaceProps & {
    /**
     * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
     * - `text` - flat button without background or outline, used for the lowest priority actions, especially when presenting multiple options.
     * - `outlined` - button with an outline without background, typically used for important, but not primary action – represents medium emphasis.
     * - `contained` - button with a background color, used for important action, have the most visual impact and high emphasis.
     * - `elevated` - button with a background color and elevation, used when absolutely necessary e.g. button requires visual separation from a patterned background. @supported Available in v5.x with theme version 3
     * - `contained-tonal` - button with a secondary background color, an alternative middle ground between contained and outlined buttons. @supported Available in v5.x with theme version 3
     */
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    /**
     * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for:
     *  * `contained` mode for theme version 2
     *  * `contained`, `contained-tonal` and `elevated` modes for theme version 3.
     */
    dark?: boolean;
    /**
     * Use a compact look, useful for `text` buttons in a row.
     */
    compact?: boolean;
    /**
     * @deprecated Deprecated in v5.x - use `buttonColor` or `textColor` instead.
     * Custom text color for flat button, or background color for contained button.
     */
    color?: string;
    /**
     * @supported Available in v5.x
     * Custom button's background color.
     */
    buttonColor?: string;
    /**
     * @supported Available in v5.x
     * Custom button's text color.
     */
    textColor?: string;
    /**
     * Whether to show a loading indicator.
     */
    loading?: boolean;
    /**
     * Icon to display for the `Button`.
     */
    iconType?: IconType;
    iconName?: string;
    iconPosition?: 'left' | 'right';
    /**
     * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
     */
    disabled?: boolean;
    /**
     * Label text of the button.
     */
    children: React.ReactNode;
    /**
     * Make the label text uppercased. Note that this won't work if you pass React elements as children.
     */
    uppercase?: boolean;
    /**
     * Accessibility label for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityLabel?: string;
    /**
     * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
     */
    accessibilityHint?: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * @supported Available in v5.x
     * Function to execute as soon as the touchable element is pressed and invoked even before onPress.
     */
    onPressIn?: () => void;
    /**
     * @supported Available in v5.x
     * Function to execute as soon as the touch is released even before onPress.
     */
    onPressOut?: () => void;
    /**
     * Function to execute on long press.
     */
    onLongPress?: () => void;
    /**
     * Style of button's inner content.
     * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
     */
    contentStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    /**
     * Style for the button text.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * testID to be used on tests.
     */
    testID?: string;
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/button-1.png" />
 *     <figcaption>Text button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-2.png" />
 *     <figcaption>Outlined button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-3.png" />
 *     <figcaption>Contained button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-4.png" />
 *     <figcaption>Elevated button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-5.png" />
 *     <figcaption>Contained-tonal button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Button = ({
    disabled: disabledProp,
    compact,
    mode = 'text',
    dark,
    loading,
    iconType,
    iconName,
    iconPosition,
    buttonColor: customButtonColor,
    textColor: customTextColor,
    children,
    accessibilityLabel,
    accessibilityHint,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    style,
    uppercase = false,
    contentStyle,
    labelStyle,
    testID,
    accessible,
    ...rest
}: Props) => {
    const theme = useCurrentTheme();
    const { ActivityIndicator, TouchableRipple, Text, Icon, Surface } = useMolecules();
    const disabled = disabledProp || !onPress;

    const isMode = useCallback(
        (modeToCompare: ButtonMode) => {
            return mode === modeToCompare;
        },
        [mode],
    );
    const { roundness, animation } = theme;

    const isElevationEntitled = !disabled && isMode('elevated');
    const initialElevation = 1;
    const activeElevation = 2;

    const { current: elevation } = useRef<Animated.Value>(
        new Animated.Value(isElevationEntitled ? initialElevation : 0),
    );

    useEffect(() => {
        elevation.setValue(isElevationEntitled ? initialElevation : 0);
    }, [isElevationEntitled, elevation, initialElevation]);

    const handlePressIn = () => {
        onPressIn?.();
        if (isMode('elevated')) {
            const { scale } = animation;
            Animated.timing(elevation, {
                toValue: activeElevation,
                duration: 200 * scale,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        onPressOut?.();
        if (isMode('elevated')) {
            const { scale } = animation;
            Animated.timing(elevation, {
                toValue: initialElevation,
                duration: 150 * scale,
                useNativeDriver: true,
            }).start();
        }
    };

    const borderRadius = 5 * roundness[1];
    const iconSize = 18;

    const { backgroundColor, borderColor, textColor, borderWidth } = getButtonColors({
        customButtonColor,
        customTextColor,
        theme,
        mode,
        disabled,
        dark,
    });

    const rippleColor = color(textColor).alpha(0.12).rgb().string();

    const buttonStyle = {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
    };
    const touchableStyle = {
        borderRadius: style
            ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius || borderRadius
            : borderRadius,
    };

    const { color: customLabelColor, fontSize: customLabelSize } =
        StyleSheet.flatten(labelStyle) || {};

    const textStyle = {
        color: textColor,
        ...theme.typescale.labelLarge,
    };
    const iconStyle =
        StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse' ||
        iconPosition === 'right'
            ? [
                  styles.iconReverse,
                  styles.md3IconReverse,
                  isMode('text') && styles.md3IconReverseTextMode,
              ]
            : [styles.icon, styles.md3Icon, isMode('text') && styles.md3IconTextMode];

    return (
        <Surface
            {...rest}
            style={[styles.button, compact && styles.compact, buttonStyle, style] as ViewStyle}
            {...{ elevation: elevation }}>
            <TouchableRipple
                borderless
                delayPressIn={0}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                accessibilityLabel={accessibilityLabel}
                accessibilityHint={accessibilityHint}
                accessibilityRole="button"
                accessibilityState={{ disabled }}
                accessible={accessible}
                disabled={disabled}
                rippleColor={rippleColor}
                style={touchableStyle}
                testID={testID}>
                <View
                    style={[
                        styles.content,
                        iconPosition === 'right' ? { flexDirection: 'row-reverse' } : {},
                        contentStyle,
                    ]}>
                    {iconName && loading !== true ? (
                        <View style={iconStyle}>
                            <Icon
                                type={iconType}
                                name={iconName}
                                size={customLabelSize ?? iconSize}
                                color={
                                    typeof customLabelColor === 'string'
                                        ? customLabelColor
                                        : textColor
                                }
                            />
                        </View>
                    ) : null}
                    {loading ? (
                        <ActivityIndicator
                            size={customLabelSize ?? iconSize}
                            color={
                                typeof customLabelColor === 'string' ? customLabelColor : textColor
                            }
                            style={iconStyle}
                        />
                    ) : null}
                    <Text
                        variant="labelLarge"
                        selectable={false}
                        numberOfLines={1}
                        style={[
                            styles.label,
                            isMode('text')
                                ? iconName || loading
                                    ? styles.md3LabelTextAddons
                                    : styles.md3LabelText
                                : styles.md3Label,
                            compact && styles.compactLabel,
                            uppercase && styles.uppercaseLabel,
                            textStyle,
                            labelStyle,
                        ]}>
                        {children}
                    </Text>
                </View>
            </TouchableRipple>
        </Surface>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 64,
        borderStyle: 'solid',
    },
    compact: {
        minWidth: 'auto',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 12,
        marginRight: -4,
    },
    iconReverse: {
        marginRight: 12,
        marginLeft: -4,
    },
    md3Icon: {
        marginLeft: 16,
        marginRight: -16,
    },
    md3IconReverse: {
        marginLeft: -16,
        marginRight: 16,
    },
    md3IconTextMode: {
        marginLeft: 12,
        marginRight: -8,
    },
    md3IconReverseTextMode: {
        marginLeft: -8,
        marginRight: 12,
    },
    label: {
        textAlign: 'center',
        marginVertical: 9,
        marginHorizontal: 16,
    },
    md2Label: {
        letterSpacing: 1,
    },
    compactLabel: {
        marginHorizontal: 8,
    },
    uppercaseLabel: {
        textTransform: 'uppercase',
    },
    md3Label: {
        marginVertical: 10,
        marginHorizontal: 24,
    },
    md3LabelText: {
        marginHorizontal: 12,
    },
    md3LabelTextAddons: {
        marginHorizontal: 16,
    },
});

export default Button;
