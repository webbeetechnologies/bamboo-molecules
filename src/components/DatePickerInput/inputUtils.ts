import { useInputFormat, useInputFormatter, useRangeChecker } from './dateUtils';
import { useState } from 'react';
import type { ValidRangeType } from '../DatePickerInline/DatePickerInline';

export default function useDateInput({
    locale,
    value,
    validRange,
    inputMode,
    onChange,
}: {
    onChange: (d: Date) => void;
    locale: undefined | string;
    value: Date | undefined;
    validRange: ValidRangeType | undefined;
    inputMode: 'start' | 'end';
}) {
    const { isDisabled, isWithinValidRange, validStart, validEnd } = useRangeChecker(validRange);
    const [error, setError] = useState<null | string>(null);
    const formatter = useInputFormatter({ locale });
    const inputFormat = useInputFormat({ formatter, locale });
    const formattedValue = value !== null ? formatter.format(value) : '';
    const onChangeText = (date: string) => {
        const dayIndex = inputFormat.indexOf('DD');
        const monthIndex = inputFormat.indexOf('MM');
        const yearIndex =
            locale === 'pt' ? inputFormat.indexOf('AAAA') : inputFormat.indexOf('YYYY');

        const day = Number(date.slice(dayIndex, dayIndex + 2));
        const year = Number(date.slice(yearIndex, yearIndex + 4));
        const month = Number(date.slice(monthIndex, monthIndex + 2));

        if (Number.isNaN(day) || Number.isNaN(year) || Number.isNaN(month)) {
            setError(`Date format must be ${inputFormat}`);
            return;
        }

        const finalDate =
            inputMode === 'end'
                ? new Date(year, month - 1, day, 23, 59, 59)
                : new Date(year, month - 1, day);

        if (isDisabled(finalDate)) {
            setError('Day is not allowed');
            return;
        }
        if (!isWithinValidRange(finalDate)) {
            const errors =
                validStart && validEnd
                    ? [
                          `${`Must be between ${formatter.format(validStart)} - ${formatter.format(
                              validEnd,
                          )})`}`,
                      ]
                    : [
                          validStart ? `Must be later then ${validStart}` : '',
                          validEnd ? `Must be earlier then ${validEnd}` : '',
                      ];
            setError(errors.filter(n => n).join(' '));
            return;
        }

        setError(null);
        if (inputMode === 'end') {
            onChange(finalDate);
        } else {
            onChange(finalDate);
        }
    };
    return {
        onChange,
        error,
        formattedValue,
        onChangeText,
        inputFormat,
    };
}
