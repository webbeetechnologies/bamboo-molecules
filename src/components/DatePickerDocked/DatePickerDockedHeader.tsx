import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInline/dateUtils';
import DayNames, { dayNamesHeight } from '../DatePickerInline/DayNames';
import HeaderItem from './HeaderItem';
import { useStore } from './DatePickerDocked';
import { setYear } from 'date-fns';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    locale?: string;
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
};

function DatePickerDockedHeader({
    locale = 'en',
    disableWeekDays,
    style: styleProp,
}: CalendarHeaderProps) {
    const { View } = useMolecules();
    const [{ localDate, pickerType }, setStore] = useStore(state => state);

    const componentStyles = useComponentStyles('DatePickerDocked_Header', styleProp);

    const { containerStyle, daysWrapperStyle } = useMemo(() => {
        const { datePickerHeader, daysWrapperStyle: daysWrapper, ...rest } = componentStyles;

        return {
            containerStyle: [datePickerHeader, rest],
            daysWrapperStyle: daysWrapper,
        };
    }, [componentStyles]);

    const handleOnPrevious = useCallback(() => {
        setStore(prev => ({
            ...prev,
            localDate: setYear(prev.localDate, prev.localDate.getFullYear() - 1),
        }));
    }, [setStore]);

    const handleOnNext = useCallback(() => {
        setStore(prev => ({
            ...prev,
            localDate: setYear(prev.localDate, prev.localDate.getFullYear() + 1),
        }));
    }, [setStore]);

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            <HeaderItem
                onNext={handleOnNext}
                onPrev={handleOnPrevious}
                selecting={!!pickerType}
                type="year"
                value={localDate.getFullYear()}
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
