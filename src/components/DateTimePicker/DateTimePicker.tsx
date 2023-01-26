import { forwardRef, memo, useCallback, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import type { Mask } from 'react-native-mask-input';
import { set, format } from 'date-fns';

import { useComponentStyles, useControlledValue, useMolecules, useToggle } from '../../hooks';
import type { MaskedInputProps } from '../MaskedInput';
import type { DatePickerInputProps } from '../DatePickerInput';
import type { TimePickerModalProps } from '../TimePickerModal';

export type Props = ViewProps & {
    is24Hour?: boolean;
    date?: Date | null;
    onChange?: (date: Date | null) => void;
    defaultValue?: Date | null;
    timeInputProps?: Omit<Partial<MaskedInputProps>, 'value' | 'onChangeText' | 'mask'>;
    datePickerInputProps?: Omit<Partial<DatePickerInputProps>, 'value' | 'onChange'>;
    timePickerModalProps?: Omit<
        Partial<TimePickerModalProps>,
        'time' | 'onConfirm' | 'isOpen' | 'onClose'
    >;
};

const emptyObj = {};

const DateTimePicker = (
    {
        is24Hour = false,
        date: dateProp,
        onChange: onChangeProp,
        defaultValue,
        datePickerInputProps = emptyObj,
        timeInputProps = emptyObj,
        timePickerModalProps = emptyObj,
        style,
        ...rest
    }: Props,
    ref: any,
) => {
    const { DatePickerInput, ElementGroup, MaskedInput, IconButton, TimePickerModal } =
        useMolecules();
    const componentStyles = useComponentStyles('DateTimePicker', style);

    const [date, onChange] = useControlledValue<Date | null>({
        value: dateProp,
        defaultValue,
        onChange: onChangeProp,
    });
    const [time, setTime] = useState(date ? format(date, is24Hour ? 'HH:mm' : 'hh:mmaaa') : '');
    const { state: isOpen, setState: setIsOpen } = useToggle(false);

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

    const onTimeChange = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            timeInputProps.onBlur?.(e);

            const [hour = '0', minute = '0'] = time.split(':');

            onChange(
                set(date || new Date(), {
                    hours: +hour,
                    minutes: +minute,
                }),
            );

            setTime(formatTime({ date, hour, minute, is24Hour }));
        },
        [date, is24Hour, onChange, time, timeInputProps],
    );

    const onCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const onOpenModal = useCallback(() => setIsOpen(true), [setIsOpen]);

    const onConfirmTime = useCallback(
        (newTime: string) => {
            const [hour = '0', minute = '0'] = newTime.split(':');

            onChange(set(date || new Date(), { hours: +hour, minutes: +minute }));
            setTime(formatTime({ date, hour, minute, is24Hour }));

            setIsOpen(false);
        },
        [date, is24Hour, onChange, setIsOpen],
    );

    return (
        <>
            <ElementGroup style={componentStyles} {...rest} ref={ref}>
                <DatePickerInput
                    inputMode="start"
                    variant="outlined"
                    {...datePickerInputProps}
                    value={date}
                    onChange={onDateChange}
                />
                <MaskedInput
                    variant="outlined"
                    label="hh:mm"
                    mask={is24Hour ? timeMask24Hour : timeMask12Hour}
                    {...timeInputProps}
                    value={time}
                    onChangeText={setTime}
                    onBlur={onTimeChange}
                    right={<IconButton name="clock-outline" onPress={onOpenModal} />}
                />
            </ElementGroup>
            <TimePickerModal
                {...timePickerModalProps}
                time={time.replace(/^[ap]m/, '')}
                isOpen={isOpen}
                onClose={onCloseModal}
                onConfirm={onConfirmTime}
            />
        </>
    );
};

const timeMask24Hour: Mask = (text: string = '') => {
    const cleanTime = text.replace(/\D+/g, '');

    const hourFirstDigit = /[012]/; // only 0,1 or 2
    let hourSecondDigit = /\d/; // any number

    if (cleanTime.charAt(0) === '2') {
        hourSecondDigit = /[0123]/; // only 0,1,2 or 3
    }

    const minuteFirstDigit = /[012345]/; // only 0,1,2,3,4 or 5
    const minuteSecondDigit = /\d/; // any number

    return [hourFirstDigit, hourSecondDigit, ':', minuteFirstDigit, minuteSecondDigit];
};

const timeMask12Hour: Mask = [/[01]/, /\d/, ':', /[012345]/, /\d/, /[ap]/, 'm'];

const formatTime = ({
    date,
    hour,
    minute,
    is24Hour,
}: {
    date: Date | null;
    hour: string;
    minute: string;
    is24Hour: boolean;
}) => {
    return format(
        set(date || new Date(), { hours: +hour, minutes: +(minute || 0) }),
        is24Hour ? 'HH:mm' : 'hh:mmaaa',
    );
};

export default memo(forwardRef(DateTimePicker));
