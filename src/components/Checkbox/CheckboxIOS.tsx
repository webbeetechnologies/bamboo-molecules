import { forwardRef, memo, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Status of checkbox.
     */
    status: 'checked' | 'unchecked' | 'indeterminate';
    /**
     * Whether checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Size of the icon.
     * Should be a number or a Design Token
     */
    size?: number | string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;

    style?: StyleProp<TextStyle>;
};

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const CheckboxIOS = (
    {
        status,
        disabled = false,
        size: sizeProp,
        onPress,
        color: colorProp,
        style: styleProp,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, Icon, View } = useMolecules();

    const checked = status === 'checked';
    const indeterminate = status === 'indeterminate';

    const style = useMemo(
        () => ({
            ...StyleSheet.flatten((styleProp || {}) as TextStyle),
            ...(colorProp ? { color: colorProp } : {}), // to avoid undefined value overriding the color from the theme provider
            ...(sizeProp ? { size: sizeProp } : {}),
        }),
        [colorProp, styleProp, sizeProp],
    );

    const { color, size, checkboxPadding, ...checkboxStyles } = useComponentStyles(
        'Checkbox',
        style,
        {
            states: {
                disabled,
                checked,
            },
        },
    );

    const rippleColor = setColor(color).fade(0.32).rgb().string();

    const icon = indeterminate ? 'minus' : 'check';

    const { rippleContainerStyles, iconContainerStyles } = useMemo(
        () => ({
            rippleContainerStyles: [
                {
                    borderRadius: size / 2 + checkboxPadding,
                    padding: checkboxPadding,
                },
                checkboxStyles,
            ],
            iconContainerStyles: { opacity: indeterminate || checked ? 1 : 0 },
        }),
        [size, checkboxPadding, checkboxStyles, indeterminate, checked],
    );

    return (
        <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="checkbox"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={rippleContainerStyles}
            testID={testID}
            ref={ref}>
            <View style={iconContainerStyles}>
                <Icon
                    allowFontScaling={false}
                    type="material-community"
                    name={icon}
                    size={size}
                    color={color}
                />
            </View>
        </TouchableRipple>
    );
};

CheckboxIOS.displayName = 'Checkbox.IOS';

export default memo(forwardRef(CheckboxIOS));
