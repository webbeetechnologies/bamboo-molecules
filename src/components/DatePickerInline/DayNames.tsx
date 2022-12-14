import { memo } from 'react';

import { useMolecules, useComponentStyles } from '../../hooks';
import { format, startOfWeek, addDays } from '../../utils';
import { DisableWeekDaysType, showWeekDay } from './dateUtils';
import DayName from './DayName';

// TODO make it flexible
export const dayNamesHeight = 44;

const shortDayNames = (() => {
    const firstDOW = startOfWeek(new Date());
    return Array.from(Array(7)).map((_, i) => format(addDays(firstDOW, i), 'EEEEE'));
})();

function DayNames({
    disableWeekDays,
}: // locale,
{
    disableWeekDays?: DisableWeekDaysType;
    locale?: string;
}) {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_DayName');

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
