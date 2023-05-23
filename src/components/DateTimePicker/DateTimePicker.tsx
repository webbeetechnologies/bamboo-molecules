import { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { set, format, parse } from 'date-fns';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { DatePickerInputProps } from '../DatePickerInput';
import { TimePickerFieldProps, sanitizeTimeString } from '../TimePickerField';
import { isValid } from '../../utils';

export type Props = ViewProps & {
    is24Hour?: boolean;
    date?: Date | null;
    onChange?: (date: Date | null) => void;
    defaultValue?: Date | null;
    timePickerFieldProps?: Omit<
        Partial<TimePickerFieldProps>,
        'value' | 'onChangeText' | 'date' | 'onTimeChange'
    >;
    datePickerInputProps?: Omit<Partial<DatePickerInputProps>, 'value' | 'onChange'>;
};

const emptyObj = {};

const DateTimePicker = (
    {
        is24Hour = false,
        date: dateProp,
        onChange: onChangeProp,
        defaultValue,
        datePickerInputProps = emptyObj,
        timePickerFieldProps = emptyObj,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { DatePickerInput, ElementGroup, TimePickerField } = useMolecules();
    const componentStyles = useComponentStyles('DateTimePicker', style);

    const [date, onChange] = useControlledValue<Date | null>({
        value: dateProp,
        defaultValue,
        onChange: onChangeProp,
    });

    const timeString = useMemo(() => (date && isValid(date) ? format(date, 'HH:mm') : ''), [date]);

    const onDateChange = useCallback(
        (newDate: Date | null) => {
            if (!newDate) {
                onChange(null);

                return;
            }

            if (!date) {
                onChange(newDate);
                return;
            }

            if (!isValid(newDate)) {
                onChange(null);
                return;
            }

            const [day, month, year] = format(newDate, 'dd/MM/yyyy').split('/');

            onChange(set(date, { date: +day, month: +month - 1, year: +year }));
        },
        [date, onChange],
    );

    const onTimeChange = useCallback(
        (time: string) => {
            if (!time) return;

            const newTime = sanitizeTimeString(time);

            onChange(date ? parse(newTime, 'HH:mm', date) : null);
        },
        [date, onChange],
    );

    useEffect(() => {
        if (isValid(date)) return;

        onChange(null);
    }, [date, onChange]);

    return (
        <>
            <ElementGroup style={componentStyles} testID={testID} {...rest} ref={ref}>
                <DatePickerInput
                    inputMode="start"
                    variant="outlined"
                    testID={testID ? `${testID}--datepickerinput` : undefined}
                    {...datePickerInputProps}
                    value={date}
                    onChange={onDateChange}
                />
                <TimePickerField
                    variant="outlined"
                    testID={testID ? `${testID}--timepickerinput` : undefined}
                    is24Hour={is24Hour}
                    {...timePickerFieldProps}
                    time={timeString}
                    onTimeChange={onTimeChange}
                />
            </ElementGroup>
        </>
    );
};

export default memo(forwardRef(DateTimePicker));
