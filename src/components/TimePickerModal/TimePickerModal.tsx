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

export type Props = ModalProps & {
    locale?: undefined | string;
    label?: string;
    uppercase?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
    hours?: number | undefined;
    minutes?: number | undefined;
    visible: boolean | undefined;
    onDismiss: () => any;
    onConfirm: (hoursAndMinutes: { hours: number; minutes: number }) => any;
    animationType?: 'slide' | 'fade' | 'none';
    keyboardIcon?: string;
    clockIcon?: string;
};

export function TimePickerModal({
    visible,
    onDismiss,
    onConfirm,
    hours,
    minutes,
    label = 'Select time',
    uppercase = false,
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    locale,
    keyboardIcon = 'keyboard-outline',
    clockIcon = 'clock-outline',
    ...rest
}: Props) {
    const { IconButton, Button, Modal, TimePicker, View, Text } = useMolecules();
    const componentStyles = useComponentStyles('TimePickerModal');

    const [inputType, setInputType] = useState<PossibleInputTypes>(inputTypes.picker);
    const [focused, setFocused] = useState<PossibleClockTypes>(clockTypes.hours);
    const [localHours, setLocalHours] = useState<number>(getHours(hours));
    const [localMinutes, setLocalMinutes] = useState<number>(getMinutes(minutes));

    useEffect(() => {
        setLocalHours(getHours(hours));
    }, [setLocalHours, hours]);

    useEffect(() => {
        setLocalMinutes(getMinutes(minutes));
    }, [setLocalMinutes, minutes]);

    const onFocusInput = useCallback((type: PossibleClockTypes) => setFocused(type), []);
    const onChange = useCallback(
        (params: { focused?: PossibleClockTypes | undefined; hours: number; minutes: number }) => {
            if (params.focused) {
                setFocused(params.focused);
            }

            setLocalHours(params.hours);
            setLocalMinutes(params.minutes);
        },
        [setFocused, setLocalHours, setLocalMinutes],
    );

    return (
        <Modal
            animationType={animationType}
            visible={visible}
            contentStyle={componentStyles.modalContent}
            onClose={onDismiss}
            {...rest}>
            <KeyboardAvoidingView style={componentStyles.keyboardView} behavior={'padding'}>
                <View style={componentStyles.labelContainer}>
                    <Text style={componentStyles.label}>
                        {uppercase ? label.toUpperCase() : label}
                    </Text>
                </View>
                <View style={componentStyles.timePickerContainer}>
                    <TimePicker
                        locale={locale}
                        inputType={inputType}
                        focused={focused}
                        hours={localHours}
                        minutes={localMinutes}
                        onChange={onChange}
                        onFocusInput={onFocusInput}
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
                    <Button onPress={onDismiss}>{cancelLabel}</Button>
                    <Button
                        onPress={() => onConfirm({ hours: localHours, minutes: localMinutes })}
                        uppercase={uppercase}>
                        {confirmLabel}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

function getMinutes(minutes: number | undefined | null): number {
    return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}
function getHours(hours: number | undefined | null): number {
    return hours === undefined || hours === null ? new Date().getHours() : hours;
}

export default memo(TimePickerModal);
