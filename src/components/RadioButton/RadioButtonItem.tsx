import { forwardRef, memo, useCallback, useContext, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import RadioButton from './RadioButton';
import { RadioButtonContext } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';

export type Props = {
    /**
     * Value of the radio button.
     */
    value: string;
    /**
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Whether radio is disabled.
     */
    disabled?: boolean;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.
     */
    accessibilityLabel?: string;
    /**
     * Custom color for unchecked radio.
     */
    uncheckedColor?: string;
    /**
     * Custom color for radio.
     */
    color?: string;
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Additional styles for container View.
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style that is passed to Container element.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * Radio button control position.
     */
    position?: 'leading' | 'trailing';
};

/**
 * RadioButton.Item allows you to press the whole row (item) instead of only the RadioButton.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/radio-item.ios.png" />
 *     <figcaption>Pressed</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { RadioButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('first');
 *
 *   return (
 *     <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
 *       <RadioButton.Item label="First item" value="first" />
 *       <RadioButton.Item label="Second item" value="second" />
 *     </RadioButton.Group>
 *   );
 * };
 *
 * export default MyComponent;
 *```
 */
const RadioButtonItem = (
    {
        value,
        label,
        style: styleProp,
        labelStyle,
        onPress,
        disabled,
        color,
        uncheckedColor,
        status,
        accessibilityLabel = label,
        testID,
        position = 'trailing',
        containerStyle,
    }: Props,
    ref: any,
) => {
    const context = useContext(RadioButtonContext);
    const { TouchableRipple, View, Text } = useMolecules();

    const checked = useMemo(
        () =>
            isChecked({
                contextValue: context?.value,
                status,
                value,
            }) === 'checked',
        [context?.value, status, value],
    );

    const componentStyles = useComponentStyles('RadioButton_Item', styleProp, {
        states: {
            disabled: !!disabled,
            checked,
        },
    });

    const isLeading = position === 'leading';

    const { containerStyles, labelStyles, accessibilityState, radioButtonProps } = useMemo(() => {
        const {
            labelColor,
            labelTypeScale,
            paddingVertical,
            paddingHorizontal,
            fontSize,
            ..._style
        } = componentStyles;

        return {
            containerStyles: [
                styles.container,
                { paddingVertical, paddingHorizontal },
                containerStyle,
            ],
            labelStyles: [
                styles.label,
                labelTypeScale,
                {
                    color: labelColor,
                    textAlign: isLeading ? 'right' : 'left',
                },
                fontSize ? { fontSize } : {},
                labelStyle,
            ],
            accessibilityState: {
                checked,
                disabled,
            },
            radioButtonProps: {
                value,
                disabled,
                status,
                color,
                uncheckedColor,
                checked,
                style: _style,
            },
        };
    }, [
        checked,
        color,
        componentStyles,
        containerStyle,
        disabled,
        isLeading,
        labelStyle,
        status,
        uncheckedColor,
        value,
    ]);

    const onRadioPress = useCallback(
        () =>
            handlePress({
                onPress: onPress,
                onValueChange: context?.onValueChange,
                value,
            }),
        [onPress, context?.onValueChange, value],
    );

    return (
        <TouchableRipple
            ref={ref}
            onPress={onRadioPress}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="radio"
            accessibilityState={accessibilityState}
            testID={testID}
            disabled={disabled}>
            <View style={containerStyles} pointerEvents="none">
                {isLeading && <RadioButton {...radioButtonProps} />}
                <Text style={labelStyles}>{label}</Text>
                {!isLeading && <RadioButton {...radioButtonProps} />}
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        flexShrink: 1,
        flexGrow: 1,
        fontSize: 16,
    },
});

RadioButtonItem.displayName = 'RadioButton.Item';

export default memo(forwardRef(RadioButtonItem));
