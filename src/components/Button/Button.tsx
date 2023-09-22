import {
    useEffect,
    useCallback,
    useRef,
    ReactNode,
    memo,
    useMemo,
    forwardRef,
    PropsWithoutRef,
    useImperativeHandle,
} from 'react';
import { Animated, View, ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import setColor from 'color';

import { useMolecules, useComponentStyles, useActionState } from '../../hooks';
import type { IconType } from '../Icon';
import type { SurfaceProps } from '../Surface';

export type ButtonVariant = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export type Props = Omit<SurfaceProps, 'style'> & {
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
    style?: StyleProp<TextStyle>;
    /**
     * Style for the button text.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style for the Icon
     */
    iconContainerStyle?: StyleProp<ViewStyle>;
    /*
     * Size
     * */
    size?: 'sm' | 'md' | 'lg';
    /*
     * Elevation level
     * */
    elevation?: number;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * props for the stateLayer
     */
    stateLayerProps?: PropsWithoutRef<ViewProps>;
};

const Button = (
    {
        disabled = false,
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
        contentStyle,
        labelStyle,
        iconContainerStyle: iconContainerStyleProp,
        testID,
        accessible,
        stateLayerProps = {},
        elevation: elevationProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { ActivityIndicator, TouchableRipple, Text, Icon, Surface, StateLayer } = useMolecules();

    const triggerRef = useRef(null);
    const { hovered } = useActionState({ ref: triggerRef });

    const componentStyles = useComponentStyles(
        'Button',
        [styleProp, { customButtonColor, customTextColor }],
        {
            variant,
            states: {
                disabled,
                hovered,
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
        customLabelColor,
        customLabelSize,
        textColor,
        animationScale,
        iconSize,
        rippleColor,
        surfaceStyle,
        textStyle,
        iconStyle,
        viewStyle,
        iconContainerStyle,
        accessibilityState,
        stateLayerStyle,
        elevationLevel,
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
            button,
            content,
            icon,
            iconTextMode,
            label,
            labelText,
            labelTextAddons,
            stateLayer,
            elevationLevel: _elevationLevel,
            ..._buttonStyles
        } = componentStyles;

        const _textColor = normalizedTextColor && !disabled ? normalizedTextColor : color;
        const backgroundColor =
            normalizedButtonColor && !disabled ? normalizedButtonColor : _backgroundColor;
        const _iconStyle = [icon, isVariant('text') && iconTextMode];

        const { color: labelColor, fontSize: labelFontSize } = StyleSheet.flatten(labelStyle) || {};

        return {
            customLabelColor: labelColor,
            customLabelSize: labelFontSize,
            textColor: _textColor,
            animationScale: _animationScale,
            iconSize: _iconSize,
            rippleColor: setColor(_textColor).alpha(0.12).rgb().string(),
            surfaceStyle: [button, { backgroundColor, borderRadius, ..._buttonStyles }],

            iconStyle: _iconStyle,
            viewStyle: [content, { borderRadius, flexGrow: 1 }, contentStyle],
            iconContainerStyle: [_iconStyle, iconContainerStyleProp],
            textStyle: [
                label,
                isVariant('text') ? (iconName || loading ? labelTextAddons : labelText) : label,
                {
                    color: _textColor,
                    ...typeScale,
                    fontSize,
                },
                labelStyle,
            ],
            accessibilityState: { disabled },
            stateLayerStyle: [stateLayer, stateLayerProps?.style],
            elevationLevel: _elevationLevel,
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
        stateLayerProps?.style,
    ]);

    const initialElevation = useMemo(
        () => (elevationProp === undefined ? elevationLevel : elevationProp),
        [elevationLevel, elevationProp],
    );

    const { current: elevation } = useRef<Animated.Value>(new Animated.Value(initialElevation));

    useEffect(() => {
        if (disabled || !onPress) return;

        Animated.timing(elevation, {
            toValue: hovered ? (elevationProp || 0) + elevationLevel : initialElevation,
            duration: 200 * animationScale,
            useNativeDriver: false,
        }).start();
    }, [
        elevation,
        hovered,
        initialElevation,
        disabled,
        onPress,
        animationScale,
        isVariant,
        elevationLevel,
        elevationProp,
    ]);

    useImperativeHandle(ref, () => triggerRef.current);

    return (
        <Surface {...rest} style={surfaceStyle} elevation={disabled ? 0 : elevation}>
            <TouchableRipple
                borderless
                delayPressIn={0}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                accessibilityLabel={accessibilityLabel}
                accessibilityHint={accessibilityHint}
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                accessible={accessible}
                disabled={disabled}
                rippleColor={rippleColor}
                style={viewStyle}
                ref={triggerRef}
                testID={testID}>
                <>
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

                    <StateLayer
                        testID={testID ? `${testID}-stateLayer` : ''}
                        {...stateLayerProps}
                        style={stateLayerStyle}
                    />
                </>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(forwardRef(Button));
