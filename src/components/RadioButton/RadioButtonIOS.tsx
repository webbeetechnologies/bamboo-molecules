import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Whether radio is disabled.
     */
    disabled?: boolean;
    /**
     * Custom color for radio.
     */
    color?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * passed from RadioButton component
     */
    checked: boolean;
    onPress: (() => void) | undefined;
};

/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const RadioButtonIOS = (
    { disabled, style, color: colorProp, checked, onPress, ...rest }: Props,
    ref: any,
) => {
    const { TouchableRipple, View, Icon } = useMolecules();

    const componentStyles = useComponentStyles(
        'RadioButton',
        [style, colorProp ? { color: colorProp } : {}],
        {
            states: {
                disabled: !!disabled,
                checked,
            },
        },
    );

    const { containerStyle, iconContainerStyle, checkedColor, iconSize, rippleColor } =
        useMemo(() => {
            const { color, iconSize: _iconSize, ...checkboxStyles } = componentStyles;

            return {
                containerStyle: [styles.container, checkboxStyles],
                iconContainerStyle: { opacity: checked ? 1 : 0 },
                checkedColor: color,
                iconSize: _iconSize,
                rippleColor: setColor(color).fade(0.32).rgb().string(),
            };
        }, [checked, componentStyles]);

    return (
        <TouchableRipple
            {...rest}
            ref={ref}
            rippleColor={rippleColor}
            onPress={onPress}
            style={containerStyle}>
            <View style={iconContainerStyle}>
                <Icon allowFontScaling={false} name="check" size={iconSize} color={checkedColor} />
            </View>
        </TouchableRipple>
    );
};

RadioButtonIOS.displayName = 'RadioButton.IOS';

const styles = StyleSheet.create({
    container: {
        borderRadius: 18,
        padding: 6,
    },
});

export default memo(forwardRef(RadioButtonIOS));
