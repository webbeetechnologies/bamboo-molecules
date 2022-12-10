// @typescript-eslint/no-unused-vars
// WORK IN PROGRESS

import { memo, useCallback, useMemo, useRef } from 'react';
import { View, useWindowDimensions, TextInput as TextInputNative } from 'react-native';
import { useComponentStyles, useLatest } from '../../hooks';

import {
    clockTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    toHourInputFormat,
    toHourOutputFormat,
} from './timeUtils';
import TimeInput from './TimeInput';
import AmPmSwitcher from './AmPmSwitcher';

type Props = {
    inputType: PossibleInputTypes;
    focused: PossibleClockTypes;
    hours: number;
    minutes: number;
    onFocusInput: (type: PossibleClockTypes) => any;
    onChange: (hoursMinutesAndFocused: {
        hours: number;
        minutes: number;
        focused?: undefined | PossibleClockTypes;
    }) => any;
    is24Hour: boolean;
};

function TimeInputs({
    hours,
    minutes,
    onFocusInput,
    focused,
    inputType,
    onChange,
    is24Hour,
}: Props) {
    const dimensions = useWindowDimensions();
    const isLandscape = useMemo(
        () => dimensions.width > dimensions.height,
        [dimensions.height, dimensions.width],
    );

    const componentStyles = useComponentStyles(
        'TimePicker_Inputs',
        {},
        {
            states: {
                landScape: isLandscape,
            },
        },
    );

    const startInput = useRef<TextInputNative | null>(null);
    const endInput = useRef<TextInputNative | null>(null);

    const onSubmitStartInput = useCallback(() => {
        if (endInput.current) {
            endInput.current.focus();
        }
    }, [endInput]);

    const onSubmitEndInput = useCallback(() => {
        // TODO: close modal and persist time
    }, []);

    const minutesRef = useLatest(minutes);
    const onChangeHours = useCallback(
        (newHours: number) => {
            onChange({
                hours: newHours,
                minutes: minutesRef.current,
                focused: clockTypes.hours,
            });
        },
        [onChange, minutesRef],
    );

    const onHourChange = useCallback(
        (newHoursFromInput: number) => {
            let newHours = toHourOutputFormat(newHoursFromInput, hours, is24Hour);
            if (newHoursFromInput > 24) {
                newHours = 24;
            }
            onChange({
                hours: newHours,
                minutes,
            });
        },
        [hours, is24Hour, minutes, onChange],
    );

    const onMinuteChange = useCallback(
        (newMinutesFromInput: number) => {
            let newMinutes = newMinutesFromInput;
            if (newMinutesFromInput > 59) {
                newMinutes = 59;
            }
            onChange({
                hours,
                minutes: newMinutes,
            });
        },
        [hours, onChange],
    );

    return (
        <View style={componentStyles.inputContainer}>
            <TimeInput
                ref={startInput}
                placeholder={'00'}
                value={toHourInputFormat(hours, is24Hour)}
                clockType={clockTypes.hours}
                pressed={focused === clockTypes.hours}
                onPress={onFocusInput}
                inputType={inputType}
                returnKeyType={'next'}
                onSubmitEditing={onSubmitStartInput}
                blurOnSubmit={false}
                onChanged={onHourChange}
                // onChangeText={onChangeStartInput}
            />
            <View style={componentStyles.hoursAndMinutesSeparator}>
                <View style={componentStyles.spaceDot} />
                <View style={componentStyles.dot} />
                <View style={componentStyles.betweenDot} />
                <View style={componentStyles.dot} />
                <View style={componentStyles.spaceDot} />
            </View>
            <TimeInput
                ref={endInput}
                placeholder={'00'}
                value={minutes}
                clockType={clockTypes.minutes}
                pressed={focused === clockTypes.minutes}
                onPress={onFocusInput}
                inputType={inputType}
                onSubmitEditing={onSubmitEndInput}
                onChanged={onMinuteChange}
            />
            {!is24Hour && (
                <>
                    <View style={componentStyles.spaceBetweenInputsAndSwitcher} />
                    <AmPmSwitcher hours={hours} onChange={onChangeHours} />
                </>
            )}
        </View>
    );
}

export default memo(TimeInputs);
