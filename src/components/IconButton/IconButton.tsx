import { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import color from 'color';

import { useMolecules, useComponentStyles } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import CrossFadeIcon from '../Icon/CrossFadeIcon';
import type { IconType } from '../Icon';
import type { TouchableRippleProps } from '../TouchableRipple';

type IconButtonVariant = 'default' | 'outlined' | 'contained' | 'contained-tonal';

export type Props = Omit<TouchableRippleProps, 'children' | 'style'> &
    CallbackActionState & {
        /**
         * Icon to display.
         */
        name: string;
        /**
         * Mode of the icon button. By default there is no specified mode - only pressable icon will be rendered.
         */
        variant?: IconButtonVariant;
        /**
         * Whether icon button is selected. A selected button receives alternative combination of icon and container colors.
         */
        selected?: boolean;
        /**
         * Size of the icon.
         */
        size?: 'xs' | 'sm' | 'md' | 'lg' | number;
        /**
         * Type of the icon. Default is material
         * Should be a number or a Design Token
         */
        type?: IconType;
        /**
         * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
         */
        disabled?: boolean;
        /**
         * Whether an icon change is animated.
         */
        animated?: boolean;
        /**
         * Accessibility label for the button. This is read by the screen reader when the user taps the button.
         */
        accessibilityLabel?: string;
        /**
         * Function to execute on press.
         */
        onPress?: (e: GestureResponderEvent) => void;
        /**
         * backgroundColor and color will be extracted from here and act as buttonBackgroundColor and iconColor
         */
        style?: StyleProp<TextStyle>;
        /**
         * Style of the innerContainer
         */
        innerContainerStyle?: ViewStyle;
        /**
         * Props for the state layer
         * */
        stateLayerProps?: ViewProps;
    };

const IconButton = (
    {
        name,
        size = 24,
        type,
        accessibilityLabel,
        disabled = false,
        onPress,
        selected = false,
        animated = false,
        variant = 'default',
        style,
        hovered = false,
        innerContainerStyle: innerContainerStyleProp = {},
        testID,
        stateLayerProps = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, Surface, Icon, StateLayer } = useMolecules();
    const IconComponent = animated ? CrossFadeIcon : Icon;

    const componentStyles = useComponentStyles(
        'IconButton',
        [
            style,
            {
                innerContainer: innerContainerStyleProp,
            },
        ],
        {
            variant,
            states: {
                selectedAndDisabled: selected && disabled,
                selectedAndHovered: hovered && selected,
                disabled,
                hovered,
                selected,
            },
            size: `${size}`,
        },
    );

    const {
        iconColor,
        iconSize,
        rippleColor,
        containerStyle,
        accessibilityState,
        innerContainerStyle,
        accessibilityTraits,
        stateLayerStyle,
    } = useMemo(() => {
        const {
            color: _iconColor,
            borderColor,
            backgroundColor,
            borderWidth,
            borderRadius,
            iconSize: _iconSize = 24,
            margin,
            innerContainer,
            whiteSpace,
            width,
            height,
            stateLayer,
            ...iconButtonStyles
        } = componentStyles;

        const iconSizeInNum = typeof size === 'number' ? size : _iconSize;

        return {
            iconColor: _iconColor,
            iconSize: iconSizeInNum,
            rippleColor: color(_iconColor).alpha(0.12).rgb().string(),
            innerContainerStyle: innerContainer,
            containerStyle: [
                {
                    backgroundColor,
                },
                {
                    margin,
                    borderWidth,
                    borderColor,
                    borderRadius,
                    width: width === undefined ? iconSizeInNum + whiteSpace : width,
                    height: height === undefined ? iconSizeInNum + whiteSpace : height,
                },
                iconButtonStyles,
            ],
            accessibilityTraits: disabled ? ['button', 'disabled'] : 'button',
            accessibilityState: { disabled },
            stateLayerStyle: [stateLayer, stateLayerProps?.style],
        };
    }, [componentStyles, disabled, size, stateLayerProps?.style]);

    return (
        <Surface style={containerStyle} elevation={0}>
            <TouchableRipple
                borderless
                centered
                onPress={onPress}
                rippleColor={rippleColor}
                accessibilityLabel={accessibilityLabel}
                style={innerContainerStyle}
                // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
                accessibilityTraits={accessibilityTraits}
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                disabled={disabled}
                hitSlop={
                    // @ts-ignore
                    TouchableRipple?.supported ? rippleSupportedHitSlop : rippleUnsupportedHitSlop
                }
                ref={ref}
                testID={testID}
                {...rest}>
                <>
                    <IconComponent color={iconColor} name={name} size={iconSize} type={type} />
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

const rippleSupportedHitSlop = { top: 10, left: 10, bottom: 10, right: 10 };
const rippleUnsupportedHitSlop = { top: 6, left: 6, bottom: 6, right: 6 };

export default memo(withActionState(forwardRef(IconButton)));
