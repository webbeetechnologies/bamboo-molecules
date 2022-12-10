import { useCallback, useMemo, useState } from 'react';

import { useRangeChecker } from '../DatePickerInline/dateUtils';
import type { ValidRangeType } from '../DatePickerInline';
import { format, isNil, parse, isValid } from '../../utils';

export default function useDateInput({
    // locale,
    value,
    validRange,
    // inputMode,
    onChange,
    dateFormat,
}: {
    onChange: (d: Date) => void;
    // locale: undefined | string;
    value: Date | undefined;
    validRange: ValidRangeType | undefined;
    // inputMode: 'start' | 'end';
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
            const parsedDate = parse(date, dateFormat, new Date());

            if (!isValid(parsedDate)) {
                setError(`Date format must be ${dateFormat}`);

                return;
            }

            if (isDisabled(parsedDate)) {
                setError('Day is not allowed');
                return;
            }
            if (!isWithinValidRange(parsedDate)) {
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

            onChange(parsedDate);
            setError(null);
        },
        [dateFormat, isDisabled, isWithinValidRange, onChange, validEnd, validStart],
    );

    return {
        onChange,
        error,
        formattedValue,
        onChangeText,
    };
}
