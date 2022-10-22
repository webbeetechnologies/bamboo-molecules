import { forwardRef, memo, useMemo } from 'react';
import { ViewStyle, StyleSheet, StyleProp, GestureResponderEvent } from 'react-native';
import color from 'color';

import type { IconType } from '../Icon';
import CrossFadeIcon from '../Icon/CrossFadeIcon';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

const PADDING = 8;

type IconButtonVariant = 'outlined' | 'contained' | 'contained-tonal';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Icon to display.
     */
    name: IconType;
    /**
     * Mode of the icon button. By default there is no specified mode - only pressable icon will be rendered.
     */
    variant?: IconButtonVariant;
    /**
     * Color of the icon.
     */
    color?: string;
    /**
     * Background color of the icon container.
     */
    containerColor?: string;
    /**
     * Whether icon button is selected. A selected button receives alternative combination of icon and container colors.
     */
    selected?: boolean;
    /**
     * Size of the icon.
     */
    size?: number;
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
    style?: StyleProp<ViewStyle>;
};

/**
 * An icon button is a button which displays only an icon without a label.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-1.png" />
 *     <figcaption>Default icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-2.png" />
 *     <figcaption>Contained icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-3.png" />
 *     <figcaption>Contained-tonal icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="small" src="screenshots/icon-button-4.png" />
 *     <figcaption>Outlined icon button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <IconButton
 *     icon="camera"
 *     iconColor={MD3Colors.error50}
 *     size={20}
 *     onPress={() => console.log('Pressed')}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html
 */
const IconButton = (
    {
        name,
        color: customIconColor,
        containerColor: customContainerColor,
        size = 24,
        accessibilityLabel,
        disabled = false,
        onPress,
        selected = false,
        animated = false,
        variant,
        style,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, Surface, Icon } = useMolecules();
    const IconComponent = animated ? CrossFadeIcon : Icon;

    const {
        color: _iconColor,
        borderColor,
        backgroundColor: _backgroundColor,
        borderWidth,
        ...iconButtonStyles
    } = useComponentStyles('IconButton', style, {
        variant,
        states: {
            disabled,
            selected,
        },
    });

    const backgroundColor = customContainerColor || _backgroundColor;
    const iconColor = customIconColor || _iconColor;
    const rippleColor = color(iconColor).alpha(0.12).rgb().string();

    const buttonSize = size + 2 * PADDING;

    const containerStyles = useMemo(() => {
        const borderStyles = {
            borderWidth,
            borderRadius: buttonSize / 2,
            borderColor,
        };
        return [
            {
                backgroundColor,
                width: buttonSize,
                height: buttonSize,
            },
            styles.container,
            borderStyles,
            disabled && styles.disabled,
            iconButtonStyles,
        ];
    }, [backgroundColor, borderColor, borderWidth, buttonSize, disabled, iconButtonStyles]);

    return (
        <Surface style={containerStyles} {...{ elevation: 0 }}>
            <TouchableRipple
                borderless
                centered
                onPress={onPress}
                rippleColor={rippleColor}
                accessibilityLabel={accessibilityLabel}
                style={styles.touchable}
                // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
                accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
                accessibilityComponentType="button"
                accessibilityRole="button"
                accessibilityState={{ disabled }}
                disabled={disabled}
                hitSlop={
                    // @ts-ignore
                    TouchableRipple?.supported
                        ? { top: 10, left: 10, bottom: 10, right: 10 }
                        : { top: 6, left: 6, bottom: 6, right: 6 }
                }
                ref={ref}
                {...rest}>
                <IconComponent color={iconColor} name={name} size={size} />
            </TouchableRipple>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        margin: 6,
        elevation: 0,
    },
    touchable: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.32,
    },
});

export default memo(forwardRef(IconButton));
