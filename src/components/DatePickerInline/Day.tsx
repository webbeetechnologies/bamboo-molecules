import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import DayRange from './DayRange';

function EmptyDayPure() {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_DayEmpty');

    return <View style={componentStyles} />;
}
export const EmptyDay = memo(EmptyDayPure);

function Day(props: {
    day: number;
    month: number;
    year: number;
    selected: boolean;
    inRange: boolean;
    leftCrop: boolean;
    rightCrop: boolean;
    isToday: boolean;
    disabled: boolean;
    onPressDate: (date: Date) => any;
}) {
    const {
        day,
        month,
        year,
        selected,
        inRange,
        leftCrop,
        rightCrop,
        onPressDate,
        isToday,
        disabled,
    } = props;
    // console.log(month, { day })
    const { TouchableRipple, Text, View } = useMolecules();
    const dayStyles = useComponentStyles(
        'DatePicker_Day',
        {},
        {
            states: {
                disabled,
                selected,
                inRange,
                today: isToday,
            },
        },
    );
    const onPress = useCallback(() => {
        onPressDate(new Date(year, month, day));
    }, [onPressDate, year, month, day]);

    const { containerStyle, buttonStyle, dayStyle, textStyle } = useMemo(() => {
        const {
            containerStyle: _containerStyle,
            button,
            day: _dayStyle,
            today: todayStyle,
            text,
        } = dayStyles;

        return {
            containerStyle: _containerStyle,
            buttonStyle: button,
            dayStyle: [_dayStyle, isToday ? todayStyle : null] as ViewStyle,
            textStyle: text,
        };
    }, [dayStyles, isToday]);

    return (
        <View style={containerStyle}>
            <DayRange inRange={inRange} leftCrop={leftCrop} rightCrop={rightCrop} />

            <TouchableRipple
                testID={`day-${year}-${month}-${day}`}
                disabled={disabled}
                borderless={true}
                onPress={disabled ? undefined : onPress}
                style={buttonStyle}
                accessibilityRole="button">
                <View style={dayStyle}>
                    <Text style={textStyle} selectable={false}>
                        {day}
                    </Text>
                </View>
            </TouchableRipple>
        </View>
    );
}

export default memo(Day);
