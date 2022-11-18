import { useEffect, useCallback, useRef, ReactNode, memo, useMemo, forwardRef } from 'react';
import { Animated, View, ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native';
import setColor from 'color';

import { withActionState, CallbackActionState } from '../../hocs';
import { useMolecules, useComponentStyles, useCurrentTheme } from '../../hooks';
import type { IconType } from '../Icon';
import type { SurfaceProps } from '../Surface';
import { styles } from './utils';
import { normalizeStyles } from '../../utils';

const initialElevation = 1;
const activeElevation = 2;

export type ButtonVariant = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export type Props = SurfaceProps &
    CallbackActionState & {
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
         *    Size
         * */
        size?: 'sm' | 'md' | 'lg';
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
const Button = (
    {
        disabled: disabledProp,
        variant = 'text',
        size = 'lg',
        loading,
        iconType,
        iconName,
        buttonColor: customButtonColor,
        textColor: customTextColor,
        children,
        accessibilityLabel,
        accessibilityHint,
        onPress,
        onPressIn,
        onPressOut,
        onLongPress,
        style: styleProp,
        uppercase = false,
        contentStyle,
        labelStyle,
        iconContainerStyle: iconContainerStyleProp,
        testID,
        accessible,
        hovered,
        ...rest
    }: Props,
    ref: any,
) => {
    const disabled = disabledProp || !onPress;
    const { ActivityIndicator, TouchableRipple, Text, Icon, Surface } = useMolecules();

    const currentTheme = useCurrentTheme();

    const normalizedStyles = normalizeStyles(styles, currentTheme);

    const componentStyles = useComponentStyles(
        'Button',
        [styleProp, { customButtonColor, customTextColor }],
        {
            variant,
            states: {
                hovered: !disabled && !!hovered,
                disabled,
            },
            size,
        },
    );

    const isVariant = useCallback(
        (variantComponent: ButtonVariant) => {
            return variant === variantComponent;
        },
        [variant],
    );

    const {
        textColor,
        animationScale,
        iconSize,
        rippleColor,
        surfaceStyle,
        touchableStyle,
        textStyle,
        iconStyle,
        viewStyle,
        iconContainerStyle,
    } = useMemo(() => {
        const {
            backgroundColor: _backgroundColor,
            color,
            typeScale,
            fontSize,
            animationScale: _animationScale,
            borderRadius,
            iconSize: _iconSize,
            customButtonColor: normalizedButtonColor,
            customTextColor: normalizedTextColor,
            ..._buttonStyles
        } = componentStyles;

        const _textColor = normalizedTextColor && !disabled ? normalizedTextColor : color;
        const backgroundColor =
            normalizedButtonColor && !disabled ? normalizedButtonColor : _backgroundColor;
        const _iconStyle = [
            normalizedStyles.icon,
            isVariant('text') && normalizedStyles.iconTextMode,
        ];

        return {
            textColor: _textColor,
            animationScale: _animationScale,
            iconSize: _iconSize,
            rippleColor: setColor(_textColor).alpha(0.12).rgb().string(),
            touchableStyle: { borderRadius, flex: 1 },
            surfaceStyle: [
                normalizedStyles.button,
                { backgroundColor, borderRadius, ..._buttonStyles },
            ],
            iconStyle: _iconStyle,
            viewStyle: [normalizedStyles.content, contentStyle],
            iconContainerStyle: [_iconStyle, iconContainerStyleProp],
            textStyle: [
                normalizedStyles.label,
                isVariant('text')
                    ? iconName || loading
                        ? normalizedStyles.labelTextAddons
                        : normalizedStyles.labelText
                    : normalizedStyles.label,
                uppercase && normalizedStyles.uppercaseLabel,
                {
                    color: _textColor,
                    ...typeScale,
                    fontSize,
                },
                labelStyle,
            ],
        };
    }, [
        componentStyles,
        contentStyle,
        disabled,
        iconContainerStyleProp,
        iconName,
        isVariant,
        labelStyle,
        loading,
        normalizedStyles,
        uppercase,
    ]);

    const isElevationEntitled = !disabled && isVariant('elevated');

    const { current: elevation } = useRef<Animated.Value>(
        new Animated.Value(isElevationEntitled ? initialElevation : 0),
    );

    useEffect(() => {
        elevation.setValue(isElevationEntitled ? initialElevation : 0);
    }, [isElevationEntitled, elevation]);

    const handlePressIn = () => {
        onPressIn?.();
        if (isVariant('elevated')) {
            Animated.timing(elevation, {
                toValue: activeElevation,
                duration: 200 * animationScale,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        onPressOut?.();
        if (isVariant('elevated')) {
            Animated.timing(elevation, {
                toValue: initialElevation,
                duration: 150 * animationScale,
                useNativeDriver: true,
            }).start();
        }
    };

    const { color: customLabelColor, fontSize: customLabelSize } =
        StyleSheet.flatten(labelStyle) || {};

    return (
        <Surface {...rest} style={surfaceStyle} {...{ elevation: elevation }}>
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
                ref={ref}
                testID={testID}>
                <View style={viewStyle}>
                    {iconName && loading !== true ? (
                        <View style={iconContainerStyle}>
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
                    <Text selectable={false} numberOfLines={1} style={textStyle}>
                        {children}
                    </Text>
                </View>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(Button)));
