import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { TimePickerModalProps } from '../TimePickerModal';
import type { TextInputProps } from '../TextInput';
import { timeFormat, getFormattedTime, getOutputTime } from './utils';
import type { IconButtonProps } from '../IconButton';

export type Props = TextInputProps & {
    time: string;
    onTimeChange: (time: string) => void;
    is24Hour?: boolean;
    withModal?: boolean;
    modalProps?: Omit<TimePickerModalProps, 'time' | 'onConfirm' | 'isOpen' | 'onClose'>;
    iconButtonProps?: Omit<Partial<IconButtonProps>, 'onPress'>;
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
        iconButtonProps = {},
        disabled,
        onFocus: onFocusProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { MaskedInput, IconButton, TimePickerModal } = useMolecules();
    const componentStyles = useComponentStyles('TimePickerField', style);

    const [timeString, setTimeString] = useState(() => getFormattedTime({ time, is24Hour }));
    const isBlurredRef = useRef(true);

    const currentTimeFormat = useMemo(() => timeFormat[!is24Hour ? '12' : '24'], [is24Hour]);

    const { state: isOpen, handleOpen: onOpenModal, handleClose: onCloseModal } = useToggle(false);

    const onChangeText = useCallback(
        (text: string) => {
            setTimeString(text);

            if (disabled) return;

            const outputTime = getOutputTime({ time: text || time, is24Hour });
            onTimeChangeProp(outputTime);
        },
        [disabled, is24Hour, onTimeChangeProp, time],
    );

    const onConfirmTime = useCallback(
        (newTime: string) => {
            onCloseModal();

            onTimeChangeProp(newTime);
        },
        [onTimeChangeProp, onCloseModal],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = true;
            onBlurProp?.(e);

            if (disabled) return;

            const outputTime = getOutputTime({ time: timeString || time, is24Hour });
            // onTimeChangeProp(outputTime);

            if (time === outputTime) {
                setTimeString(getFormattedTime({ time, is24Hour }));
            }
        },
        [disabled, is24Hour, onBlurProp, time, timeString],
    );

    const onFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            isBlurredRef.current = false;

            onFocusProp?.(e);
        },
        [onFocusProp],
    );

    const rightElement = useMemo(() => {
        if (!withModal) return null;

        return (
            <>
                <IconButton
                    name="clock-outline"
                    onPress={onOpenModal}
                    disabled={disabled}
                    {...iconButtonProps}
                />
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
        disabled,
        iconButtonProps,
        is24Hour,
        isOpen,
        modalProps,
        onCloseModal,
        onConfirmTime,
        onOpenModal,
        time,
        withModal,
    ]);

    // only change masked string when the input is not focus so as to not interrup the user
    useEffect(() => {
        if (!isBlurredRef.current) return;

        setTimeString(getFormattedTime({ time, is24Hour }));
    }, [is24Hour, time]);

    return (
        <MaskedInput
            ref={ref}
            mask={currentTimeFormat.mask}
            placeholder={currentTimeFormat.format}
            {...rest}
            disabled={disabled}
            value={timeString}
            onFocus={onFocus}
            onChangeText={onChangeText}
            style={componentStyles}
            onBlur={onBlur}
            right={rightElement}
        />
    );
};

export default memo(forwardRef(TimePickerField));
