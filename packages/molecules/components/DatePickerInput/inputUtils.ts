import { MutableRefObject, useCallback, useEffect, useState } from 'react';

import { useRangeChecker } from '../DatePickerInline/dateUtils';
import type { ValidRangeType } from '../DatePickerInline';
import { format, isNil, parse, isValid, endOfDay } from '../../utils';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { useLatest } from '../../hooks';

const formatValue = (value: Date | null | undefined, dateFormat: string) =>
    !isNil(value) ? format(value, dateFormat) || '' : '';

export default function useDateInput({
    // locale,
    value,
    validRange,
    inputMode = 'start',
    onChange,
    dateFormat,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    isBlurredRef,
}: {
    onChange?: (d: Date | null) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    // locale: undefined | string;
    value?: Date | null;
    validRange?: ValidRangeType;
    inputMode: 'start' | 'end';
    dateFormat: string;
    isBlurredRef: MutableRefObject<boolean>;
}) {
    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);

    const [formattedValue, setFormattedValue] = useState(() => formatValue(value, dateFormat));
    const formattedValueRef = useLatest(formattedValue);

    // const [error, setError] = useState<null | string>(null);

    const onChangeText = useCallback(
        (date: string) => {
            const parsedDate = parse(date, dateFormat, new Date());

            setFormattedValue(
                isBlurredRef.current
                    ? isValid(parsedDate)
                        ? date
                        : formattedValueRef.current
                    : date,
            );

            if (!isValid(parsedDate)) {
                // TODO: Translate
                // setError(`Date format must be ${dateFormat}`);
                onChange?.(date ? value ?? null : null);

                return;
            }

            const finalDate = inputMode === 'end' ? endOfDay(parsedDate) : parsedDate;

            if (isDisabled(finalDate)) {
                // TODO: Translate
                // setError('Day is not allowed');
                onChange?.(null);

                return;
            }
            if (!isWithinValidRange(finalDate)) {
                // TODO: Translate
                // const errors =
                //     validStart && validEnd
                //         ? [
                //               `${`Must be between ${format(validStart, dateFormat)} - ${format(
                //                   validEnd,
                //                   dateFormat,
                //               )})`}`,
                //           ]
                //         : [
                //               validStart ? `Must be later then ${validStart}` : '',
                //               validEnd ? `Must be earlier then ${validEnd}` : '',
                //           ];

                // setError(errors.filter(n => n).join(' '));
                onChange?.(null);

                return;
            }

            onChange?.(finalDate);
            // setError(null);
        },
        [
            dateFormat,
            formattedValueRef,
            inputMode,
            isBlurredRef,
            isDisabled,
            isWithinValidRange,
            onChange,
            value,
        ],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = true;
            onBlurProp?.(e);
            formattedValueRef.current = formatValue(value, dateFormat);
            setFormattedValue(formattedValueRef.current);
        },
        [dateFormat, formattedValueRef, isBlurredRef, onBlurProp, value],
    );

    const onFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = false;
            onFocusProp?.(e);
        },
        [isBlurredRef, onFocusProp],
    );

    useEffect(() => {
        if (!isBlurredRef.current) return;

        setFormattedValue(formatValue(value, dateFormat));
    }, [value, dateFormat, isBlurredRef]);

    return {
        onChange,
        // error,
        formattedValue,
        onChangeText,
        onBlur,
        onFocus,
    };
}
