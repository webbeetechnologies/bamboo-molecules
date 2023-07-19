import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInline/dateUtils';
import DayNames, { dayNamesHeight } from '../DatePickerInline/DayNames';
import HeaderItem from './HeaderItem';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    locale?: string;
    scrollMode: 'horizontal' | 'vertical';
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
    year: number;
    onPressDropdown: (type: 'month' | 'year' | undefined) => void;
    onChange: (value: number, type: 'month' | 'year') => void;
    selectingYear: boolean;
    selectingMonth: boolean;
};

function DatePickerDockedHeader({
    locale = 'en',
    disableWeekDays,
    style: styleProp,
    year,
    onPressDropdown,
    onChange,
    selectingYear,
    selectingMonth,
}: CalendarHeaderProps) {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerDocked_Header', styleProp);

    const { containerStyle, daysWrapperStyle } = useMemo(() => {
        const { datePickerHeader, daysWrapperStyle: daysWrapper, ...rest } = componentStyles;

        return {
            containerStyle: [datePickerHeader, rest],
            daysWrapperStyle: daysWrapper,
        };
    }, [componentStyles]);

    const handlePressDropDown = useCallback(
        (type: 'month' | 'year' | undefined) => onPressDropdown(type),
        [onPressDropdown],
    );

    const handleOnPrevious = useCallback(() => {
        onChange(year - 1, 'year');
    }, [onChange, year]);

    const handleOnNext = useCallback(() => {
        onChange(year + 1, 'year');
    }, [onChange, year]);

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            <HeaderItem
                onNext={handleOnNext}
                onPrev={handleOnPrevious}
                disabled={selectingMonth}
                selecting={selectingYear || selectingMonth}
                type="year"
                value={year}
                onPressDropdown={handlePressDropDown}
            />
            <View style={daysWrapperStyle}>
                <DayNames disableWeekDays={disableWeekDays} locale={locale} />
            </View>
        </View>
    );
}

export function getCalendarHeaderHeight(scrollMode: 'horizontal' | 'vertical') {
    if (scrollMode === 'horizontal') {
        return (
            buttonContainerHeight +
            buttonContainerMarginTop +
            buttonContainerMarginBottom +
            dayNamesHeight
        );
    }
    return dayNamesHeight;
}

export default memo(DatePickerDockedHeader);
