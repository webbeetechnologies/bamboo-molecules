import { useMemo, memo, useCallback } from 'react';

import { useComponentStyles, useMolecules } from '../../hooks';
import {
    addMonths,
    daySize,
    getRealIndex,
    getGridCount,
    gridCounts,
    startAtIndex,
    beginOffset,
    estimatedMonthHeight,
    useRangeChecker,
    generateCalendarGrid,
} from '../DatePickerInline/dateUtils';
import { getCalendarHeaderHeight } from '../DatePickerInline/DatePickerInlineHeader';
import { dayNamesHeight } from '../DatePickerInline/DayNames';
import type { MonthMultiProps, MonthRangeProps, MonthSingleProps } from '../DatePickerInline/types';
import Week from '../DatePickerInline/Week';
import { MONTHS_DATA } from './utils';
import HeaderItem from './HeaderItem';

export type Props = MonthSingleProps | MonthRangeProps | MonthMultiProps;

function Month(props: MonthSingleProps | MonthRangeProps | MonthMultiProps) {
    const {
        index,
        mode,
        date,
        dates,
        startDate,
        endDate,
        onPressDropdown,
        selectingMonth,
        selectingYear,
        onPressDate,
        scrollMode,
        disableWeekDays,
        validRange,
        selectedMonth,
        selectedYear,
        onPrev,
        onNext,
    } = props;
    const { View } = useMolecules();
    const monthStyles = useComponentStyles('DatePicker_Month');

    const realIndex = getRealIndex(index);

    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);

    const { monthName, month, year } = useMemo(() => {
        const md = addMonths(new Date(), realIndex);
        const monthNameStr = MONTHS_DATA[selectedMonth !== undefined ? selectedMonth : 0].substring(
            0,
            3,
        );
        const y = selectedYear || md.getFullYear();
        const m = selectedMonth !== undefined ? selectedMonth : md.getMonth();

        return { monthName: monthNameStr, month: m, year: y };
    }, [realIndex, selectedMonth, selectedYear]);

    const grid = useMemo(
        () =>
            generateCalendarGrid({
                year,
                month,
                index,
                isDisabled,
                mode,
                isWithinValidRange,
                startDate,
                endDate,
                dates,
                date,
                monthGrid,
            }),
        [year, month, index, isDisabled, mode, isWithinValidRange, startDate, endDate, dates, date],
    );

    const { monthStyle, headerStyle, weekContainerStyle } = useMemo(() => {
        const { monthLabel: _monthLabel, month: _monthStyle, monthHeader } = monthStyles;

        return {
            monthStyle: [_monthStyle, { height: getMonthHeight(scrollMode, index) }],
            headerStyle: [
                monthHeader,
                {
                    alignItems: 'flex-start',
                    marginLeft: 'spacings.4',
                    marginTop: monthHeaderSingleMarginTop,
                    marginBottom: monthHeaderSingleMarginBottom,
                },
            ],
            weekContainerStyle: { marginHorizontal: 'spacings.3' },
        };
    }, [index, monthStyles, scrollMode]);

    const handlePressDropdown = useCallback(
        (type: 'month' | 'year' | undefined) => {
            onPressDropdown && onPressDropdown(type);
        },
        [onPressDropdown],
    );

    return (
        <View style={monthStyle}>
            <View style={headerStyle}>
                <HeaderItem
                    disabled={!!selectingYear}
                    onNext={onNext as any}
                    onPrev={onPrev as any}
                    value={monthName}
                    onPressDropdown={handlePressDropdown}
                    selecting={!!selectingMonth || !!selectingYear}
                    type="month"
                />
            </View>

            {grid.map(({ weekIndex, generatedDays }) => (
                <Week
                    key={weekIndex}
                    weekIndex={weekIndex}
                    generatedDays={generatedDays}
                    disableWeekDays={disableWeekDays}
                    onPressDate={onPressDate}
                    style={weekContainerStyle}
                />
            ))}
        </View>
    );
}

// TODO make it flexible
export const weekMargin = 6;
export const weekSize = daySize + weekMargin;
export const montHeaderHeight = 46;
export const monthHeaderSingleMarginTop = 4;
export const monthHeaderSingleMarginBottom = 8 + 22 + 12;
export const monthHeaderSingleHeight = monthHeaderSingleMarginTop + monthHeaderSingleMarginBottom;

const monthGrid = (index: number) => {
    return Array(getGridCount(index))
        .fill(null)
        .map((_, weekGrid) => {
            const days = Array(7).fill(null);
            return { weekGrid, days };
        });
};

function getIndexCount(index: number): number {
    if (index > startAtIndex) {
        return index - startAtIndex;
    }

    return -(startAtIndex - index);
}

function weeksOffset(index: number): number {
    if (index === startAtIndex) {
        return 0;
    }
    let off = 0;
    if (index > startAtIndex) {
        for (let i = 0; i < index - startAtIndex; i++) {
            const cIndex = startAtIndex + i;
            off += gridCounts[cIndex] || getGridCount(cIndex);
        }
    } else {
        for (let i = 0; i < startAtIndex - index; i++) {
            const cIndex = startAtIndex - i - 1;
            off -= gridCounts[cIndex] || getGridCount(cIndex);
        }
    }
    return off;
}

export function getIndexFromHorizontalOffset(offset: number, width: number): number {
    return startAtIndex + Math.floor(offset / width);
}

export function getIndexFromVerticalOffset(offset: number): number {
    let estimatedIndex = startAtIndex + Math.ceil(offset / estimatedMonthHeight);

    const realOffset = getVerticalMonthsOffset(estimatedIndex);
    const difference = (realOffset - beginOffset - offset) / estimatedMonthHeight;
    if (difference >= 1 || difference <= -1) {
        estimatedIndex -= Math.floor(difference);
    }
    return estimatedIndex;
}

export function getHorizontalMonthOffset(index: number, width: number) {
    if (index < 0) {
        return 0;
    }
    return width * index;
}

export function getVerticalMonthsOffset(index: number) {
    const count = getIndexCount(index);
    const ob = weeksOffset(index);
    const monthsHeight = weekSize * ob;
    const c = monthsHeight + count * (dayNamesHeight + montHeaderHeight);

    return (c || 0) + beginOffset;
}

export function getMonthHeight(scrollMode: 'horizontal' | 'vertical', index: number): number {
    const calendarHeight = getCalendarHeaderHeight(scrollMode);
    const gc = getGridCount(index);

    const currentMonthHeight = weekSize * gc;
    const extraHeight = scrollMode === 'horizontal' ? monthHeaderSingleHeight : montHeaderHeight;
    const c = calendarHeight + currentMonthHeight + extraHeight;
    return c || 0;
}

export default memo(Month);
