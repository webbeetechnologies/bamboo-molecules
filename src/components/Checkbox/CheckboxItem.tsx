import { forwardRef, memo, useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import type { LabelProps } from '@bambooapp/bamboo-atoms';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
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
    containerStyle?: ViewStyle;
    /**
     * props for the label
     */
    labelProps?: Omit<LabelProps, 'children' | 'style'>;
    /**
     * Checkbox control position.
     */
    position?: 'leading' | 'trailing';
};

const CheckboxItem = (
    {
        style: styleProp,
        containerStyle,
        value: valueProp,
        label,
        onChange: onChangeProp,
        defaultValue,
        labelStyle,
        testID,
        position = 'leading',
        accessibilityLabel = label,
        disabled = false,
        size = 'md',
        labelProps,
        indeterminate,
        ...props
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple } = useMolecules();
    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        disabled: disabled,
    });
    const componentStyles = useComponentStyles('Checkbox', styleProp, {
        variant: 'item',
        states: { disabled, checked: value && !indeterminate },
        size,
    });

    const isLeading = position === 'leading';

    const { containerStyles, labelStyles, style } = useMemo(() => {
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
                    paddingLeft: isLeading ? 0 : 'spacings.2',
                    paddingRight: !isLeading ? 0 : 'spacings.2',
                },
                fontSize ? { fontSize } : {},
                labelStyle,
            ],
            style: _style,
        };
    }, [componentStyles, containerStyle, isLeading, labelStyle]);

    const onPress = useCallback(() => {
        onChange(!value);
    }, [onChange, value]);

    const checkbox = useMemo(() => {
        const checkboxProps = {
            ...props,
            indeterminate,
            defaultValue: false,
            value,
            onChange,
            disabled,
            size,
            style,
        };

        return <Checkbox {...checkboxProps} />;
    }, [props, indeterminate, value, onChange, disabled, size, style]);

    const accessibilityState = useMemo(
        () => ({
            checked: value,
            disabled,
        }),
        [disabled, value],
    );

    return (
        <TouchableRipple
            style={containerStyles}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="checkbox"
            accessibilityState={accessibilityState}
            onPress={onPress}
            testID={testID}
            disabled={disabled}
            ref={ref}>
            <>
                {isLeading && checkbox}
                <Text selectable={false} {...labelProps} style={labelStyles}>
                    {label}
                </Text>
                {!isLeading && checkbox}
            </>
        </TouchableRipple>
    );
};

CheckboxItem.displayName = 'Checkbox_Item';

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
