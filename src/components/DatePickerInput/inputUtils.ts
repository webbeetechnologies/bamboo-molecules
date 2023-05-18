import { useCallback, useMemo } from 'react';

import { useRangeChecker } from '../DatePickerInline/dateUtils';
import type { ValidRangeType } from '../DatePickerInline';
import { format, isNil, parse, isValid, endOfDay } from '../../utils';

export default function useDateInput({
    // locale,
    value,
    validRange,
    inputMode = 'start',
    onChange,
    dateFormat,
}: {
    onChange?: (d: Date) => void;
    // locale: undefined | string;
    value?: Date | null;
    validRange?: ValidRangeType;
    inputMode: 'start' | 'end';
    dateFormat: string;
}) {
    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);
    // const [error, setError] = useState<null | string>(null);

    const formattedValue = useMemo(() => {
        try {
            return !isNil(value) ? format(value, dateFormat) : '';
        } catch (e) {
            return '';
        }
    }, [dateFormat, value]);

    const onChangeText = useCallback(
        (date: string) => {
            const parsedDate = parse(date, dateFormat, new Date());

            if (!isValid(parsedDate)) {
                // TODO: Translate
                // setError(`Date format must be ${dateFormat}`);
                onChange?.(new Date('Invalid Date'));

                return;
            }

            const finalDate = inputMode === 'end' ? endOfDay(parsedDate) : parsedDate;

            if (isDisabled(finalDate)) {
                // TODO: Translate
                // setError('Day is not allowed');
                onChange?.(new Date('Invalid Date'));

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
                onChange?.(new Date('Invalid Date'));

                return;
            }

            onChange?.(finalDate);
            // setError(null);
        },
        [dateFormat, inputMode, isDisabled, isWithinValidRange, onChange],
    );

    return {
        onChange,
        // error,
        formattedValue,
        onChangeText,
    };
}
