import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, StyleProp, GestureResponderEvent, TextStyle } from 'react-native';
import color from 'color';

import type { IconType } from '../Icon';
import CrossFadeIcon from '../Icon/CrossFadeIcon';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

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
     * Whether icon button is selected. A selected button receives alternative combination of icon and container colors.
     */
    selected?: boolean;
    /**
     * Size of the icon.
     * Should be a number or a Design Token
     */
    size?: number | string;
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
        size: sizeProp = 'sizes.6',
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

    const styleProp = useMemo(
        () => ({ ...StyleSheet.flatten((style || {}) as TextStyle), size: sizeProp }),
        [sizeProp, style],
    );

    const {
        color: iconColor,
        borderColor,
        backgroundColor,
        borderWidth,
        size, // normalized size
        padding,
        borderRadius,
        ...iconButtonStyles
    } = useComponentStyles('IconButton', styleProp, {
        variant,
        states: {
            disabled,
            selected,
        },
    });

    const rippleColor = color(iconColor).alpha(0.12).rgb().string();

    const buttonSize = size + 2 * padding;

    const containerStyles = useMemo(() => {
        const borderStyles = {
            borderWidth,
            borderRadius: borderRadius || buttonSize / 2, // if the default borderRadius is provided will use it, other borderRadius will be circle by default
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
            iconButtonStyles,
        ];
    }, [backgroundColor, borderColor, borderRadius, borderWidth, buttonSize, iconButtonStyles]);

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
});

export default memo(forwardRef(IconButton));
