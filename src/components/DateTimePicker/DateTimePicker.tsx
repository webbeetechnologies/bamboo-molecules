import { forwardRef, memo, useCallback } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { set, format } from 'date-fns';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { DatePickerInputProps } from '../DatePickerInput';
import type { TimePickerFieldProps } from '../TimePickerField';

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

    const onDateChange = useCallback(
        (newDate: Date | null) => {
            if (!newDate) return;

            if (!date) {
                onChange(newDate);
                return;
            }

            const [day, month, year] = format(newDate, 'dd/MM/yyyy').split('/');

            onChange(set(date, { date: +day, month: +month, year: +year }));
        },
        [date, onChange],
    );

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
                    time={date}
                    onTimeChange={onChange}
                />
            </ElementGroup>
        </>
    );
};

export default memo(forwardRef(DateTimePicker));
