import { memo, useCallback, useMemo, useEffect } from 'react';
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
import { createFastContext } from '../../fast-context';

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

const { Provider, useSelector } = createFastContext<Store>(defaultValue);

function DatePickerDocked(props: DatePickerDockedProps) {
    const { Popover } = useMolecules();
    const { triggerRef, isOpen, onToggle } = props;
    return (
        <Popover
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}>
            <Provider value={defaultValue}>
                <DatePickerDockedBase {...props} />
            </Provider>
        </Popover>
    );
}

function DatePickerDockedBase(props: DatePickerDockedProps) {
    const {
        locale = 'en',
        onChange,
        startDate,
        endDate,
        date,
        disableWeekDays,
        startYear = 1800,
        endYear = 2200,
        validRange,
        style,
        onToggle,
    } = props;

    const [{ localDate, pickerType, endDateYear, startDateYear }, setStore] = useSelector(
        state => state,
    );

    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerDocked', style);

    const scrollMode = 'horizontal';

    useEffect(() => {
        setStore(prev => ({
            ...prev,
            localDate: date || new Date(),
            startDateYear: startYear,
            endDateYear: endYear,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDateChange = useCallback(
        (value: number, type: 'month' | 'year') => {
            let newDate = localDate;
            if (type === 'month') {
                if (value > 11) {
                    if (localDate.getFullYear() !== endDateYear) {
                        newDate = setYear(localDate, localDate.getFullYear() + 1);
                        newDate = setMonth(localDate, 0);
                    }
                } else if (value < 0) {
                    if (localDate.getFullYear() !== startDateYear) {
                        newDate = setYear(localDate, localDate.getFullYear() - 1);
                        newDate = setMonth(localDate, 11);
                    }
                } else {
                    newDate = setMonth(localDate, value);
                }
            } else {
                newDate = setYear(localDate, value);
            }
            setStore(prev => ({
                ...prev,
                localDate: newDate,
                pickerType: undefined,
            }));
        },
        [localDate, setStore, endDateYear, startDateYear],
    );

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

    const renderMonthComponent = useCallback(
        ({ index }: { index: number }) => {
            return (
                <Month
                    locale={locale}
                    mode="single"
                    validRange={validRange}
                    index={index}
                    startDate={startDate}
                    endDate={endDate}
                    date={date}
                    onPressDate={onPressDate}
                    scrollMode={scrollMode}
                    disableWeekDays={disableWeekDays}
                />
            );
        },
        [date, disableWeekDays, endDate, locale, onPressDate, startDate, validRange],
    );

    const renderCalenderHeader = useCallback(() => {
        return <CalendarHeader disableWeekDays={disableWeekDays} locale={locale} />;
    }, [disableWeekDays, locale]);

    return (
        <View style={containerStyle}>
            <Swiper
                initialIndex={getInitialIndex(firstDate)}
                selectedYear={localDate.getFullYear()}
                scrollMode={scrollMode}
                renderItem={renderMonthComponent}
                renderHeader={renderCalenderHeader}
            />
            {pickerType === 'year' && (
                <YearPicker
                    selectedYear={localDate.getFullYear()}
                    selectingYear={pickerType === 'year'}
                    onChange={onDateChange}
                    startYear={startYear}
                    endYear={endYear}
                />
            )}
            {pickerType === 'month' && <MonthPicker onChange={onDateChange} />}
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 'spacings.0' },
});

export const useStore = useSelector;

export default memo(DatePickerDocked);
