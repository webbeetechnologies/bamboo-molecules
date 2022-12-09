import { forwardRef, memo, useMemo } from 'react';

import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import useDateInput from './inputUtils';
import type { DatePickerInputWithoutModalProps } from './types';

function DatePickerInputWithoutModal(
    {
        label: labelProp,
        value,
        onChange,
        locale = 'en',
        validRange,
        inputMode,
        withDateFormatInLabel = true,
        modal,
        inputButtons,
        dateFormat = 'dd/MM/yyyy',
        ...rest
    }: DatePickerInputWithoutModalProps,
    ref: any,
) {
    const { TextInputWithMask, View } = useMolecules();
    const { container } = useComponentStyles('DatePickerInput');

    const theme = useCurrentTheme();
    const { formattedValue, onChangeText, error } = useDateInput({
        // locale,
        value,
        validRange,
        inputMode,
        onChange,
        dateFormat,
    });

    const label = useMemo(
        () =>
            getLabel({
                // TODO: support label components?
                label: labelProp as any,
                inputFormat: dateFormat,
                withDateFormatInLabel,
            }),
        [dateFormat, labelProp, withDateFormatInLabel],
    );

    const modalParams = useMemo(
        () => ({ value, locale, inputMode, validRange }),
        [inputMode, locale, validRange, value],
    );

    return (
        <>
            <View style={container}>
                <TextInputWithMask
                    placeholder={dateFormat}
                    {...rest}
                    ref={ref}
                    label={label}
                    value={formattedValue}
                    keyboardType={'number-pad'}
                    mask={dateFormat}
                    onChangeText={onChangeText}
                    keyboardAppearance={theme.dark ? 'dark' : 'default'}
                    error={!!error}
                    right={inputButtons}
                    supportingText={error || undefined}
                />
            </View>
            {modal?.(modalParams)}
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
