import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

import { useCurrentTheme, useMolecules } from '../../../hooks';
import overlay from '../../../styles/overlay';
import TimePicker from './TimePicker';
import {
    clockTypes,
    getTimeInputTypeIcon,
    inputTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    reverseInputTypes,
} from './timeUtils';

const supportedOrientations: any[] = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];

export type Props = {
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
    uppercase = true,
    cancelLabel = 'Cancel',
    confirmLabel = 'Ok',
    animationType = 'none',
    locale,
    keyboardIcon = 'keyboard-outline',
    clockIcon = 'clock-outline',
}: Props) {
    const theme = useCurrentTheme();
    const { IconButton, Button } = useMolecules();

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

    const { modalBackgroundStyle, modalRootStyle, modalContentStyle } = useMemo(() => {
        return {
            modalBackgroundStyle: [
                StyleSheet.absoluteFill,
                styles.modalBackground,
                { backgroundColor: theme.colors.backdrop },
            ],
            modalRootStyle: [StyleSheet.absoluteFill, styles.modalRoot],
            modalContentStyle: [
                styles.modalContent,
                {
                    backgroundColor: theme.dark
                        ? overlay(10, theme.colors.surface)
                        : theme.colors.surface,
                    borderRadius: theme.roundness['1'] as number,
                },
            ],
        };
    }, [theme.colors.backdrop, theme.colors.surface, theme.dark, theme.roundness]);

    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
            presentationStyle="overFullScreen"
            supportedOrientations={supportedOrientations}
            //@ts-ignore
            statusBarTranslucent={true}>
            <>
                <TouchableWithoutFeedback onPress={onDismiss}>
                    <View style={modalBackgroundStyle} />
                </TouchableWithoutFeedback>

                <View style={modalRootStyle} pointerEvents="box-none">
                    <KeyboardAvoidingView style={styles.keyboardView} behavior={'padding'}>
                        <Animated.View style={modalContentStyle}>
                            <View style={styles.labelContainer}>
                                <Text style={[styles.label, { color: theme.colors.onSurface }]}>
                                    {uppercase ? label.toUpperCase() : label}
                                </Text>
                            </View>
                            <View style={styles.timePickerContainer}>
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
                            <View style={styles.bottom}>
                                <IconButton
                                    name={getTimeInputTypeIcon(inputType, {
                                        keyboard: keyboardIcon,
                                        picker: clockIcon,
                                    })}
                                    onPress={() => setInputType(reverseInputTypes[inputType])}
                                    style={styles.inputTypeToggle}
                                    accessibilityLabel="toggle keyboard"
                                />
                                <View style={styles.fill} />
                                <Button onPress={onDismiss} uppercase={uppercase}>
                                    {cancelLabel}
                                </Button>
                                <Button
                                    onPress={() =>
                                        onConfirm({ hours: localHours, minutes: localMinutes })
                                    }
                                    uppercase={uppercase}>
                                    {confirmLabel}
                                </Button>
                            </View>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </View>
            </>
        </Modal>
    );
}

function getMinutes(minutes: number | undefined | null): number {
    return minutes === undefined || minutes === null ? new Date().getMinutes() : minutes;
}
function getHours(hours: number | undefined | null): number {
    return hours === undefined || hours === null ? new Date().getHours() : hours;
}

const styles = StyleSheet.create({
    modalRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    keyboardView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalBackground: {
        flex: 1,
    },
    modalContent: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        minWidth: 287,
    },
    labelContainer: {
        height: 28,
        justifyContent: 'flex-end',
        paddingLeft: 24,
        paddingRight: 24,
    },
    label: {
        letterSpacing: 1,
        fontSize: 13,
    },
    timePickerContainer: { padding: 24 },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    inputTypeToggle: { margin: 4 },
    fill: { flex: 1 },
});

export default memo(TimePickerModal);
