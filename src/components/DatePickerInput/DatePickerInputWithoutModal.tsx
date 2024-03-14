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
        onBlur: onBlurProp,
        onFocus: onFocusProp,
        ...rest
    }: DatePickerInputWithoutModalProps,
    ref: any,
) {
    const { TextInputWithMask } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerInput', style);

    const theme = useCurrentTheme();

    const inputRef = useRef(null);
    const isBlurredRef = useRef(true);

    const onChange = useCallback(
        (date: Date | null) => {
            // because onChange was already trigger not need to trigger again on
            if (!isBlurredRef.current) {
                onChangeProp?.(date);
            }

            if (!date && isBlurredRef.current) (inputRef.current as any)?.setDisplayValue('');
        },
        [onChangeProp],
    );

    const { formattedValue, onChangeText, onBlur, onFocus } = useDateInput({
        // locale,
        value,
        validRange,
        inputMode,
        onChange,
        dateFormat,
        onBlur: onBlurProp,
        onFocus: onFocusProp,
        isBlurredRef,
    });

    useImperativeHandle(ref, () => inputRef.current);

    return (
        <TextInputWithMask
            placeholder={dateFormat}
            style={componentStyles}
            {...rest}
            onBlur={onBlur}
            onFocus={onFocus}
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
