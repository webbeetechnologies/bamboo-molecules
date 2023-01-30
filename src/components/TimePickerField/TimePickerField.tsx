import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { format, set } from 'date-fns';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { TimePickerModalProps } from '../TimePickerModal';
import type { TextInputProps } from '../TextInput';
import { formatTime, timeFormat, getAddableHourAndMinute } from './utils';

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
        onBlur: onBlurProp,
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

    const onTimeChange = useCallback(
        ({ time: _time }: { time: string }) => {
            const { hour, minute } = getAddableHourAndMinute({ time: _time, is24Hour });

            onTimeChangeProp?.(
                set(timeProp || new Date(), {
                    hours: hour,
                    minutes: minute,
                }),
            );

            if (onTimeChangeProp) return;

            setTime(formatTime({ date: timeProp, hour, minute, is24Hour }));
        },
        [is24Hour, onTimeChangeProp, timeProp],
    );

    const onConfirmTime = useCallback(
        (newTime: string) => {
            setIsOpen(false);

            onTimeChange({ time: newTime });
        },
        [setIsOpen, onTimeChange],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlurProp?.(e);

            onTimeChange({ time });
        },
        [onBlurProp, onTimeChange, time],
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
            onBlur={onBlur}
            right={rightElement}
        />
    );
};

export default memo(forwardRef(TimePickerField));
