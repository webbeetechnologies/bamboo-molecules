import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { TimePickerModalProps } from '../TimePickerModal';
import type { TextInputProps } from '../TextInput';
import { timeFormat, getAddableHourAndMinute } from './utils';
import { parse } from '../../utils';
import { format } from 'date-fns';

export type Props = TextInputProps & {
    time: string;
    onTimeChange: (time: string) => void;
    is24Hour?: boolean;
    withModal?: boolean;
    modalProps?: Omit<TimePickerModalProps, 'time' | 'onConfirm' | 'isOpen' | 'onClose'>;
};

const TimePickerField = (
    {
        time,
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

    const [timeString, setTimeString] = useState(
        format(parse(time, 'HH:mm', new Date()), timeFormat[!is24Hour ? '12' : '24'].format),
    );

    const currentTimeFormat = useMemo(() => timeFormat[!is24Hour ? '12' : '24'], [is24Hour]);

    const { state: isOpen, setState: setIsOpen } = useToggle(false);

    const onCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const onOpenModal = useCallback(() => setIsOpen(true), [setIsOpen]);

    const onTimeChange = useCallback(
        ({ time: _time }: { time: string }) => {
            const { hour, minute } = getAddableHourAndMinute({ time: timeString, is24Hour });
            // const isPM = timeString.replace(/[\d:]/g, '').includes('p');

            onTimeChangeProp?.(
                `${hour.toString().padStart(2, '0')}:${minute.toString().padEnd(2, '0')}`,
            );
        },
        [is24Hour, onTimeChangeProp, timeString],
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
                    is24Hour={is24Hour}
                />
            </>
        );
    }, [
        IconButton,
        TimePickerModal,
        is24Hour,
        isOpen,
        modalProps,
        onCloseModal,
        onConfirmTime,
        onOpenModal,
        time,
        withModal,
    ]);
    // useEffect(() => {
    //     setTimeString(
    //         () =>
    //             formatWithMask({
    //                 text: time,
    //                 mask: timeFormat[is24Hour ? '24' : '12'].mask,
    //             }).masked,
    //     );
    // }, [time, currentTimeFormat.format, is24Hour]);

    return (
        <MaskedInput
            ref={ref}
            mask={currentTimeFormat.mask}
            label={currentTimeFormat.format}
            {...rest}
            value={timeString}
            onChangeText={setTimeString}
            style={componentStyles}
            onBlur={onBlur}
            right={rightElement}
        />
    );
};

export default memo(forwardRef(TimePickerField));
