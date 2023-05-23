import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';

import { useComponentStyles, useCurrentTheme, useMolecules } from '../../hooks';
import useDateInput from './inputUtils';
import type { DatePickerInputWithoutModalProps } from './types';

function DatePickerInputWithoutModal(
    {
        label,
        value,
        onChange: onChangeProp,
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

    const inputRef = useRef(null);

    const onChange = useCallback(
        (date: Date | null) => {
            onChangeProp?.(date);

            if (!date) (inputRef.current as any)?.setDisplayValue('');
        },
        [onChangeProp],
    );

    // TODO - revisit error
    const { formattedValue, onChangeText } = useDateInput({
        // locale,
        value,
        validRange,
        inputMode,
        onChange,
        dateFormat,
    });

    useImperativeHandle(ref, () => inputRef);

    return (
        <TextInputWithMask
            placeholder={dateFormat}
            style={componentStyles}
            {...rest}
            ref={inputRef}
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
