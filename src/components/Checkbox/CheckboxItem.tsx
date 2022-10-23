import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import Checkbox from './Checkbox';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';
import { useComponentStyles, useMolecules } from '../../hooks';
import { forwardRef, memo, useMemo } from 'react';

export type Props = {
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
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.
     */
    accessibilityLabel?: string;
    /**
     * Custom color for unchecked checkbox.
     */
    uncheckedColor?: string;
    /**
     * Custom color for checkbox.
     */
    color?: string;
    /**
     * Additional styles for container View.
     */
    style?: StyleProp<TextStyle>;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * testID to be used on tests.
     */
    testID?: string;
    /**
     * Checkbox control position.
     */
    position?: 'leading' | 'trailing';
    /**
     * Whether `<Checkbox.Android />` or `<Checkbox.IOS />` should be used.
     * Left undefined `<Checkbox />` will be used.
     */
    mode?: 'android' | 'ios';
};

/**
 * Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Checkbox.Item label="Item" status="checked" />
 *   </View>
 * );
 *
 * export default MyComponent;
 *```
 */

const CheckboxItem = (
    {
        style: styleProp,
        status,
        label,
        onPress,
        labelStyle,
        testID,
        mode,
        position = 'trailing',
        accessibilityLabel = label,
        disabled = false,
        ...props
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple } = useMolecules();
    const { labelColor, labelTypeScale, ...style } = useComponentStyles('Checkbox', styleProp, {
        states: { disabled },
    });

    const isLeading = position === 'leading';

    const checkbox = useMemo(() => {
        const checkboxProps = { ...props, status, disabled };

        if (mode === 'android') {
            return <CheckboxAndroid {...checkboxProps} />;
        } else if (mode === 'ios') {
            return <CheckboxIOS {...checkboxProps} />;
        } else {
            return <Checkbox {...checkboxProps} />;
        }
    }, [disabled, mode, props, status]);

    const { containerStyles, labelStyles } = useMemo(
        () => ({
            containerStyles: [styles.container, style],
            labelStyles: [
                styles.label,
                labelTypeScale,
                {
                    color: labelColor,
                    textAlign: isLeading ? 'right' : 'left',
                },
                labelStyle,
            ],
        }),
        [isLeading, labelColor, labelStyle, labelTypeScale, style],
    );

    return (
        <TouchableRipple
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="checkbox"
            accessibilityState={{
                checked: status === 'checked',
                disabled,
            }}
            onPress={onPress}
            testID={testID}
            disabled={disabled}
            ref={ref}>
            <View
                style={containerStyles}
                pointerEvents="none"
                importantForAccessibility="no-hide-descendants">
                {isLeading && checkbox}
                <Text style={labelStyles}>{label}</Text>
                {!isLeading && checkbox}
            </View>
        </TouchableRipple>
    );
};

CheckboxItem.displayName = 'Checkbox.Item';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    label: {
        flexShrink: 1,
        flexGrow: 1,
    },
    font: {
        fontSize: 16,
    },
});

export default memo(forwardRef(CheckboxItem));
