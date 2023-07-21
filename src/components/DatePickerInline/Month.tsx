import { useMemo, memo, useCallback } from 'react';

import { useComponentStyles, useMolecules } from '../../hooks';
import { format } from '../../utils';
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
        // locale,
        validRange,
        isDocked,
    } = props;
    const { TouchableRipple, Text, IconButton, View } = useMolecules();
    const monthStyles = useComponentStyles('DatePicker_Month');

    const realIndex = getRealIndex(index);
    const isHorizontal = scrollMode === 'horizontal';
    const { isDisabled, isWithinValidRange } = useRangeChecker(validRange);

    const { monthName, month, year } = useMemo(() => {
        const md = addMonths(new Date(), realIndex);
        const y = isDocked && date ? date?.getFullYear() : md.getFullYear();
        const m = isDocked && date ? date?.getMonth() : md.getMonth();

        return { monthName: format(isDocked && date ? date : md, 'LLLL'), month: m, year: y };
    }, [realIndex, isDocked, date]);

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
        headerStyle,
        yearButtonStyle,
        yearInnerStyle,
        monthLabelStyle,
        iconContainerStyle,
        weekContainerStyle,
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
                          alignItems: isDocked && 'flex-start',
                          marginLeft: isDocked && 'spacings.4',
                          marginTop: monthHeaderSingleMarginTop,
                          marginBottom: monthHeaderSingleMarginBottom,
                      }
                    : null,
            ],
            yearButtonStyle: yearButton,
            yearInnerStyle: yearButtonInner,
            monthLabelStyle: [monthLabel, typescale],
            iconContainerStyle: { opacity: isHorizontal ? 1 : 0 },
            weekContainerStyle: { marginHorizontal: 'spacings.3' },
        };
    }, [index, isHorizontal, monthStyles, scrollMode, isDocked]);

    const onPressDropdown = useCallback(
        () => onPressYear && onPressYear(year),
        [onPressYear, year],
    );

    return (
        <View>
            {!isHorizontal && (
                <View style={headerStyle}>
                    <TouchableRipple
                        disabled={!isHorizontal}
                        onPress={onPressDropdown}
                        accessibilityRole="button"
                        accessibilityLabel={`${monthName} ${year}`}
                        style={yearButtonStyle}>
                        <View style={yearInnerStyle}>
                            <Text style={monthLabelStyle} selectable={false}>
                                {monthName} {year}
                            </Text>
                            <View style={iconContainerStyle}>
                                <IconButton
                                    onPress={onPressDropdown}
                                    name={selectingYear ? 'chevron-up' : 'chevron-down'}
                                />
                            </View>
                        </View>
                    </TouchableRipple>
                </View>
            )}

            {grid.map(({ weekIndex, generatedDays }) => (
                <Week
                    key={weekIndex}
                    weekIndex={weekIndex}
                    generatedDays={generatedDays}
                    disableWeekDays={disableWeekDays}
                    onPressDate={onPressDate}
                    style={isDocked && weekContainerStyle}
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
