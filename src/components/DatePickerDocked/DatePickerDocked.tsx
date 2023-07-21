import { memo, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import { getInitialIndex } from '../DatePickerInline/dateUtils';
import Swiper from '../DatePickerInline/Swiper';
import Month from '../DatePickerInline/Month';
import CalendarHeader from './DatePickerDockedHeader';
import YearPicker from '../DatePickerInline/YearPicker';
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
            placement="bottom right"
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}>
            <Provider value={defaultValue}>
                <DatePickerDockedBaseComponent {...props} />
            </Provider>
        </Popover>
    );
}

const DatePickerDockedBase = (props: DatePickerDockedProps) => {
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

    const [{ localDate, pickerType }, setStore] = useSelector(state => state);

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
                newDate = setMonth(localDate, value);
            } else {
                newDate = setYear(localDate, value);
            }
            setStore(prev => ({
                ...prev,
                localDate: newDate,
                pickerType: undefined,
            }));
        },
        [localDate, setStore],
    );

    const onPressDate = useCallback(
        (d: Date) => {
            onChange && onChange({ date: d });
            onToggle();
        },
        [onChange, onToggle],
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
                    date={localDate}
                    onPressDate={onPressDate}
                    scrollMode={scrollMode}
                    disableWeekDays={disableWeekDays}
                    isDocked
                />
            );
        },
        [localDate, disableWeekDays, endDate, locale, onPressDate, startDate, validRange],
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
};

const DatePickerDockedBaseComponent = memo(DatePickerDockedBase);

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 'spacings.0' },
});

export const useStore = useSelector;

export default memo(DatePickerDocked);
