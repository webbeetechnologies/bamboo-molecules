import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { TimePickerModalProps } from '../TimePickerModal';
import type { TextInputProps } from '../TextInput';
import { timeFormat, getFormattedTime, getOutputTime } from './utils';

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
    const componentStyles = useComponentStyles('TimePickerField', style);

    const [timeString, setTimeString] = useState(getFormattedTime({ time, is24Hour }));

    const currentTimeFormat = useMemo(() => timeFormat[!is24Hour ? '12' : '24'], [is24Hour]);

    const { state: isOpen, setState: setIsOpen } = useToggle(false);

    const onCloseModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const onOpenModal = useCallback(() => setIsOpen(true), [setIsOpen]);

    const onConfirmTime = useCallback(
        (newTime: string) => {
            setIsOpen(false);

            onTimeChangeProp(newTime);
        },
        [onTimeChangeProp, setIsOpen],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlurProp?.(e);

            const outputTime = getOutputTime({ time: timeString, is24Hour });
            onTimeChangeProp(outputTime);

            if (time === outputTime) {
                setTimeString(getFormattedTime({ time, is24Hour }));
            }
        },
        [is24Hour, onBlurProp, onTimeChangeProp, time, timeString],
    );

    const rightElement = useMemo(() => {
        if (!withModal) return null;

        return (
            <>
                <IconButton name="clock-outline" onPress={onOpenModal} />
                <TimePickerModal
                    {...modalProps}
                    time={getFormattedTime({ time: time, is24Hour: true })}
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

    useEffect(() => {
        setTimeString(getFormattedTime({ time, is24Hour }));
    }, [is24Hour, time]);

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
