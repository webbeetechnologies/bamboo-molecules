import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInline/dateUtils';
import DayNames, { dayNamesHeight } from '../DatePickerInline/DayNames';
import HeaderItem from '../DatePickerInline/HeaderItem';
import { useStore } from './DatePickerDocked';
import { format, setMonth, setYear } from 'date-fns';

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
    const [{ localDate, pickerType, startDateYear, endDateYear }, setStore] = useStore(
        state => state,
    );

    const componentStyles = useComponentStyles('DatePickerDocked_Header', styleProp);

    const { monthName } = useMemo(() => {
        const monthNameStr = format(localDate, 'MMM');
        return { monthName: monthNameStr };
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
            setStore(prev => ({
                ...prev,
                pickerType: pickerType ? undefined : type,
            }));
        },
        [setStore, pickerType],
    );

    const handleOnPrevious = useCallback(
        (type?: 'month' | 'year') => {
            let newDate = localDate;
            if (type === 'month') {
                if (newDate.getMonth() === 0) {
                    if (newDate.getFullYear() !== startDateYear) {
                        newDate = setMonth(newDate, 11);
                        newDate = setYear(newDate, newDate.getFullYear() - 1);
                    }
                } else {
                    newDate = setMonth(newDate, newDate.getMonth() - 1);
                }
            } else {
                newDate = setYear(newDate, newDate.getFullYear() - 1);
            }
            setStore(prev => ({
                ...prev,
                localDate: newDate,
            }));
        },
        [localDate, setStore, startDateYear],
    );

    const handleOnNext = useCallback(
        (type?: 'month' | 'year') => {
            let newDate = localDate;
            if (type === 'month') {
                if (newDate.getMonth() === 11) {
                    if (newDate.getFullYear() !== endDateYear) {
                        newDate = setMonth(newDate, 0);
                        newDate = setYear(newDate, newDate.getFullYear() + 1);
                    }
                } else {
                    newDate = setMonth(newDate, newDate.getMonth() + 1);
                }
            } else {
                newDate = setYear(newDate, newDate.getFullYear() + 1);
            }
            setStore(prev => ({
                ...prev,
                localDate: newDate,
            }));
        },
        [localDate, setStore, endDateYear],
    );

    return (
        <View>
            <View style={containerStyle} pointerEvents={'box-none'}>
                <HeaderItem
                    selecting={!!pickerType}
                    type="month"
                    value={monthName}
                    onNext={handleOnNext}
                    onPrev={handleOnPrevious}
                    onPressDropdown={handlePressDropDown}
                    startYear={startDateYear}
                    endYear={endDateYear}
                    pickerType={pickerType}
                />
                <HeaderItem
                    selecting={!!pickerType}
                    type="year"
                    value={localDate.getFullYear()}
                    onNext={handleOnNext}
                    onPrev={handleOnPrevious}
                    onPressDropdown={handlePressDropDown}
                    startYear={startDateYear}
                    endYear={endDateYear}
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
