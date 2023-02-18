import { memo, useState, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useLatest, useMolecules } from '../../hooks';
import { areDatesOnSameDay, dateToUnix, getEndOfDay, getInitialIndex } from './dateUtils';
import Swiper from './Swiper';
import Month from './Month';
import CalendarHeader from './DatePickerInlineHeader';
import YearPicker from './YearPicker';
import type {
    DatePickerInlineBaseProps,
    SingleChange,
    CalendarDate,
    RangeChange,
    MultiChange,
    CalendarDates,
} from './types';

function DatePickerInlineBase(props: DatePickerInlineBaseProps) {
    const {
        locale = 'en',
        mode = 'single',
        onChange,
        startDate,
        endDate,
        date,
        disableWeekDays,
        startYear,
        endYear,
        dates,
        validRange,
        dateMode,
        style,
    } = props;
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerInline', style);

    const scrollMode = mode === 'range' || mode === 'multiple' ? 'vertical' : 'horizontal';

    const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
    const [selectingYear, setSelectingYear] = useState<boolean>(false);
    const onPressYear = useCallback(
        (year: number) => {
            setSelectedYear(year);
            setSelectingYear(prev => !prev);
        },
        [setSelectingYear],
    );

    // prevent re-rendering all months when something changed we only need the
    // latest version of the props and we don't want the useCallback to change
    const startDateRef = useLatest<CalendarDate>(startDate);
    const endDateRef = useLatest<CalendarDate>(endDate);
    const onChangeRef = useLatest<RangeChange | SingleChange | MultiChange | undefined>(onChange);
    const datesRef = useLatest<CalendarDates>(dates);

    const onPressDate = useCallback(
        (d: Date) => {
            if (mode === 'single') {
                (onChangeRef.current as SingleChange)({
                    date: dateMode === 'start' ? d : getEndOfDay(d),
                });
            } else if (mode === 'range') {
                const sd = startDateRef.current;
                const ed = endDateRef.current;
                let isStart: boolean = true;
                if (sd && !ed && dateToUnix(d) >= dateToUnix(sd!)) {
                    isStart = false;
                }
                (onChangeRef.current as RangeChange)({
                    startDate: isStart ? d : sd,
                    endDate: !isStart ? getEndOfDay(d) : undefined,
                });
            } else if (mode === 'multiple') {
                datesRef.current = datesRef.current || [];
                const exists = datesRef.current.some(ed => areDatesOnSameDay(ed, d));

                const newDates = exists
                    ? datesRef.current.filter(ed => !areDatesOnSameDay(ed, d))
                    : [...datesRef.current, d];

                newDates.sort((a, b) => a.getTime() - b.getTime());
                (onChangeRef.current as MultiChange)({
                    dates: newDates,
                    datePressed: d,
                    change: exists ? 'removed' : 'added',
                });
            }
        },
        [mode, dateMode, onChangeRef, startDateRef, endDateRef, datesRef],
    );

    const { containerStyle, firstDate } = useMemo(() => {
        return {
            containerStyle: [styles.root, componentStyles],
            firstDate: startDate || date || dates?.[0],
        };
    }, [componentStyles, date, dates, startDate]);

    return (
        <View style={containerStyle}>
            <Swiper
                initialIndex={getInitialIndex(firstDate)}
                selectedYear={selectedYear}
                scrollMode={scrollMode}
                renderItem={({ index }) => (
                    <Month
                        locale={locale}
                        mode={mode}
                        key={index}
                        validRange={validRange}
                        index={index}
                        startDate={startDate}
                        endDate={endDate}
                        date={date}
                        dates={dates}
                        onPressYear={onPressYear}
                        selectingYear={selectingYear}
                        onPressDate={onPressDate}
                        scrollMode={scrollMode}
                        disableWeekDays={disableWeekDays}
                    />
                )}
                renderHeader={({ onPrev, onNext }) => (
                    <CalendarHeader
                        onPrev={onPrev}
                        onNext={onNext}
                        scrollMode={scrollMode}
                        disableWeekDays={disableWeekDays}
                    />
                )}
            />
            {scrollMode === 'horizontal' ? (
                <YearPicker
                    selectedYear={selectedYear}
                    selectingYear={selectingYear}
                    onPressYear={onPressYear}
                    startYear={startYear || 1800}
                    endYear={endYear || 2200}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
});

export default memo(DatePickerInlineBase);
