import { memo, useMemo } from 'react';
import { View } from 'react-native';

import { useComponentStyles } from '../../hooks';
import { DisableWeekDaysType, showWeekDay } from '../DatePickerInput/dateUtils';
import DayName from './DayName';

// TODO make it flexible
export const dayNamesHeight = 44;

// TODO: wait for a better Intl api ;-)
const weekdays = [
    new Date(2020, 7, 2),
    new Date(2020, 7, 3),
    new Date(2020, 7, 4),
    new Date(2020, 7, 5),
    new Date(2020, 7, 6),
    new Date(2020, 7, 7),
    new Date(2020, 7, 8),
];

function DayNames({ disableWeekDays }: { disableWeekDays?: DisableWeekDaysType }) {
    const componentStyles = useComponentStyles('DatePicker_DayName');

    const shortDayNames = useMemo<string[]>(() => {
        const formatter = new Intl.DateTimeFormat('en', {
            weekday: 'narrow',
        });
        return weekdays.map(date => formatter.format(date));
    }, []);

    return (
        <View style={componentStyles?.container} pointerEvents={'none'}>
            {shortDayNames
                .filter((_, dayIndex) => showWeekDay(dayIndex, disableWeekDays))
                .map((dayName, i) => (
                    <DayName key={`${dayName}_${i}`} label={dayName} />
                ))}
        </View>
    );
}

export default memo(DayNames);
