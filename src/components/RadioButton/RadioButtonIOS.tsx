import { forwardRef, memo, useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import { RadioButtonContext } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';

export type Props = Omit<TouchableRippleProps, 'children'> & {
    /**
     * Value of the radio button
     */
    value: string;
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Whether radio is disabled.
     */
    disabled?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for radio.
     */
    color?: string;
    /**
     * testID to be used on tests.
     */
    testID?: string;
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
    { disabled, onPress, status, value, testID, style, color: colorProp, ...rest }: Props,
    ref: any,
) => {
    const { TouchableRipple, Icon } = useMolecules();
    const context = useContext(RadioButtonContext);

    const checked = useMemo(
        () =>
            isChecked({
                contextValue: context?.value,
                status,
                value,
            }) === 'checked',
        [context?.value, status, value],
    );

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

    const onRadioPress = useMemo(() => {
        return disabled
            ? undefined
            : () => {
                  handlePress({
                      onPress,
                      value,
                      onValueChange: context?.onValueChange,
                  });
              };
    }, [disabled, onPress, context?.onValueChange, value]);

    return (
        <TouchableRipple
            {...rest}
            ref={ref}
            borderless
            rippleColor={rippleColor}
            onPress={onRadioPress}
            accessibilityRole="radio"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={containerStyle}
            testID={testID}>
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
