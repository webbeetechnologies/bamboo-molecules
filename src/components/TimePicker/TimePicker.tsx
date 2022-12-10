import {
    memo,
    Dispatch,
    SetStateAction,
    createContext,
    useState,
    useCallback,
    useMemo,
} from 'react';
import { View, useWindowDimensions } from 'react-native';

import { useComponentStyles } from '../../hooks';
import { format } from '../../utils';
import {
    inputTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    toHourInputFormat,
    toHourOutputFormat,
} from './timeUtils';
import AnalogClock from './AnalogClock';
import TimeInputs from './TimeInputs';

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
    /**
     * hh:mm format
     * */
    time: string;
    onTimeChange: (params: { time: string; focused?: undefined | PossibleClockTypes }) => any;

    is24Hour?: boolean;
    inputType?: PossibleInputTypes;
    focused?: PossibleClockTypes;

    onFocusInput?: (type: PossibleClockTypes) => any;
};

function TimePicker({
    is24Hour = false,
    time,
    onFocusInput = () => {},
    focused = 'hours',
    inputType = 'picker',
    onTimeChange,
}: Props) {
    const dimensions = useWindowDimensions();
    const isLandscape = useMemo(() => dimensions.width > dimensions.height, [dimensions]);
    const { hours, minutes } = useMemo(() => {
        const date = new Date(`10/12/2022 ${time || format(new Date(), 'k:mm')}`); // to validate the time

        return { hours: +format(date, 'k'), minutes: +format(date, 'mm') };
    }, [time]);

    // Initialize display Mode according the hours value
    const [displayMode, setDisplayMode] = useState<'AM' | 'PM' | undefined>(() =>
        !is24Hour ? (hours >= 12 ? 'PM' : 'AM') : undefined,
    );

    const componentStyles = useComponentStyles(
        'TimePicker',
        {},
        {
            states: {
                landScape: isLandscape,
            },
        },
    );

    const onInnerChange = useCallback<onChangeFunc>(
        params => {
            params.hours = toHourOutputFormat(params.hours, hours, is24Hour);

            onTimeChange({ time: `${params.hours}:${params.minutes}`, focused: params.focused });
        },
        [onTimeChange, hours, is24Hour],
    );

    const memoizedValue = useMemo(
        () => ({ mode: displayMode, setMode: setDisplayMode }),
        [displayMode],
    );

    return (
        <DisplayModeContext.Provider value={memoizedValue}>
            <View style={componentStyles.container}>
                <TimeInputs
                    inputType={inputType}
                    hours={hours}
                    minutes={minutes}
                    is24Hour={is24Hour}
                    onChange={onInnerChange}
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
