import { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { useCurrentTheme } from '../../../hooks';
import TextInputWithMask from '../TextInputMask';
import useDateInput from './inputUtils';
import type { DatePickerInputProps } from './DatePickerInput.shared';

function DatePickerInputWithoutModal(
    {
        label,
        value,
        onChange,
        style,
        locale,
        validRange,
        inputMode,
        withDateFormatInLabel = true,
        modal,
        inputButtons,
        ...rest
    }: DatePickerInputProps & {
        modal?: (params: {
            value: DatePickerInputProps['value'];
            locale: DatePickerInputProps['locale'];
            inputMode: DatePickerInputProps['inputMode'];
            validRange: DatePickerInputProps['validRange'];
        }) => any;
        inputButtons?: any;
    },
    ref: any,
) {
    const theme = useCurrentTheme();
    const { formattedValue, inputFormat, onChangeText, error } = useDateInput({
        locale,
        value,
        validRange,
        inputMode,
        onChange,
    });

    return (
        <>
            <View style={styles.root}>
                <TextInputWithMask
                    {...rest}
                    ref={ref}
                    label={getLabel({
                        // TODO: support label components?
                        label: label as any,
                        inputFormat,
                        withDateFormatInLabel,
                    })}
                    value={formattedValue}
                    keyboardType={'number-pad'}
                    placeholder={inputFormat}
                    mask={inputFormat}
                    onChangeText={onChangeText}
                    keyboardAppearance={theme.dark ? 'dark' : 'default'}
                    error={!!error}
                    style={[styles.input, style]}
                    right={inputButtons}
                    supportingText={error as string}
                />
            </View>
            {modal?.({ value, locale, inputMode, validRange })}
        </>
    );
}

function getLabel({
    withDateFormatInLabel,
    inputFormat,
    label,
}: {
    withDateFormatInLabel: boolean;
    inputFormat: string;
    label: string | undefined;
}) {
    if (withDateFormatInLabel) {
        return label ? `${label} (${inputFormat})` : inputFormat;
    }
    return label || '';
}

const styles = StyleSheet.create({
    root: {
        minWidth: 150,
        flexGrow: 1,
        justifyContent: 'center',
    },
    helperTextContainer: {
        flexDirection: 'row',
    },
    helperText: {
        flex: 1,
    },
    input: {},
});
export default forwardRef(DatePickerInputWithoutModal);
