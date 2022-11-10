import { memo, useContext, useRef, useCallback, useMemo } from 'react';
import { GestureResponderEvent, PanResponder, StyleSheet, View } from 'react-native';

import { useComponentStyles, useLatest } from '../../hooks';
import {
    circleSize,
    clockTypes,
    getAngle,
    getHours,
    getHourType,
    getHourTypeFromOffset,
    getMinutes,
    hourTypes,
    PossibleClockTypes,
} from './timeUtils';
import AnalogClockHours from './AnalogClockHours';
import AnimatedClockSwitcher from './AnimatedClockSwitcher';
import AnalogClockMinutes from './AnalogClockMinutes';
import { DisplayModeContext } from './TimePicker';

function AnalogClock({
    hours,
    minutes,
    focused,
    is24Hour,
    onChange,
}: {
    hours: number;
    minutes: number;
    focused: PossibleClockTypes;
    is24Hour: boolean;
    onChange: (hoursMinutesAndFocused: {
        hours: number;
        minutes: number;
        focused?: undefined | PossibleClockTypes;
    }) => any;
}) {
    const componentStyles = useComponentStyles('TimePicker_Clock');
    const { mode } = useContext(DisplayModeContext);
    // used to make pointer shorter if hours are selected and above 12
    const shortPointer = (hours === 0 || hours > 12) && is24Hour;
    const clockRef = useRef<View | null>(null);
    // Hooks are nice, sometimes... :-)..
    // We need the latest values, since the onPointerMove uses a closure to the function
    const hoursRef = useLatest(hours);
    const onChangeRef = useLatest(onChange);
    const minutesRef = useLatest(minutes);
    const focusedRef = useLatest(focused);
    const is24HourRef = useLatest(is24Hour);
    const modeRef = useLatest(mode);

    const onPointerMove = useCallback(
        (e: GestureResponderEvent, final: boolean) => {
            const x = e.nativeEvent.locationX;
            const y = e.nativeEvent.locationY;
            const angle = getAngle(x, y, circleSize);

            if (focusedRef.current === clockTypes.hours) {
                const hours24 = is24HourRef.current;
                const previousHourType = getHourType(hoursRef.current);
                let pickedHours = getHours(angle, previousHourType);

                const hours12AndPm = !hours24 && modeRef.current === 'AM';

                const hourTypeFromOffset = getHourTypeFromOffset(x, y, circleSize);
                const hours24AndPM = hours24 && hourTypeFromOffset === hourTypes.pm;

                // Avoiding the "24h"
                // Should be 12h for 12 hours and PM mode

                if (hours12AndPm || hours24AndPM) {
                    pickedHours += 12;
                }
                if (modeRef.current === 'AM' && pickedHours === 12) {
                    pickedHours = 0;
                }

                if (
                    (!hours24 && modeRef.current === 'AM' && pickedHours === 12) ||
                    pickedHours === 24
                ) {
                    pickedHours = 0;
                }

                if (hoursRef.current !== pickedHours || final) {
                    onChangeRef.current({
                        hours: pickedHours,
                        minutes: minutesRef.current,
                        focused: final ? clockTypes.minutes : undefined,
                    });
                }
            } else if (focusedRef.current === clockTypes.minutes) {
                const pickedMinutes = getMinutes(angle);
                if (minutesRef.current !== pickedMinutes) {
                    onChangeRef.current({
                        hours: hoursRef.current,
                        minutes: pickedMinutes,
                    });
                }
            }
        },
        [focusedRef, is24HourRef, hoursRef, onChangeRef, minutesRef, modeRef],
    );
    const panResponder = useRef(
        PanResponder.create({
            onPanResponderGrant: e => onPointerMove(e, false),
            onPanResponderMove: e => onPointerMove(e, false),
            onPanResponderRelease: e => onPointerMove(e, true),
            onStartShouldSetPanResponder: returnTrue,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: returnTrue,
            onMoveShouldSetPanResponderCapture: returnTrue,
            onPanResponderTerminationRequest: returnTrue,
            onShouldBlockNativeResponder: returnTrue,
        }),
    ).current;

    const { clockStyle, lineStyle, endPointStyle, middlePointContainerStyle, middlePointStyle } =
        useMemo(() => {
            const { clock, endPoint, center, line, middlePoint } = componentStyles;
            const dynamicSize = focused === clockTypes.hours && shortPointer ? 33 : 0;
            const pointerNumber = focused === clockTypes.hours ? hours : minutes;
            const degreesPerNumber = focused === clockTypes.hours ? 30 : 6;

            return {
                clockStyle: clock,
                lineStyle: [
                    line,
                    {
                        transform: [
                            { rotate: -90 + pointerNumber * degreesPerNumber + 'deg' },
                            {
                                translateX: circleSize / 4 - 4 - dynamicSize / 2,
                            },
                        ],
                        width: circleSize / 2 - 4 - dynamicSize,
                    },
                ],
                endPointStyle: endPoint,
                middlePointContainerStyle: [StyleSheet.absoluteFill, center],
                middlePointStyle: middlePoint,
            };
        }, [componentStyles, focused, hours, minutes, shortPointer]);

    return (
        <View
            ref={clockRef}
            {...panResponder.panHandlers}
            style={clockStyle}
            // @ts-ignore -> https://github.com/necolas/react-native-web/issues/506
            cursor={'pointer'}>
            <View style={lineStyle} pointerEvents="none">
                <View style={endPointStyle} />
            </View>
            <View style={middlePointContainerStyle} pointerEvents="none">
                <View style={middlePointStyle} />
            </View>
            <AnimatedClockSwitcher
                focused={focused}
                hours={<AnalogClockHours is24Hour={is24Hour} hours={hours} />}
                minutes={<AnalogClockMinutes minutes={minutes} />}
            />
        </View>
    );
}

function returnTrue() {
    return true;
}
export default memo(AnalogClock);
