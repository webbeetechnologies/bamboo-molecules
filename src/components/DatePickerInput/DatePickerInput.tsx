import { useCallback, useState, forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useLatest } from '../../hooks';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';
import DatePickerInputModal from './DatePickerInputModal';
import type { DatePickerInputProps } from './types';

function DatePickerInput(
    {
        withModal = true,
        calendarIcon = 'calendar',
        value,
        locale,
        inputMode,
        validRange,
        onChange = () => {},
        //locale = 'en',
        ...rest
    }: DatePickerInputProps,
    ref: any,
) {
    const { IconButton } = useMolecules();
    const [visible, setVisible] = useState<boolean>(false);

    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const onChangeRef = useLatest(onChange);

    const onInnerConfirm = useCallback(
        ({ date }: any) => {
            setVisible(false);
            onChangeRef.current(date);
        },
        [setVisible, onChangeRef],
    );

    const onPressCalendarIcon = useCallback(() => setVisible(true), []);

    const rightElement = useMemo(
        () => (
            <>
                {withModal ? (
                    <>
                        <IconButton
                            style={styles.calendarButton}
                            name={calendarIcon}
                            onPress={onPressCalendarIcon}
                        />

                        <DatePickerInputModal
                            date={value}
                            mode="single"
                            isOpen={visible}
                            onClose={onDismiss}
                            onConfirm={onInnerConfirm}
                            locale={locale}
                            // dateMode={inputMode}
                            validRange={validRange}
                        />
                    </>
                ) : null}
            </>
        ),
        [
            IconButton,
            calendarIcon,
            locale,
            onDismiss,
            onInnerConfirm,
            onPressCalendarIcon,
            validRange,
            value,
            visible,
            withModal,
        ],
    );

    return (
        <DatePickerInputWithoutModal
            ref={ref}
            {...rest}
            value={value}
            inputMode={inputMode}
            validRange={validRange}
            onChange={onChange}
            // locale={locale}
            inputButtons={rightElement}
        />
    );
}

const styles = StyleSheet.create({
    calendarButton: {
        marginRight: -4,
    },
});

export default memo(forwardRef(DatePickerInput));
