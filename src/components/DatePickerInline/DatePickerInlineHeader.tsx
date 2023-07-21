import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import { getRealIndex, DisableWeekDaysType, addMonths } from './dateUtils';
import DayNames, { dayNamesHeight } from './DayNames';
import HeaderItem from './HeaderItem';
import { format } from 'date-fns';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    index: number;
    locale?: string;
    scrollMode: 'horizontal' | 'vertical';
    onPrev: () => any;
    onNext: () => any;
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
    onPressYear: (year: number) => void;
    selectingYear: boolean;
    startYear: number;
    endYear: number;
};

function DatePickerInline({
    index,
    locale = 'en',
    scrollMode,
    onPrev,
    onNext,
    disableWeekDays,
    onPressYear,
    startYear,
    endYear,
    selectingYear,
    style: styleProp,
}: CalendarHeaderProps) {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_Header', styleProp);

    const isHorizontal = scrollMode === 'horizontal';

    const realIndex = getRealIndex(index);

    const { monthName, year } = useMemo(() => {
        const md = addMonths(new Date(), realIndex);
        const y = md.getFullYear();

        return { monthName: format(md, 'LLLL'), year: y };
    }, [realIndex]);

    const { containerStyle } = useMemo(() => {
        const { datePickerHeader, buttonContainer, buttonWrapper, spacer, ...rest } =
            componentStyles;

        return {
            containerStyle: [datePickerHeader, rest],
            buttonContainerStyle: buttonContainer,
            buttonWrapperStyle: buttonWrapper,
            spacerStyle: spacer,
        };
    }, [componentStyles]);

    const handleOnYearPress = useCallback(() => {
        isHorizontal && onPressYear ? onPressYear(year) : undefined;
    }, [isHorizontal, onPressYear, year]);

    return (
        <View pointerEvents={'box-none'}>
            <>
                {isHorizontal && (
                    <View style={containerStyle}>
                        <HeaderItem
                            onPressDropdown={handleOnYearPress}
                            type="year"
                            value={`${monthName} ${year}`}
                            startYear={startYear}
                            endYear={endYear}
                            pickerType="year"
                            selecting={selectingYear}
                        />
                        <HeaderItem
                            onNext={onNext}
                            onPrev={onPrev}
                            selecting={false}
                            value={year}
                            startYear={startYear}
                            endYear={endYear}
                            pickerType="year"
                        />
                    </View>
                )}
            </>
            <DayNames disableWeekDays={disableWeekDays} locale={locale} />
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

export default memo(DatePickerInline);
