import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import {
    type StyleProp,
    type GestureResponderEvent,
    type TextStyle,
    type ViewStyle,
    type ViewProps,
} from 'react-native';
import color from 'color';

import { useActionState } from '../../hooks/useActionState';
import CrossFadeIcon from '../Icon/CrossFadeIcon';
import { Icon, type IconType } from '../Icon';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { IconButtonVariant } from './types';
import { resolveStateVariant } from '../../utils';
import { Surface } from '../Surface';
import { StateLayer } from '../StateLayer';
import { defaultStyles } from './utils';

const whiteSpace = 12;

export type Props = Omit<TouchableRippleProps, 'children' | 'style'> & {
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
     * color of the icon
     */
    color?: string;
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
        color: _iconColor,
        type,
        accessibilityLabel,
        disabled = false,
        onPress,
        selected = false,
        animated = false,
        variant = 'default',
        style,
        innerContainerStyle: innerContainerStyleProp = {},
        testID,
        stateLayerProps = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const IconComponent = animated ? CrossFadeIcon : Icon;

    const { hovered, actionsRef } = useActionState();

    defaultStyles.useVariants({
        variant,
        state: resolveStateVariant({
            selectedAndDisabled: selected && disabled,
            selectedAndHovered: hovered && selected,
            disabled,
            hovered,
            selected,
        }),
        size: `${size}`,
    });

    const {
        iconColor,
        iconSize,
        rippleColor,
        containerStyle,
        accessibilityState,
        innerContainerStyle,
        // accessibilityTraits,
        stateLayerStyle,
    } = useMemo(() => {
        const iconSizeInNum = typeof size === 'number' && size ? size : undefined;

        return {
            iconColor: _iconColor,
            iconSize: iconSizeInNum,
            rippleColor: color(_iconColor).alpha(0.12).rgb().string(),
            innerContainerStyle: [defaultStyles.innerContainer, innerContainerStyleProp],
            containerStyle: [
                iconSizeInNum
                    ? {
                          width: iconSizeInNum + whiteSpace,
                          height: iconSizeInNum + whiteSpace,
                      }
                    : {},
                defaultStyles.root,
                style,
            ],
            // accessibilityTraits: disabled ? ['button', 'disabled'] : 'button',
            accessibilityState: { disabled },
            stateLayerStyle: [defaultStyles.stateLayer, stateLayerProps?.style],
        };
    }, [_iconColor, disabled, innerContainerStyleProp, size, stateLayerProps?.style, style]);

    useImperativeHandle(ref, () => actionsRef.current);

    return (
        <Surface style={containerStyle} elevation={0}>
            <TouchableRipple
                borderless
                centered
                onPress={onPress}
                rippleColor={rippleColor}
                accessibilityLabel={accessibilityLabel}
                style={innerContainerStyle}
                // accessibilityTraits={accessibilityTraits}
                // accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                disabled={disabled}
                hitSlop={
                    // @ts-ignore
                    TouchableRipple?.supported ? rippleSupportedHitSlop : rippleUnsupportedHitSlop
                }
                // @ts-ignore
                ref={actionsRef}
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

export default memo(forwardRef(IconButton));
