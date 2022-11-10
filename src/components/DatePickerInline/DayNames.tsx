import { memo, useMemo } from 'react';

import { useMolecules, useComponentStyles } from '../../hooks';
import { DisableWeekDaysType, showWeekDay } from './dateUtils';
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

function DayNames({
    disableWeekDays,
    locale,
}: {
    disableWeekDays?: DisableWeekDaysType;
    locale?: string;
}) {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_DayName');

    const shortDayNames = useMemo<string[]>(() => {
        const formatter = new Intl.DateTimeFormat(locale, {
            weekday: 'narrow',
        });
        return weekdays.map(date => formatter.format(date));
    }, [locale]);

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
