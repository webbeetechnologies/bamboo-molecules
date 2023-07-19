import { memo, useState, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useLatest, useMolecules } from '../../hooks';
import { getEndOfDay, getInitialIndex } from '../DatePickerInline/dateUtils';
import Swiper from '../DatePickerInline/Swiper';
import Month from './Month';
import CalendarHeader from './DatePickerDockedHeader';
import YearPicker from '../DatePickerInline/YearPicker';
import type { SingleChange, RangeChange, MultiChange } from '../DatePickerInline/types';
import MonthPicker from './MonthPicker';
import type { DatePickerDockedProps } from './types';

const MonthComponent = memo(Month);
const CalendarHeaderComponent = memo(CalendarHeader);

function DatePickerDocked(props: DatePickerDockedProps) {
    const {
        locale = 'en',
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
        triggerRef,
        onToggle,
        isOpen,
    } = props;
    const { View, Popover } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerDocked', style);

    const scrollMode = 'horizontal';
    const localDate = new Date();

    const [selectedYear, setSelectedYear] = useState<number>(
        date?.getFullYear() || localDate.getFullYear(),
    );
    const [selectingYear, setSelectingYear] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<number>(
        date?.getMonth() || localDate.getMonth(),
    );
    const [selectingMonth, setSelectingMonth] = useState<boolean>(false);
    const [pickerType, setPickerType] = useState<'month' | 'year' | undefined>(undefined);

    const onPressYear = useCallback(
        (year: number) => {
            setPickerType('year');
            setSelectedYear(year);
            setSelectingYear(prev => !prev);
        },
        [setSelectingYear, setPickerType],
    );

    const onPressMonth = useCallback(
        (month: number) => {
            setPickerType('month');
            setSelectedMonth(month);
            setSelectingMonth(prev => !prev);
        },
        [setSelectingMonth, setPickerType],
    );

    const onPrevYear = useCallback(() => {
        setSelectedYear(prev => prev - 1);
    }, [setSelectedYear]);

    const onNextYear = useCallback(() => {
        setSelectedYear(prev => prev + 1);
    }, [setSelectedYear]);

    const onPrevMonth = useCallback(() => {
        if (selectedMonth === 0) {
            setSelectedYear(prevYear => prevYear - 1);
            setSelectedMonth(11);
        } else {
            setSelectedMonth(prev => prev - 1);
        }
    }, [setSelectedMonth, setSelectedYear, selectedMonth]);

    const onNextMonth = useCallback(() => {
        if (selectedMonth === 11) {
            setSelectedYear(prevYear => prevYear + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth(prev => prev + 1);
        }
    }, [setSelectedMonth, setSelectedYear, selectedMonth]);

    // prevent re-rendering all months when something changed we only need the
    // latest version of the props and we don't want the useCallback to change
    const onChangeRef = useLatest<RangeChange | SingleChange | MultiChange | undefined>(onChange);

    const onPressDate = useCallback(
        (d: Date) => {
            (onChangeRef.current as SingleChange)({
                date: dateMode === 'start' ? d : getEndOfDay(d),
            });
            onToggle();
        },
        [dateMode, onChangeRef, onToggle],
    );

    const { containerStyle, firstDate } = useMemo(() => {
        return {
            containerStyle: [styles.root, componentStyles],
            firstDate: startDate || date || dates?.[0],
        };
    }, [componentStyles, date, dates, startDate]);

    return (
        <Popover
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}>
            <View style={containerStyle}>
                <Swiper
                    initialIndex={getInitialIndex(firstDate)}
                    selectedYear={selectedYear}
                    scrollMode={scrollMode}
                    renderItem={({ index }) => (
                        <MonthComponent
                            locale={locale}
                            mode="single"
                            validRange={validRange}
                            index={index}
                            startDate={startDate}
                            endDate={endDate}
                            date={date}
                            dates={dates}
                            onPressMonth={onPressMonth}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            selectingMonth={selectingMonth}
                            selectingYear={selectingYear}
                            onPressDate={onPressDate}
                            scrollMode={scrollMode}
                            disableWeekDays={disableWeekDays}
                            onPrev={onPrevMonth}
                            onNext={onNextMonth}
                        />
                    )}
                    renderHeader={() => (
                        <CalendarHeaderComponent
                            onPrev={onPrevYear}
                            onNext={onNextYear}
                            scrollMode={scrollMode}
                            disableWeekDays={disableWeekDays}
                            year={selectedYear || 1800}
                            onPressYear={onPressYear}
                            selectingYear={selectingYear}
                            selectingMonth={selectingMonth}
                        />
                    )}
                />
                {pickerType === 'year' && (
                    <YearPicker
                        selectedYear={selectedYear}
                        selectingYear={selectingYear}
                        onPressYear={onPressYear}
                        startYear={startYear || 1800}
                        endYear={endYear || 2200}
                    />
                )}
                {pickerType === 'month' && (
                    <MonthPicker
                        selectedMonth={selectedMonth}
                        selectingMonth={selectingMonth}
                        onPressMonth={onPressMonth}
                    />
                )}
            </View>
        </Popover>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 0 },
});

export default memo(DatePickerDocked);
