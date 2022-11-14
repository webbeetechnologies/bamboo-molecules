import {
    memo,
    Dispatch,
    SetStateAction,
    createContext,
    useMemo,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { View, useWindowDimensions } from 'react-native';

import {
    inputTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    toHourInputFormat,
    toHourOutputFormat,
} from './timeUtils';

import AnalogClock from './AnalogClock';
import TimeInputs from './TimeInputs';
import { useComponentStyles } from '../../hooks';

export const DisplayModeContext = createContext<{
    mode: 'AM' | 'PM' | undefined;
    setMode: Dispatch<SetStateAction<'AM' | 'PM' | undefined>>;
}>({ mode: 'AM', setMode: () => {} });

type onChangeFunc = ({
    hours,
    minutes,
    focused,
}: {
    hours: number;
    minutes: number;
    focused?: undefined | PossibleClockTypes;
}) => any;

export type Props = {
    locale?: undefined | string;
    inputType: PossibleInputTypes;
    focused: PossibleClockTypes;
    hours: number;
    minutes: number;
    onFocusInput: (type: PossibleClockTypes) => any;
    onChange: onChangeFunc;
};

function TimePicker({ hours, minutes, onFocusInput, focused, inputType, onChange, locale }: Props) {
    const dimensions = useWindowDimensions();
    const isLandscape = dimensions.width > dimensions.height;

    const componentStyles = useComponentStyles(
        'TimePicker',
        {},
        {
            states: {
                landScape: isLandscape,
            },
        },
    );

    const [displayMode, setDisplayMode] = useState<'AM' | 'PM' | undefined>(undefined);

    // method to check whether we have 24 hours in clock or 12
    const is24Hour = useMemo(() => {
        const formatter = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });
        const formatted = formatter.format(new Date(Date.UTC(2020, 1, 1, 23)));
        return formatted.includes('23');
    }, [locale]);

    // Initialize display Mode according the hours value
    useEffect(() => {
        if (hours >= 12) {
            setDisplayMode('PM');
        } else {
            setDisplayMode('AM');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onInnerChange = useCallback<onChangeFunc>(
        params => {
            params.hours = toHourOutputFormat(params.hours, hours, is24Hour);
            onChange(params);
        },
        [onChange, hours, is24Hour],
    );

    return (
        <DisplayModeContext.Provider value={{ mode: displayMode, setMode: setDisplayMode }}>
            <View style={componentStyles.container}>
                <TimeInputs
                    inputType={inputType}
                    hours={hours}
                    minutes={minutes}
                    is24Hour={is24Hour}
                    onChange={onChange}
                    onFocusInput={onFocusInput}
                    focused={focused}
                />
                <>
                    {inputType === inputTypes.picker ? (
                        <View style={componentStyles.clockContainer}>
                            <AnalogClock
                                hours={toHourInputFormat(hours, is24Hour)}
                                minutes={minutes}
                                focused={focused}
                                is24Hour={is24Hour}
                                onChange={onInnerChange}
                            />
                        </View>
                    ) : null}
                </>
            </View>
        </DisplayModeContext.Provider>
    );
}

export default memo(TimePicker);
