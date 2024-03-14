import {
    MutableRefObject,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { set, format, parse } from 'date-fns';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { DatePickerInputProps } from '../DatePickerInput';
import { TimePickerFieldProps, sanitizeTimeString } from '../TimePickerField';
import { isValid } from '../../utils';
import type { TextInputHandles } from '../TextInput/TextInput';

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
    datePickerInputRef?: MutableRefObject<TextInputHandles | null>;
    timePickerInputRef?: MutableRefObject<TextInputHandles | null>;
};

const emptyObj = {};

const normalizeDateWithCurrentTime = (specificDate: Date) => {
    const date = new Date();

    date.setFullYear(specificDate.getFullYear());
    date.setMonth(specificDate.getMonth());
    date.setDate(specificDate.getDate());

    return date;
};

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
        datePickerInputRef: _datePickerInputRef,
        timePickerInputRef: _timePickerInputRef,
        ...rest
    }: Props,
    ref: any,
) => {
    const { DatePickerInput, ElementGroup, TimePickerField } = useMolecules();
    const componentStyles = useComponentStyles('DateTimePicker', style);

    const containerRef = useRef(null);
    const datePickerInputRef = useRef<TextInputHandles>(null);
    const timePickerInputRef = useRef<TextInputHandles>(null);

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
                onChange(normalizeDateWithCurrentTime(newDate));
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

    useImperativeHandle(_datePickerInputRef, () => datePickerInputRef.current as TextInputHandles);
    useImperativeHandle(_timePickerInputRef, () => timePickerInputRef.current as TextInputHandles);

    useImperativeHandle(ref, () =>
        Object.assign(containerRef.current || {}, {
            blur: () => {
                datePickerInputRef.current?.blur?.();
                timePickerInputRef.current?.blur?.();
            },
        }),
    );

    return (
        <>
            <ElementGroup style={componentStyles} testID={testID} {...rest} ref={containerRef}>
                <DatePickerInput
                    ref={datePickerInputRef}
                    inputMode="start"
                    variant="outlined"
                    testID={testID ? `${testID}--datepickerinput` : undefined}
                    {...datePickerInputProps}
                    value={date}
                    onChange={onDateChange}
                />
                <TimePickerField
                    ref={timePickerInputRef}
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
