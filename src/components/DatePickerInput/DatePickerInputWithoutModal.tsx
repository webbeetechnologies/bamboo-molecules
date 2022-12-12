import { forwardRef, memo } from 'react';

import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import useDateInput from './inputUtils';
import type { DatePickerInputWithoutModalProps } from './types';

function DatePickerInputWithoutModal(
    {
        label,
        value,
        onChange,
        // locale = 'en',
        validRange,
        inputMode,
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

    return (
        <View style={container}>
            <TextInputWithMask
                placeholder={dateFormat}
                {...rest}
                ref={ref}
                label={label || dateFormat}
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
    );
}

export default memo(forwardRef(DatePickerInputWithoutModal));
