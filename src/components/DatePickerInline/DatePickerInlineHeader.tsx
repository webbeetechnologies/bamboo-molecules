import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import DayNames, { dayNamesHeight } from './DayNames';
import HeaderItem from './HeaderItem';
import { add, format } from 'date-fns';
import { useDatePickerStore, useDatePickerStoreValue } from './DatePickerInlineBase';
import type { DisableWeekDaysType } from './dateUtils';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    locale?: string;
    scrollMode: 'horizontal' | 'vertical';
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
};

function DatePickerInlineHeader({
    locale = 'en',
    scrollMode,
    disableWeekDays,
    style: styleProp,
}: CalendarHeaderProps) {
    const [_, setStore] = useDatePickerStore(state => state);
    const { localDate, isYearPickerType } = useDatePickerStoreValue(state => ({
        localDate: state.localDate,
        isYearPickerType: state.pickerType === 'year',
    }));
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_Header', styleProp);

    const isHorizontal = scrollMode === 'horizontal';

    const { monthName, year } = useMemo(() => {
        const y = localDate.getFullYear();

        return { monthName: format(localDate, 'LLLL'), year: y };
    }, [localDate]);

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
        isHorizontal && setStore(prev => ({ pickerType: prev.pickerType ? undefined : 'year' }));
    }, [isHorizontal, setStore]);

    const handleOnPrev = useCallback(() => {
        setStore(prev => ({ localDate: add(prev.localDate, { months: -1 }) }));
    }, [setStore]);

    const handleOnNext = useCallback(() => {
        setStore(prev => ({ localDate: add(prev.localDate, { months: 1 }) }));
    }, [setStore]);

    return (
        <View pointerEvents={'box-none'}>
            <>
                {isHorizontal && (
                    <View style={containerStyle}>
                        <HeaderItem
                            onPressDropdown={handleOnYearPress}
                            type="year"
                            value={`${monthName} ${year}`}
                            pickerType="year"
                            selecting={isYearPickerType}
                        />
                        <HeaderItem
                            onNext={handleOnNext}
                            onPrev={handleOnPrev}
                            selecting={false}
                            value={year}
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

export default memo(DatePickerInlineHeader);
