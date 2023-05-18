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
        style,
        ...rest
    }: DatePickerInputWithoutModalProps,
    ref: any,
) {
    const { TextInputWithMask } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerInput', style);

    const theme = useCurrentTheme();
    // TODO - revisit error
    const { formattedValue, onChangeText } = useDateInput({
        // locale,
        value,
        validRange,
        inputMode,
        onChange,
        dateFormat,
    });

    return (
        <TextInputWithMask
            placeholder={dateFormat}
            style={componentStyles}
            {...rest}
            ref={ref}
            label={label}
            value={formattedValue}
            keyboardType={'number-pad'}
            mask={dateFormat}
            onChangeText={onChangeText}
            keyboardAppearance={theme.dark ? 'dark' : 'default'}
            // error={formattedValue ? !!error : false}
            right={inputButtons}
            // supportingText={formattedValue ? error || undefined : undefined}
        />
    );
}

export default memo(forwardRef(DatePickerInputWithoutModal));
