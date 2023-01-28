import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import type { Mask } from 'react-native-mask-input';
import { format, set } from 'date-fns';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { TimePickerModalProps } from '../TimePickerModal';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
    time?: Date | null;
    onTimeChange?: (date: Date) => void;
    is24Hour?: boolean;
    withModal?: boolean;
    modalProps?: Omit<TimePickerModalProps, 'time' | 'onConfirm' | 'isOpen' | 'onClose'>;
};

const today = new Date();

const TimePickerField = (
    {
        time: timeProp = today,
        onTimeChange: onTimeChangeProp,
        is24Hour = false,
        withModal = true,
        style,
        onBlur,
        modalProps = {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { MaskedInput, IconButton, TimePickerModal } = useMolecules();
    const componentStyles = useComponentStyles('TimePickerField', style); // all the styling logics goes here

    const currentTimeFormat = useMemo(() => timeFormat[!is24Hour ? '12' : '24'], [is24Hour]);

    const [time, setTime] = useState(() =>
        timeProp ? format(timeProp, currentTimeFormat.format) : '',
    );
    const { state: isOpen, setState: setIsOpen } = useToggle(false);

    const onCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const onOpenModal = useCallback(() => setIsOpen(true), [setIsOpen]);

    const onConfirmTime = useCallback(
        (newTime: string) => {
            const [hour = '0', minute = '0'] = newTime.replace(/[ap]m/, '').split(':');

            onTimeChangeProp?.(set(timeProp || new Date(), { hours: +hour, minutes: +minute }));

            setTime(formatTime({ date: timeProp, hour, minute, is24Hour }));

            setIsOpen(false);
        },
        [timeProp, is24Hour, onTimeChangeProp, setIsOpen],
    );

    const onTimeChange = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur?.(e);

            const [hour = '0', minute = '0'] = time.replace(/[ap]m/, '').split(':');

            onTimeChangeProp?.(
                set(timeProp || new Date(), {
                    hours: +hour,
                    minutes: +minute,
                }),
            );

            setTime(formatTime({ date: timeProp, hour, minute, is24Hour }));
        },
        [timeProp, is24Hour, onBlur, onTimeChangeProp, time],
    );

    const rightElement = useMemo(() => {
        if (!withModal) return null;

        return (
            <>
                <IconButton name="clock-outline" onPress={onOpenModal} />
                <TimePickerModal
                    {...modalProps}
                    time={time.replace(/[ap]m/g, '')}
                    isOpen={isOpen}
                    onClose={onCloseModal}
                    onConfirm={onConfirmTime}
                />
            </>
        );
    }, [
        IconButton,
        TimePickerModal,
        isOpen,
        modalProps,
        onCloseModal,
        onConfirmTime,
        onOpenModal,
        time,
        withModal,
    ]);

    useEffect(() => {
        setTime(timeProp ? format(timeProp, currentTimeFormat.format) : '');
    }, [timeProp, currentTimeFormat.format]);

    return (
        <MaskedInput
            ref={ref}
            mask={currentTimeFormat.mask}
            label={currentTimeFormat.format}
            {...rest}
            value={time}
            onChangeText={setTime}
            style={componentStyles}
            onBlur={onTimeChange}
            right={rightElement}
        />
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

const timeFormat = {
    '24': {
        format: 'hh:mm',
        mask: timeMask24Hour,
    },
    '12': {
        format: 'hh:mmaaa',
        mask: timeMask12Hour,
    },
};

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

export default memo(forwardRef(TimePickerField));
