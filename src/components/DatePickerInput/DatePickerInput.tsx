import { useCallback, useState, forwardRef, memo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules } from '../../hooks';
import { useLatest } from '../../utils/dateTimePicker';
import type { DatePickerInputProps } from './types';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';

function DatePickerInput(
    { withModal = true, calendarIcon = 'calendar', locale = 'en', ...rest }: DatePickerInputProps,
    ref: any,
) {
    const { IconButton, DatePickerModal } = useMolecules();
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

    return (
        <DatePickerInputWithoutModal
            ref={ref}
            {...rest}
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
