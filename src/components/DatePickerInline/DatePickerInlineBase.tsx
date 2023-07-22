import { memo, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useLatest, useMolecules } from '../../hooks';
import { areDatesOnSameDay, dateToUnix, getEndOfDay, getInitialIndex } from './dateUtils';
import Swiper from './Swiper';
import Month from './Month';
import YearPicker from './YearPicker';
import type {
    DatePickerInlineBaseProps,
    SingleChange,
    CalendarDate,
    RangeChange,
    MultiChange,
    CalendarDates,
} from './types';
import { createFastContext } from '../../fast-context';
import MonthPicker from './MonthPicker';

export type Store = {
    localDate: Date;
    startDateYear: number;
    endDateYear: number;
    pickerType: 'month' | 'year' | undefined;
};

const defaultValue = {
    localDate: new Date(),
    startDateYear: 1800,
    endDateYear: 2200,
    pickerType: undefined,
};

const { Provider, useContext: useFastContext, useContextValue } = createFastContext<Store>();

function DatePickerInlineBase(props: DatePickerInlineBaseProps) {
    return (
        <Provider value={defaultValue}>
            <DatePickerInlineComponent {...props} />
        </Provider>
    );
}

function DatePickerInlineBaseChild(props: DatePickerInlineBaseProps) {
    const {
        locale = 'en',
        mode = 'single',
        onChange,
        startYear = 1800,
        endYear = 2200,
        startDate,
        endDate,
        date,
        disableWeekDays,
        dates,
        validRange,
        dateMode,
        style,
        HeaderComponent,
        onToggle,
        monthStyle,
    } = props;
    const [_, setStore] = useFastContext(state => state);
    const pickerType = useContextValue(state => state.pickerType);

    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerInline', style);

    const scrollMode = mode === 'range' || mode === 'multiple' ? 'vertical' : 'horizontal';
    const isHorizontal = scrollMode === 'horizontal';

    useEffect(() => {
        setStore(() => ({
            localDate: date || new Date(),
            startDateYear: startYear,
            endDateYear: endYear,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            onToggle?.();
        },
        [mode, dateMode, onChangeRef, startDateRef, endDateRef, datesRef, onToggle],
    );

    const { containerStyle, firstDate } = useMemo(() => {
        return {
            containerStyle: [styles.root, componentStyles],
            firstDate: startDate || date || dates?.[0],
        };
    }, [componentStyles, date, dates, startDate]);

    const renderMonthComponent = useCallback(
        (index: number) => {
            return (
                <Month
                    locale={locale}
                    mode={mode}
                    validRange={validRange}
                    index={index}
                    date={date}
                    dates={dates}
                    startDate={startDate}
                    endDate={endDate}
                    onPressDate={onPressDate}
                    scrollMode={scrollMode}
                    disableWeekDays={disableWeekDays}
                    customMonthStyles={monthStyle}
                />
            );
        },
        [
            locale,
            mode,
            validRange,
            date,
            dates,
            startDate,
            endDate,
            onPressDate,
            scrollMode,
            disableWeekDays,
            monthStyle,
        ],
    );

    const renderCalenderHeader = useCallback(() => {
        if (HeaderComponent) {
            return (
                <HeaderComponent
                    scrollMode={scrollMode}
                    disableWeekDays={disableWeekDays}
                    locale={locale}
                />
            );
        }
        return null;
    }, [HeaderComponent, scrollMode, disableWeekDays, locale]);

    return (
        <View style={containerStyle}>
            <Swiper
                initialIndex={getInitialIndex(firstDate)}
                scrollMode={scrollMode}
                renderItem={renderMonthComponent}
                renderHeader={renderCalenderHeader}
            />
            {isHorizontal && pickerType === 'year' && <YearPicker />}
            {isHorizontal && pickerType === 'month' && <MonthPicker />}
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
});

export const useDatePickerStore = useFastContext;
export const useDatePickerStoreValue = useContextValue;

const DatePickerInlineComponent = memo(DatePickerInlineBaseChild);

export default memo(DatePickerInlineBase);
