import { useCallback, useState, forwardRef, memo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useLatest } from '../../hooks';
import type { DatePickerInputProps } from './types';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';

function DatePickerInput(
    {
        withModal = true,
        calendarIcon = 'calendar',
        locale = 'en',
        onChange,
        ...rest
    }: DatePickerInputProps,
    ref: any,
) {
    const { IconButton, DatePickerModal } = useMolecules();
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

    return (
        <DatePickerInputWithoutModal
            ref={ref}
            {...rest}
            onChange={onChange}
            locale={locale}
            inputButtons={
                <>
                    {withModal ? (
                        <IconButton
                            style={styles.calendarButton}
                            name={calendarIcon}
                            onPress={() => setVisible(true)}
                        />
                    ) : null}
                </>
            }
            modal={({ value, locale, inputMode, validRange }) => (
                <>
                    {withModal ? (
                        <DatePickerModal
                            onChange={({ date }) => onChange(date)}
                            date={value}
                            mode="single"
                            visible={visible}
                            onDismiss={onDismiss}
                            onConfirm={onInnerConfirm}
                            locale={locale}
                            dateMode={inputMode}
                            validRange={validRange}
                        />
                    ) : null}
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    calendarButton: {
        marginRight: -4,
    },
});

export default memo(forwardRef(DatePickerInput));
