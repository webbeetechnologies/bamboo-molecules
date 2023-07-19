import { memo, useState, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useLatest, useMolecules } from '../../hooks';
import { getInitialIndex } from '../DatePickerInline/dateUtils';
import Swiper from '../DatePickerInline/Swiper';
import Month from './Month';
import CalendarHeader from './DatePickerDockedHeader';
import YearPicker from '../DatePickerInline/YearPicker';
import type { SingleChange, RangeChange, MultiChange } from '../DatePickerInline/types';
import MonthPicker from './MonthPicker';
import type { DatePickerDockedProps } from './types';
import { setMonth, setYear } from 'date-fns';

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
        validRange,
        style,
        triggerRef,
        onToggle,
        isOpen,
    } = props;
    const { View, Popover } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerDocked', style);

    const scrollMode = 'horizontal';

    const [localDate, setLocalDate] = useState<Date>(date || new Date());
    const [pickerType, setPickerType] = useState<'month' | 'year' | undefined>(undefined);

    const onPressDropdown = useCallback(
        (type: 'month' | 'year' | undefined) => {
            if (!pickerType) {
                setPickerType(type);
            } else {
                setPickerType(undefined);
            }
        },
        [setPickerType, pickerType],
    );

    const onPressYear = useCallback(
        (year: number) => {
            setPickerType(undefined);
            setLocalDate(prevDate => setYear(prevDate, year));
        },
        [setPickerType, setLocalDate],
    );

    const onPressMonth = useCallback(
        (month: number) => {
            setPickerType(undefined);
            setLocalDate(prevDate => setMonth(prevDate, month));
        },
        [setPickerType, setLocalDate],
    );

    const onPrevYear = useCallback(() => {
        setLocalDate(prevDate => setYear(prevDate, prevDate.getFullYear() - 1));
    }, [setLocalDate]);

    const onNextYear = useCallback(() => {
        setLocalDate(prevDate => setYear(prevDate, prevDate.getFullYear() + 1));
    }, [setLocalDate]);

    const onPrevMonth = useCallback(() => {
        if (localDate.getMonth() === 0) {
            onPrevYear();
            setLocalDate(prevDate => setMonth(prevDate, 11));
        } else {
            setLocalDate(prevDate => setMonth(prevDate, prevDate.getMonth() - 1));
        }
    }, [onPrevYear, setLocalDate, localDate]);

    const onNextMonth = useCallback(() => {
        if (localDate.getMonth() === 11) {
            onNextYear();
            setLocalDate(prevDate => setMonth(prevDate, 0));
        } else {
            setLocalDate(prevDate => setMonth(prevDate, prevDate.getMonth() + 1));
        }
    }, [onNextYear, setLocalDate, localDate]);

    // prevent re-rendering all months when something changed we only need the
    // latest version of the props and we don't want the useCallback to change
    const onChangeRef = useLatest<RangeChange | SingleChange | MultiChange | undefined>(onChange);

    const onPressDate = useCallback(
        (d: Date) => {
            (onChangeRef.current as SingleChange)({
                date: d,
            });
            onToggle();
        },
        [onChangeRef, onToggle],
    );

    const { containerStyle, firstDate } = useMemo(() => {
        return {
            containerStyle: [styles.root, componentStyles],
            firstDate: startDate || localDate,
        };
    }, [componentStyles, localDate, startDate]);

    return (
        <Popover
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}>
            <View style={containerStyle}>
                <Swiper
                    initialIndex={getInitialIndex(firstDate)}
                    selectedYear={localDate.getFullYear()}
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
                            onPressDropdown={onPressDropdown}
                            selectedMonth={localDate.getMonth()}
                            selectedYear={localDate.getFullYear()}
                            selectingMonth={pickerType === 'month'}
                            selectingYear={pickerType === 'year'}
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
                            year={localDate.getFullYear()}
                            onPressDropdown={onPressDropdown}
                            selectingYear={pickerType === 'year'}
                            selectingMonth={pickerType === 'month'}
                        />
                    )}
                />
                {pickerType === 'year' && (
                    <YearPicker
                        selectedYear={localDate.getFullYear()}
                        selectingYear={pickerType === 'year'}
                        onPressYear={onPressYear}
                        startYear={startYear || 1800}
                        endYear={endYear || 2200}
                    />
                )}
                {pickerType === 'month' && (
                    <MonthPicker
                        selectedMonth={localDate.getMonth()}
                        selectingMonth={pickerType === 'month'}
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
