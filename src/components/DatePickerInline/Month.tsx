import { useMemo, memo } from 'react';
import { View } from 'react-native';

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
} from './dateUtils';
import { getCalendarHeaderHeight } from './DatePickerInlineHeader';
import { dayNamesHeight } from './DayNames';
import type { MonthMultiProps, MonthRangeProps, MonthSingleProps } from './types';
import Week from './Week';

export type Props = MonthSingleProps | MonthRangeProps | MonthMultiProps;

function Month(props: MonthSingleProps | MonthRangeProps | MonthMultiProps) {
    const {
        index,
        mode,
        date,
        dates,
        startDate,
        endDate,
        onPressYear,
        selectingYear,
        onPressDate,
        scrollMode,
        disableWeekDays,
        locale,
        validRange,
    } = props;
    const { TouchableRipple, Text, IconButton } = useMolecules();
    const monthStyles = useComponentStyles('DatePicker_Month');

    const realIndex = getRealIndex(index);
    const isHorizontal = scrollMode === 'horizontal';
    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);

    const { monthName, month, year } = useMemo(() => {
        const md = addMonths(new Date(), realIndex);
        const y = md.getFullYear();
        const m = md.getMonth();
        const formatter = new Intl.DateTimeFormat(locale, {
            month: 'long',
        });
        return { monthName: formatter.format(md), month: m, year: y };
    }, [realIndex, locale]);

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

    const {
        monthStyle,
        headerStyle,
        yearButtonStyle,
        yearInnerStyle,
        monthLabelStyle,
        iconContainerStyle,
    } = useMemo(() => {
        const {
            monthLabel: _monthLabel,
            yearButton,
            yearButtonInner,
            month: _monthStyle,
            monthHeader,
        } = monthStyles;
        const { typescale, ...monthLabel } = _monthLabel;

        return {
            monthStyle: [_monthStyle, { height: getMonthHeight(scrollMode, index) }],
            headerStyle: [
                monthHeader,
                isHorizontal
                    ? {
                          marginTop: monthHeaderSingleMarginTop,
                          marginBottom: monthHeaderSingleMarginBottom,
                      }
                    : null,
            ],
            yearButtonStyle: yearButton,
            yearInnerStyle: yearButtonInner,
            monthLabelStyle: [monthLabel, typescale],
            iconContainerStyle: { opacity: isHorizontal ? 1 : 0 },
        };
    }, [index, isHorizontal, monthStyles, scrollMode]);

    return (
        <View style={monthStyle}>
            <View style={headerStyle}>
                <TouchableRipple
                    disabled={!isHorizontal}
                    onPress={isHorizontal ? () => onPressYear(year) : undefined}
                    accessibilityRole="button"
                    accessibilityLabel={`${monthName} ${year}`}
                    style={yearButtonStyle}>
                    <View style={yearInnerStyle}>
                        <Text style={monthLabelStyle} selectable={false}>
                            {monthName} {year}
                        </Text>
                        <View style={iconContainerStyle}>
                            <IconButton
                                onPress={isHorizontal ? () => onPressYear(year) : undefined}
                                name={selectingYear ? 'chevron-up' : 'chevron-down'}
                            />
                        </View>
                    </View>
                </TouchableRipple>
            </View>

            {grid.map(({ weekIndex, generatedDays }) => (
                <Week
                    weekIndex={weekIndex}
                    generatedDays={generatedDays}
                    disableWeekDays={disableWeekDays}
                    onPressDate={onPressDate}
                />
            ))}
        </View>
    );
}

// TODO make it flexible
export const weekMargin = 6;
export const weekSize = daySize + weekMargin;
export const montHeaderHeight = 56;
export const monthHeaderSingleMarginTop = 4;
export const monthHeaderSingleMarginBottom = 8 + 44 + 12;
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
