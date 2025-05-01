import { useCallback, ReactNode, memo, useMemo, forwardRef, PropsWithoutRef } from 'react';
import { View, type ViewStyle, type StyleProp, type TextStyle, type ViewProps } from 'react-native';
import setColor from 'color';
import { Text } from '../Text';

import { Icon, type IconType } from '../Icon';
import { Surface, type SurfaceProps } from '../Surface';
import { ButtonSize, ButtonVariant } from './types';
import { TouchableRipple } from '../TouchableRipple';
import { ActivityIndicator } from '../ActivityIndicator';
import { StateLayer } from '../StateLayer';
import { defaultStyles, sizeToIconSizeMap } from './utils';
import { MD3Elevation } from '../../types/theme';
import { resolveStateVariant } from '../../utils';
import { useActionState } from '../../hooks';
import { extractProperties } from '../Surface/utils';

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
     * Whether to show a loading indicator.
     */
    loading?: boolean;
    /**
     * Icon to display for the `Button`.
     */
    iconType?: IconType;
    iconName?: string;
    iconSize?: number;
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
    labelStyle?: TextStyle;
    /**
     * Style for the Icon
     */
    iconContainerStyle?: StyleProp<ViewStyle>;
    /*
     * Size
     * */
    size?: ButtonSize;
    /*
     * Elevation level
     * */
    elevation?: MD3Elevation;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * props for the stateLayer
     */
    stateLayerProps?: PropsWithoutRef<ViewProps>;
    textRelatedStyle?: StyleProp<TextStyle>;
};

const elevationMap: Record<string, Record<string, number>> = {
    true: {
        contained: 1,
        'contained-tonal': 1,
        elevated: 2,
    },
    false: {
        elevated: 1,
    },
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
        iconSize: _iconSizeProp,
        textRelatedStyle,
        ...rest
    }: Props,
    ref: any,
) => {
    const { hovered, actionsRef } = useActionState({ ref, actionsToListen: ['hover'] });

    const state = resolveStateVariant({
        disabled,
        hovered,
    });

    defaultStyles.useVariants({
        variant,
        state,
        size,
    });

    // const componentStyles = useComponentStyles(
    //     'Button',
    //     [styleProp, { customButtonColor, customTextColor }],
    //     {
    //         variant,
    //         state: disabled ? 'disabled' : hovered ? 'hovered' : undefined,
    //         size,
    //     },
    // );

    // console.log({ hovered, componentStyles });

    const isVariant = useCallback(
        (variantComponent: ButtonVariant) => {
            return variant === variantComponent;
        },
        [variant],
    );

    const iconSize = _iconSizeProp ?? sizeToIconSizeMap[size] ?? sizeToIconSizeMap.md;
    const elevationLevel = elevationMap[(!!hovered).toString()][variant] ?? 0;

    const {
        customLabelColor,
        customLabelSize,
        rippleColor,
        surfaceStyle,
        textStyle,
        iconStyle,
        viewStyle,
        iconContainerStyle,
        accessibilityState,
        stateLayerStyle,
    } = useMemo(() => {
        const { button, content, icon, iconTextMode, label, labelText, labelTextAddons } =
            defaultStyles;

        // for mobile
        const { borderRadius } = extractProperties(
            [defaultStyles.root, styleProp],
            ['borderRadius'],
        );

        const backgroundColor = customButtonColor && !disabled ? customButtonColor : undefined;

        const _iconStyle = [icon, isVariant('text') && iconTextMode];

        const { color: labelColor, fontSize: labelFontSize } = labelStyle ?? {};

        // TODO - remove this workaround
        let _rippleColor: string | undefined;

        try {
            _rippleColor = setColor(labelColor).alpha(0.12).rgb().string();
        } catch (e) {
            _rippleColor = undefined;
        }

        return {
            customLabelColor: labelColor,
            customLabelSize: labelFontSize,
            rippleColor: _rippleColor,
            surfaceStyle: [
                button,
                backgroundColor ? { backgroundColor } : {},
                defaultStyles.root,
                styleProp,
            ],

            iconStyle: [_iconStyle, textRelatedStyle] as unknown as ViewStyle,
            viewStyle: [
                content,
                { flexGrow: 1 },
                borderRadius ? { borderRadius } : {},
                contentStyle,
            ],
            iconContainerStyle: [iconContainerStyleProp],
            textStyle: [
                isVariant('text') ? (iconName || loading ? labelTextAddons : labelText) : label,
                textRelatedStyle,
                labelStyle,
            ],
            accessibilityState: { disabled },
            stateLayerStyle: [defaultStyles.stateLayer, stateLayerProps?.style],
        };
        // eslint-disable-next-line
    }, [
        state,
        variant,
        size,
        contentStyle,
        customButtonColor,
        disabled,
        iconContainerStyleProp,
        iconName,
        isVariant,
        labelStyle,
        loading,
        stateLayerProps?.style,
        styleProp,
    ]);

    const elevation = useMemo(
        () => (elevationProp === undefined ? elevationLevel ?? 0 : elevationProp),
        [elevationLevel, elevationProp],
    );

    return (
        <Surface
            {...rest}
            style={surfaceStyle}
            elevation={
                (disabled
                    ? 0
                    : hovered
                    ? (elevationProp || 0) + elevationLevel
                    : elevation) as MD3Elevation
            }>
            <TouchableRipple
                borderless
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
                ref={actionsRef}
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
                                        : undefined
                                }
                                style={iconStyle}
                            />
                        </View>
                    ) : null}
                    {loading ? (
                        <ActivityIndicator
                            size={customLabelSize ?? iconSize}
                            color={
                                (typeof customLabelColor === 'string'
                                    ? customLabelColor
                                    : undefined) as string
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
