import { useCallback, useMemo, useState } from 'react';

import { useRangeChecker } from '../DatePickerInline/dateUtils';
import type { ValidRangeType } from '../DatePickerInline';
import { format, isNil } from '../../utils';

export default function useDateInput({
    // locale,
    value,
    validRange,
    inputMode,
    onChange,
    dateFormat,
}: {
    onChange: (d: Date) => void;
    // locale: undefined | string;
    value: Date | undefined;
    validRange: ValidRangeType | undefined;
    inputMode: 'start' | 'end';
    dateFormat: string;
}) {
    const { isDisabled, isWithinValidRange, validStart, validEnd } = useRangeChecker(validRange);
    const [error, setError] = useState<null | string>(null);

    const formattedValue = useMemo(
        () => (!isNil(value) ? format(value, dateFormat) : ''),
        [dateFormat, value],
    );

    const onChangeText = useCallback(
        (date: string) => {
            const dayIndex = dateFormat.indexOf('dd');
            const monthIndex = dateFormat.indexOf('MM');
            const yearIndex = dateFormat.indexOf('yyyy');

            const day = Number(date.slice(dayIndex, dayIndex + 2));
            const year = Number(date.slice(yearIndex, yearIndex + 4));
            const month = Number(date.slice(monthIndex, monthIndex + 2));

            if (Number.isNaN(day) || Number.isNaN(year) || Number.isNaN(month)) {
                setError(`Date format must be ${dateFormat}`);
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
                              `${`Must be between ${format(validStart, dateFormat)} - ${format(
                                  validEnd,
                                  dateFormat,
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
        },
        [dateFormat, inputMode, isDisabled, isWithinValidRange, onChange, validEnd, validStart],
    );

    return {
        onChange,
        error,
        formattedValue,
        onChangeText,
    };
}
