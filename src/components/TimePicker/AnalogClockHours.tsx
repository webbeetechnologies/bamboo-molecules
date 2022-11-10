import { memo, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules } from '../../hooks';
import { useTextColorOnPrimary } from '../../utils/dateTimePicker';
import { circleSize } from './timeUtils';
import { DisplayModeContext } from './TimePicker';

function AnalogClockHours({ is24Hour, hours }: { is24Hour: boolean; hours: number }) {
    const { View, Text } = useMolecules();
    const { mode } = useContext(DisplayModeContext);

    const outerRange = getHourNumbers(false, circleSize, 12, 12);
    const innerRange = getHourNumbers(true, circleSize, 12, 12);

    const color = useTextColorOnPrimary();

    const { outerHourRootStyle, innerHourRootStyle, innerHourTextStyle } = useMemo(() => {
        return {
            outerHourRootStyle: (a: number[]) => [
                styles.outerHourRoot,
                {
                    top: a[1] || 0,
                    left: a[0] || 0,
                },
            ],
            innerHourRootStyle: (a: number[]) => [
                styles.innerHourRoot,
                {
                    top: a[1] || 0,
                    left: a[0] || 0,
                },
            ],
            innerHourTextStyle: (i: number) => [
                styles.innerHourText,
                i + 13 === hours || (i + 13 === 24 && hours === 0) ? { color } : null,
            ],
        };
    }, [color, hours]);

    return (
        <>
            {outerRange.map((a, i) => (
                <View key={i} pointerEvents="none" style={outerHourRootStyle(a)}>
                    <View style={styles.outerHourInner}>
                        {/* Display 00 instead of 12 for AM hours */}
                        <Text style={hours === i + 1 ? { color } : null} selectable={false}>
                            {mode === 'AM' && !is24Hour && i + 1 === 12 ? '00' : i + 1}
                        </Text>
                    </View>
                </View>
            ))}
            <>
                {is24Hour
                    ? innerRange.map((a, i) => (
                          <View key={i} pointerEvents="none" style={innerHourRootStyle(a)}>
                              <View style={styles.innerHourInner}>
                                  <Text selectable={false} style={innerHourTextStyle(i)}>
                                      {i + 13 === 24 ? '00' : i + 13}
                                  </Text>
                              </View>
                          </View>
                      ))
                    : null}
            </>
        </>
    );
}

const styles = StyleSheet.create({
    outerHourRoot: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        width: 50,
        height: 50,
        marginLeft: -25,
        marginTop: -25,

        borderRadius: 25,
    },
    outerHourInner: { borderRadius: 25 },
    innerHourRoot: {
        position: 'absolute',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -20,
        borderRadius: 20,
    },
    innerHourInner: { borderRadius: 20 },
    innerHourText: { fontSize: 13 },
});

function getHourNumbers(is24Hour: boolean, size: number, count: number, arrayLength: number) {
    let angle = 0;
    const step = (2 * Math.PI) / count;
    const radius = size / (is24Hour ? 4 : 2.5);

    angle = (-90 * Math.PI) / 180 + Math.PI / 6;

    return Array(arrayLength)
        .fill(true)
        .map(() => {
            const x = Math.round(size / 2 + radius * Math.cos(angle));
            const y = Math.round(size / 2 + radius * Math.sin(angle));
            angle += step;
            return [x, y];
        });
}

export default memo(AnalogClockHours);
