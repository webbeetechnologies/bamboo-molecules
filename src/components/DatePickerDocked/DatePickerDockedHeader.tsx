import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInline/dateUtils';
import DayNames, { dayNamesHeight } from '../DatePickerInline/DayNames';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    locale?: string;
    scrollMode: 'horizontal' | 'vertical';
    onPrev: () => any;
    onNext: () => any;
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
    year: number;
    onPressYear: (year: number) => void;
    selectingYear: boolean;
    selectingMonth: boolean;
};

function DatePickerDockedHeader({
    locale = 'en',
    onPrev,
    onNext,
    disableWeekDays,
    style: styleProp,
    year,
    onPressYear,
    selectingYear,
    selectingMonth,
}: CalendarHeaderProps) {
    const { IconButton, View, TouchableRipple, Text } = useMolecules();
    const componentStyles = useComponentStyles('DatePickerDocked_Header', styleProp);

    const {
        containerStyle,
        buttonContainerStyle,
        buttonWrapperStyle,
        spacerStyle,
        yearButtonStyle,
        yearInnerStyle,
        yearLabelStyle,
        iconContainerStyle,
        daysWrapperStyle,
    } = useMemo(() => {
        const {
            datePickerHeader,
            buttonContainer,
            buttonWrapper,
            spacer,
            yearButtonStyle: yearButton,
            yearInnerStyle: yearInner,
            yearLabelStyle: yearLabel,
            daysWrapperStyle: daysWrapper,
            ...rest
        } = componentStyles;

        return {
            containerStyle: [datePickerHeader, rest],
            buttonContainerStyle: buttonContainer,
            buttonWrapperStyle: buttonWrapper,
            spacerStyle: spacer,
            yearButtonStyle: yearButton,
            yearInnerStyle: yearInner,
            yearLabelStyle: yearLabel,
            iconContainerStyle: { opacity: 1 },
            daysWrapperStyle: daysWrapper,
        };
    }, [componentStyles]);

    const onPressDropdown = useCallback(() => onPressYear(year), [onPressYear, year]);

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            <View style={buttonContainerStyle} pointerEvents={'box-none'}>
                <View style={spacerStyle} pointerEvents={'box-none'} />
                <View style={buttonWrapperStyle}>
                    <IconButton
                        type="material-community"
                        name="chevron-left"
                        size="sm"
                        accessibilityLabel={'Previous'}
                        onPress={onPrev}
                        disabled={year === 1800 || selectingYear || selectingMonth}
                    />
                </View>
                <TouchableRipple
                    disabled={selectingMonth}
                    onPress={onPressDropdown}
                    accessibilityRole="button"
                    accessibilityLabel={`${year}`}
                    style={yearButtonStyle}>
                    <View style={yearInnerStyle}>
                        <Text style={yearLabelStyle} selectable={false}>
                            {year}
                        </Text>
                        <View style={iconContainerStyle}>
                            <IconButton
                                onPress={onPressDropdown}
                                name={selectingYear ? 'menu-up' : 'menu-down'}
                                size="xs"
                                disabled={selectingMonth}
                            />
                        </View>
                    </View>
                </TouchableRipple>
                <View style={buttonWrapperStyle}>
                    <IconButton
                        name="chevron-right"
                        size="sm"
                        accessibilityLabel={'Next'}
                        onPress={onNext}
                        disabled={year === 2200 || selectingYear || selectingMonth}
                    />
                </View>
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
