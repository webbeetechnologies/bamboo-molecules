import { memo, useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import {
    clockTypes,
    getTimeInputTypeIcon,
    inputTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    reverseInputTypes,
} from '../TimePicker/timeUtils';
import type { ModalProps } from '../Modal';
import { format } from '../../utils';

export type Props = ModalProps & {
    is24Hour?: boolean;
    label?: string;
    uppercase?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
    time?: string;
    onConfirm: (time: string) => any;
    animationType?: 'slide' | 'fade' | 'none';
    keyboardIcon?: string;
    clockIcon?: string;
    isLandscape?: boolean;
};

export function TimePickerModal({
    isOpen,
    onClose,
    onConfirm: onConfirmProp,
    time: timeProp,
    label = 'Select time',
    uppercase = false,
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    is24Hour,
    keyboardIcon = 'keyboard-outline',
    clockIcon = 'clock-outline',
    isLandscape = false,
    ...rest
}: Props) {
    const { IconButton, Button, Modal, TimePicker, View, Text } = useMolecules();
    const componentStyles = useComponentStyles('TimePickerModal');

    const [inputType, setInputType] = useState<PossibleInputTypes>(inputTypes.picker);
    const [focused, setFocused] = useState<PossibleClockTypes>(clockTypes.hours);
    const [time, setTime] = useState(timeProp || format(new Date(), 'k:mm'));

    useEffect(() => {
        setTime(time);
    }, [setTime, time]);

    const onFocusInput = useCallback((type: PossibleClockTypes) => setFocused(type), []);

    const onChange = useCallback(
        (params: { focused?: PossibleClockTypes | undefined; time: string }) => {
            if (params.focused) {
                setFocused(params.focused);
            }

            setTime(params.time);
        },
        [setFocused, setTime],
    );

    const onConfirm = useCallback(() => onConfirmProp(time), [onConfirmProp, time]);

    useEffect(() => {
        setTime(timeProp || '');
    }, [timeProp]);

    return (
        <Modal
            {...rest}
            animationType={animationType}
            isOpen={isOpen}
            contentStyle={componentStyles.modalContent}
            onClose={onClose}>
            <KeyboardAvoidingView style={componentStyles.keyboardView} behavior={'padding'}>
                <View style={componentStyles.labelContainer}>
                    <Text style={componentStyles.label}>
                        {uppercase ? label.toUpperCase() : label}
                    </Text>
                </View>
                <View style={componentStyles.timePickerContainer}>
                    <TimePicker
                        is24Hour={is24Hour}
                        inputType={inputType}
                        focused={focused}
                        time={time}
                        onTimeChange={onChange}
                        onFocusInput={onFocusInput}
                        isLandscape={isLandscape}
                    />
                </View>
                <View style={componentStyles.footer}>
                    <IconButton
                        name={getTimeInputTypeIcon(inputType, {
                            keyboard: keyboardIcon,
                            picker: clockIcon,
                        })}
                        onPress={() => setInputType(reverseInputTypes[inputType])}
                        style={componentStyles.inputTypeToggle}
                        accessibilityLabel="toggle keyboard"
                    />
                    <View style={componentStyles.fill} />
                    <Button onPress={onClose}>{cancelLabel}</Button>
                    <Button onPress={onConfirm}>{confirmLabel}</Button>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default memo(TimePickerModal);
