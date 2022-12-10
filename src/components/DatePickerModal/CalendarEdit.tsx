import { memo, useRef, useEffect, useCallback } from 'react';
import { View, TextInput as TextInputNative, Keyboard } from 'react-native';

import type { ModeType, ValidRangeType } from '../DatePickerInline';
import type { LocalState } from './types';

import DatePickerInputWithoutModal from '../DatePickerInput/DatePickerInputWithoutModal';
import { useComponentStyles } from '../../hooks';

type Props = {
    mode: ModeType;
    label?: string;
    startLabel?: string;
    endLabel?: string;
    state: LocalState;
    collapsed: boolean;
    onChange: (s: LocalState) => any;
    validRange: ValidRangeType | undefined;
    // locale: string;
};

function CalendarEdit({
    mode,
    state,
    label = '',
    startLabel = 'Start',
    endLabel = 'End',
    collapsed,
    onChange,
    validRange,
}: // locale,
Props) {
    const componentStyles = useComponentStyles('DatePickerModal_Edit');

    const dateInput = useRef<TextInputNative | null>(null);
    const startInput = useRef<TextInputNative | null>(null);
    const endInput = useRef<TextInputNative | null>(null);

    // when switching views focus, or un-focus text input
    useEffect(() => {
        // hide open keyboard
        if (collapsed) {
            Keyboard.dismiss();
        }

        const inputsToFocus = [dateInput.current, startInput.current].filter(
            n => n,
        ) as TextInputNative[];

        const inputsToBlur = [dateInput.current, startInput.current, endInput.current].filter(
            n => n,
        ) as TextInputNative[];

        if (collapsed) {
            inputsToBlur.forEach(ip => ip.blur());
        } else {
            inputsToFocus.forEach(ip => ip.focus());
        }
    }, [mode, startInput, endInput, dateInput, collapsed]);

    const onSubmitStartInput = useCallback(() => {
        if (endInput.current) {
            endInput.current.focus();
        }
    }, [endInput]);

    const onSubmitEndInput = useCallback(() => {
        // TODO: close modal and persist range
    }, []);

    const onSubmitInput = useCallback(() => {
        // TODO: close modal and persist range
    }, []);

    const onSingleInputChange = useCallback(
        (date: Date | undefined) => onChange({ ...state, date }),
        [onChange, state],
    );

    const onStartDateChange = useCallback(
        (startDate: Date | undefined) => onChange({ ...state, startDate }),
        [onChange, state],
    );

    const onEndDateChange = useCallback(
        (endDate: Date | undefined) => onChange({ ...state, endDate }),
        [onChange, state],
    );

    return (
        <View style={componentStyles.container}>
            <>
                {mode === 'single' ? (
                    <DatePickerInputWithoutModal
                        inputMode="start"
                        ref={dateInput}
                        label={label}
                        value={state.date}
                        onChange={onSingleInputChange}
                        onSubmitEditing={onSubmitInput}
                        validRange={validRange}
                        // locale={locale}
                        autoComplete={'off'}
                    />
                ) : null}
            </>

            <>
                {mode === 'range' ? (
                    <View style={componentStyles.inner}>
                        <DatePickerInputWithoutModal
                            inputMode="start"
                            ref={startInput}
                            label={startLabel}
                            value={state.startDate}
                            onChange={onStartDateChange}
                            returnKeyType={'next'}
                            onSubmitEditing={onSubmitStartInput}
                            validRange={validRange}
                            // locale={locale}
                            autoComplete={'off'}
                        />
                        <View style={componentStyles.separator} />
                        <DatePickerInputWithoutModal
                            inputMode="end"
                            ref={endInput}
                            label={endLabel}
                            value={state.endDate}
                            onChange={onEndDateChange}
                            onSubmitEditing={onSubmitEndInput}
                            validRange={validRange}
                            // locale={locale}
                            autoComplete="off"
                        />
                    </View>
                ) : null}
            </>
        </View>
    );
}

export default memo(CalendarEdit);
