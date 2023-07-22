import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInline/dateUtils';
import DayNames, { dayNamesHeight } from '../DatePickerInline/DayNames';
import HeaderItem from '../DatePickerInline/HeaderItem';
import { useDatePickerStore } from '../DatePickerInline/DatePickerInlineBase';
import { add, format } from 'date-fns';

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
    const [{ localDate, pickerType, startDateYear, endDateYear }, setStore] = useDatePickerStore(
        state => state,
    );

    const componentStyles = useComponentStyles('DatePickerDocked_Header', styleProp);

    const monthName = useMemo(() => {
        return format(localDate, 'MMM');
    }, [localDate]);

    const { containerStyle, daysWrapperStyle } = useMemo(() => {
        const { datePickerHeader, daysWrapperStyle: daysWrapper, ...rest } = componentStyles;

        return {
            containerStyle: [datePickerHeader, rest],
            daysWrapperStyle: daysWrapper,
        };
    }, [componentStyles]);

    const handlePressDropDown = useCallback(
        (type: 'month' | 'year') => {
            setStore(() => ({
                pickerType: pickerType ? undefined : type,
            }));
        },
        [setStore, pickerType],
    );

    const isNotInRange = useCallback(
        (date: Date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            if (year < startDateYear || year > endDateYear || month > 11 || month < 0) {
                return true;
            }
            return false;
        },
        [startDateYear, endDateYear],
    );

    const handleChange = useCallback(
        (offset: number, type?: 'month' | 'year') => {
            let newDate = localDate;
            const prop = type === 'month' ? 'months' : 'years';
            newDate = add(newDate, { [prop]: offset });

            if (isNotInRange(newDate)) return;

            setStore(() => ({
                localDate: newDate,
            }));
        },
        [isNotInRange, localDate, setStore],
    );

    const handleChangePrevious = useMemo(() => handleChange.bind(null, -1), [handleChange]);
    const handleChangeNext = useMemo(() => handleChange.bind(null, 1), [handleChange]);

    return (
        <View>
            <View style={containerStyle} pointerEvents={'box-none'}>
                <HeaderItem
                    selecting={!!pickerType}
                    type="month"
                    value={monthName}
                    onNext={handleChangeNext}
                    onPrev={handleChangePrevious}
                    onPressDropdown={handlePressDropDown}
                    pickerType={pickerType}
                />
                <HeaderItem
                    selecting={!!pickerType}
                    type="year"
                    value={localDate.getFullYear()}
                    onNext={handleChangeNext}
                    onPrev={handleChangePrevious}
                    onPressDropdown={handlePressDropDown}
                    pickerType={pickerType}
                />
            </View>
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
