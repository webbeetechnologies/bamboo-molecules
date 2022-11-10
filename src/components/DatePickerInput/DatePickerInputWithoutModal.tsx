import { forwardRef, memo } from 'react';
import { View } from 'react-native';

import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import useDateInput from './inputUtils';
import type { DatePickerInputProps } from './types';

function DatePickerInputWithoutModal(
    {
        label,
        value,
        onChange,
        locale = 'en',
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
    const { TextInputWithMask } = useMolecules();
    const { container } = useComponentStyles('DatePickerInput');

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
            <View style={container}>
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

export default memo(forwardRef(DatePickerInputWithoutModal));
