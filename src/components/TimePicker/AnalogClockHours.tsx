import { memo, useContext, useMemo } from 'react';

import { useComponentStyles, useMolecules } from '../../hooks';
import { circleSize } from './timeUtils';
import { DisplayModeContext } from './TimePicker';

function AnalogClockHours({ is24Hour, hours }: { is24Hour: boolean; hours: number }) {
    const { View, Text } = useMolecules();
    const componentStyles = useComponentStyles('TimePicker_ClockHours');
    const { mode } = useContext(DisplayModeContext);

    const outerRange = getHourNumbers(false, circleSize, 12, 12);
    const innerRange = getHourNumbers(true, circleSize, 12, 12);

    const {
        activeTextColor,
        outerHourRootStyle,
        innerHourRootStyle,
        innerHourTextStyle,
        innerHourInner,
        outerHourInner,
        textStyle,
    } = useMemo(() => {
        const {
            activeTextColor: _activeTextColor,
            outerHourRoot,
            outerHourInner: _outerHourInner,
            innerHourRoot,
            innerHourInner: _innerHourInner,
            innerHourText,
        } = componentStyles;

        return {
            activeTextColor: _activeTextColor,
            outerHourRootStyle: (a: number[]) => [
                outerHourRoot,
                {
                    top: a[1] || 0,
                    left: a[0] || 0,
                },
            ],
            innerHourRootStyle: (a: number[]) => [
                innerHourRoot,
                {
                    top: a[1] || 0,
                    left: a[0] || 0,
                },
            ],
            innerHourTextStyle: (i: number) => [
                innerHourText,
                i + 13 === hours || (i + 13 === 24 && hours === 0)
                    ? { color: _activeTextColor }
                    : null,
            ],
            outerHourInner: _outerHourInner,
            innerHourInner: _innerHourInner,
            textStyle: (i: number) => {
                // to make sure hour text is active when 00 is selected in 12 hours mode
                return (!is24Hour && hours === 0 && hours === i - 11) || hours === i + 1
                    ? { color: activeTextColor }
                    : null;
            },
        };
    }, [componentStyles, hours, is24Hour]);

    return (
        <>
            {outerRange.map((a, i) => (
                <View key={i} pointerEvents="none" style={outerHourRootStyle(a)}>
                    <View style={outerHourInner}>
                        {/* Display 00 instead of 12 for AM hours */}
                        <Text style={textStyle(i)} selectable={false}>
                            {mode === 'AM' && !is24Hour && i + 1 === 12 ? '00' : i + 1}
                        </Text>
                    </View>
                </View>
            ))}
            <>
                {is24Hour
                    ? innerRange.map((a, i) => (
                          <View key={i} pointerEvents="none" style={innerHourRootStyle(a)}>
                              <View style={innerHourInner}>
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
