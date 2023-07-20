import { useCallback, useState, forwardRef, memo, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useLatest, useToggle } from '../../hooks';
import { noop } from '../../utils';
import DatePickerInputWithoutModal from './DatePickerInputWithoutModal';
import DatePickerInputModal from './DatePickerInputModal';
import type { DatePickerInputProps } from './types';
import { DatePickerDocked } from '../DatePickerDocked';

function DatePickerInput(
    {
        withModal = true,
        calendarIcon = 'calendar',
        value,
        locale,
        inputMode,
        validRange,
        onChange = noop,
        disabled = false,
        pickerMode,
        startYear,
        endYear,
        //locale = 'en',
        ...rest
    }: DatePickerInputProps,
    ref: any,
) {
    const { IconButton } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle } = useToggle(false);
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

    const onPressCalendarIcon = useCallback(() => {
        if (pickerMode === 'popover') {
            onToggle();
        }
        setVisible(true);
    }, [pickerMode, onToggle]);

    const rightElement = useMemo(
        () => (
            <>
                {withModal ? (
                    <>
                        <IconButton
                            style={styles.calendarButton}
                            name={calendarIcon}
                            onPress={onPressCalendarIcon}
                            disabled={disabled}
                        />
                        {pickerMode === 'modal' ? (
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
                        ) : (
                            <DatePickerDocked
                                date={value}
                                locale={locale}
                                startYear={startYear}
                                endYear={endYear}
                                onChange={onInnerConfirm}
                                isOpen={isOpen}
                                onToggle={onToggle}
                                triggerRef={triggerRef}
                            />
                        )}
                    </>
                ) : null}
            </>
        ),
        [
            IconButton,
            calendarIcon,
            disabled,
            endYear,
            isOpen,
            locale,
            onDismiss,
            onInnerConfirm,
            onPressCalendarIcon,
            onToggle,
            pickerMode,
            startYear,
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
            disabled={disabled}
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
