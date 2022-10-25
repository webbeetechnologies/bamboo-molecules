import { forwardRef, memo, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { CheckBoxBaseProps } from './types';
import Checkbox from './Checkbox';

export type Props = CheckBoxBaseProps & {
    /**
     * Label to be displayed on the item.
     */
    label: string;
    /**
     * Style that is passed to Label element.
     */
    labelStyle?: StyleProp<TextStyle>;
    /**
     * Style that is passed to Container element.
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * Checkbox control position.
     */
    position?: 'leading' | 'trailing';
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
        containerStyle,
        status,
        label,
        onPress,
        labelStyle,
        testID,
        position = 'trailing',
        accessibilityLabel = label,
        disabled = false,
        size,
        ...props
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple } = useMolecules();
    const { labelColor, labelTypeScale, paddingVertical, paddingHorizontal, fontSize, ...style } =
        useComponentStyles('Checkbox', styleProp, {
            variant: 'item',
            states: { disabled },
            size,
        });

    const isLeading = position === 'leading';

    const checkbox = useMemo(() => {
        const checkboxProps = { ...props, status, disabled, size, style };

        return <Checkbox {...checkboxProps} />;
    }, [props, status, disabled, size, style]);

    const { containerStyles, labelStyles } = useMemo(
        () => ({
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
                    fontSize,
                },
                labelStyle,
            ],
        }),
        [
            containerStyle,
            fontSize,
            isLeading,
            labelColor,
            labelStyle,
            labelTypeScale,
            paddingHorizontal,
            paddingVertical,
        ],
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
                <Text style={labelStyles} selectable={false}>
                    {label}
                </Text>
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
    },
    label: {
        flexShrink: 1,
        flexGrow: 1,
    },
});

export default memo(forwardRef(CheckboxItem));
