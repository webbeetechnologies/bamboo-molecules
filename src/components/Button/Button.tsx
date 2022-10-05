import { useEffect, useCallback, useRef, ReactNode, memo } from 'react';
import { Animated, View, ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native';
import color from 'color';

import { withNormalizedStyleProp, withActionState, CallbackActionState } from '../../hocs';
import { useMolecules, useCurrentTheme, useComponentTheme } from '../../hooks';
import type { ComponentStyles } from '../../types';
import type { IconType } from '../Icon/types';
import type { SurfaceProps } from '../Surface';
import { normalizeStyles } from '../../utils';

export type ButtonVariant = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export type Props = SurfaceProps & {
    /**
     * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
     * - `text` - flat button without background or outline, used for the lowest priority actions, especially when presenting multiple options.
     * - `outlined` - button with an outline without background, typically used for important, but not primary action – represents medium emphasis.
     * - `contained` - button with a background color, used for important action, have the most visual impact and high emphasis.
     * - `elevated` - button with a background color and elevation, used when absolutely necessary e.g. button requires visual separation from a patterned background. @supported Available in v5.x with theme version 3
     * - `contained-tonal` - button with a secondary background color, an alternative middle ground between contained and outlined buttons. @supported Available in v5.x with theme version 3
     */
    variant?: ButtonVariant;
    /**
     * Use a compact look, useful for `text` buttons in a row.
     */
    compact?: boolean;
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
    children: ReactNode;
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
     * Style for the Icon
     */
    iconContainerStyle?: StyleProp<ViewStyle>;
    /*
     * Comes from withActionState hoc
     * */
    actionState?: CallbackActionState;
    /*
     *  Size
     * */
    size?: 'small' | 'medium' | 'large';
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
    variant = 'text',
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
    iconContainerStyle,
    testID,
    accessible,
    actionState,
    ...rest
}: Props) => {
    const disabled = disabledProp || !onPress;
    const { ActivityIndicator, TouchableRipple, Text, Icon, Surface } = useMolecules();
    const theme = useCurrentTheme();
    const { customButtonColor: normalizedButtonColor, customTextColor: normalizedTextColor } =
        normalizeStyles({ customButtonColor, customTextColor }, theme);

    const {
        backgroundColor: _backgroundColor,
        borderColor,
        color: _textColor,
        borderWidth,
        ...buttonStyles
    } = useComponentTheme('Button', {
        variant,
        states: {
            disabled,
            hovered: !disabled && !!actionState?.hovered,
            default: !disabled && !actionState?.hovered,
        },
    });

    const textColor = normalizedTextColor && !disabled ? normalizedTextColor : _textColor;
    const backgroundColor =
        normalizedButtonColor && !disabled ? normalizedButtonColor : _backgroundColor;

    const isVariant = useCallback(
        (variantComponent: ButtonVariant) => {
            return variant === variantComponent;
        },
        [variant],
    );
    const { roundness, animation } = theme;

    const isElevationEntitled = !disabled && isVariant('elevated');
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
        if (isVariant('elevated')) {
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
        if (isVariant('elevated')) {
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

    const rippleColor = color(textColor).alpha(0.12).rgb().string();

    const buttonStyle = {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        ...buttonStyles,
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
                  isVariant('text') && styles.md3IconReverseTextMode,
              ]
            : [styles.icon, styles.md3Icon, isVariant('text') && styles.md3IconTextMode];

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
                        <View style={[iconStyle, iconContainerStyle]}>
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
                            isVariant('text')
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

export const defaultStyles: ComponentStyles<TextStyle> = {
    variants: {
        outlined: {
            backgroundColor: 'transparent',
            borderWidth: 1,

            states: {
                disabled: {
                    color: 'colors.surfaceDisabled',
                    borderColor: 'colors.surfaceDisabled',
                },
                hover: {},
                default: {
                    color: 'colors.primary',
                    borderColor: 'colors.outline',
                },
            },
        },
        text: {
            backgroundColor: 'transparent',

            states: {
                disabled: {
                    color: 'colors.surfaceDisabled',
                },
                hover: {},
                default: {
                    color: 'colors.primary',
                },
            },
        },
        contained: {
            states: {
                disabled: {
                    backgroundColor: 'transparent',
                    color: 'colors.onSurfaceDisabled',
                },
                hover: {},
                default: {
                    backgroundColor: 'colors.primary',
                    color: 'colors.onPrimary',
                },
            },
        },
        elevated: {
            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
                    color: 'colors.onSurfaceDisabled',
                },
                hover: {},
                default: {
                    backgroundColor: 'colors.elevation.level1',
                    color: 'colors.primary',
                },
            },
        },
        'contained-tonal': {
            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
                    color: 'colors.primary',
                },
                hover: {},
                default: {
                    backgroundColor: 'colors.secondaryContainer',
                    color: 'colors.onSecondaryContainer',
                },
            },
        },
    },
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

export default memo(withNormalizedStyleProp(withActionState(Button)));
