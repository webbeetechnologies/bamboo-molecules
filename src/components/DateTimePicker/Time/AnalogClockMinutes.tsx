import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules } from '../../../hooks';
import { circleSize } from './timeUtils';
import { useTextColorOnPrimary } from '../utils';

function AnalogClockMinutes({ minutes }: { minutes: number }) {
    const { Text, View } = useMolecules();
    const range = getMinuteNumbers(circleSize, 12);
    const color = useTextColorOnPrimary();

    const { outerHourRootStyle } = useMemo(() => {
        return {
            outerHourRootStyle: (a: number[]) => [
                styles.outerHourRoot,
                {
                    top: a[1] || 0,
                    left: a[0] || 0,
                },
            ],
        };
    }, []);

    return (
        <>
            {range.map((a, i) => {
                const currentMinutes = i * 5;
                const isZero = currentMinutes === 0;
                let isCurrent = currentMinutes - 1 <= minutes && currentMinutes + 1 >= minutes;
                if (isZero) {
                    isCurrent = minutes >= 59 || currentMinutes + 1 >= minutes;
                }
                return (
                    <View key={i} pointerEvents="none" style={outerHourRootStyle(a)}>
                        <View style={styles.outerHourInner}>
                            <Text style={isCurrent ? { color } : undefined} selectable={false}>
                                {isZero ? '00' : currentMinutes}
                            </Text>
                        </View>
                    </View>
                );
            })}
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
    textWhite: { color: '#fff' },
});

function getMinuteNumbers(size: number, count: number) {
    let angle = 0;
    const step = (2 * Math.PI) / count;
    const radius = size / 2.5;

    angle = angle = (-90 * Math.PI) / 180;

    return Array(12)
        .fill(true)
        .map(() => {
            const x = Math.round(size / 2 + radius * Math.cos(angle));
            const y = Math.round(size / 2 + radius * Math.sin(angle));
            angle += step;
            return [x, y];
        });
}

export default memo(AnalogClockMinutes);
