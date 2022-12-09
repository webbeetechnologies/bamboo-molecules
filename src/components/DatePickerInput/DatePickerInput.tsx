import { useCallback, useState, forwardRef, memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useLatest } from '../../hooks';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';
import DatePickerInputModal from './DatePickerInputModal';
import type { DatePickerInputModalParams, DatePickerInputProps } from './types';

function DatePickerInput(
    {
        withModal = true,
        calendarIcon = 'calendar',
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

    const onChangeRef = useLatest(rest.onChange);

    const onInnerConfirm = useCallback(
        ({ date }: any) => {
            setVisible(false);
            onChangeRef.current(date);
        },
        [setVisible, onChangeRef],
    );

    const onPressCalendarIcon = useCallback(() => setVisible(true), []);

    const inputButtons = useMemo(
        () => (
            <>
                {withModal ? (
                    <IconButton
                        style={styles.calendarButton}
                        name={calendarIcon}
                        onPress={onPressCalendarIcon}
                    />
                ) : null}
            </>
        ),
        [IconButton, calendarIcon, onPressCalendarIcon, withModal],
    );

    const renderModalComponent = useCallback(
        ({ value, locale, inputMode, validRange }: DatePickerInputModalParams) => (
            <>
                {withModal ? (
                    <DatePickerInputModal
                        date={value}
                        mode="single"
                        isOpen={visible}
                        onClose={onDismiss}
                        onConfirm={onInnerConfirm}
                        locale={locale}
                        dateMode={inputMode}
                        validRange={validRange}
                    />
                ) : null}
            </>
        ),
        [onDismiss, onInnerConfirm, visible, withModal],
    );

    return (
        <DatePickerInputWithoutModal
            ref={ref}
            {...rest}
            // locale={locale}
            inputButtons={inputButtons}
            modal={renderModalComponent}
        />
    );
}

const styles = StyleSheet.create({
    calendarButton: {
        marginRight: -4,
    },
});

export default memo(forwardRef(DatePickerInput));
