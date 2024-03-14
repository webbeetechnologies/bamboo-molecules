import { useCallback, useEffect, useRef, useState } from 'react';

import { useRangeChecker } from '../DatePickerInline/dateUtils';
import type { ValidRangeType } from '../DatePickerInline';
import { format, isNil, parse, isValid, endOfDay } from '../../utils';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

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
}: {
    onChange?: (d: Date | null, ...args: any) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    // locale: undefined | string;
    value?: Date | null;
    validRange?: ValidRangeType;
    inputMode: 'start' | 'end';
    dateFormat: string;
}) {
    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);

    const [formattedValue, setFormattedValue] = useState(() => formatValue(value, dateFormat));

    const isBlurredRef = useRef(true);

    // const [error, setError] = useState<null | string>(null);

    const onChangeText = useCallback(
        (date: string, ...args: any) => {
            setFormattedValue(date);
            const parsedDate = parse(date, dateFormat, new Date());

            if (!isValid(parsedDate)) {
                // TODO: Translate
                // setError(`Date format must be ${dateFormat}`);
                onChange?.(null, ...args);

                return;
            }

            const finalDate = inputMode === 'end' ? endOfDay(parsedDate) : parsedDate;

            if (isDisabled(finalDate)) {
                // TODO: Translate
                // setError('Day is not allowed');
                onChange?.(null, ...args);

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
                onChange?.(null, ...args);

                return;
            }

            onChange?.(finalDate, ...args);
            // setError(null);
        },
        [dateFormat, inputMode, isDisabled, isWithinValidRange, onChange],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = true;
            onBlurProp?.(e);
            setFormattedValue(formatValue(value, dateFormat));
        },
        [dateFormat, onBlurProp, value],
    );

    const onFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = false;
            onFocusProp?.(e);
        },
        [onFocusProp],
    );

    useEffect(() => {
        if (!isBlurredRef.current) return;

        setFormattedValue(formatValue(value, dateFormat));
    }, [value, dateFormat]);

    return {
        onChange,
        // error,
        formattedValue,
        onChangeText,
        onBlur,
        onFocus,
    };
}
