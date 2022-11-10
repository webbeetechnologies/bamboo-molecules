import { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DisableWeekDaysType } from '../DatePickerInput/dateUtils';
import DayNames, { dayNamesHeight } from './DayNames';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    scrollMode: 'horizontal' | 'vertical';
    onPrev: () => any;
    onNext: () => any;
    disableWeekDays?: DisableWeekDaysType;
    style?: ViewStyle;
};

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

function DatePickerInline({
    scrollMode,
    onPrev,
    onNext,
    disableWeekDays,
    style: styleProp,
}: CalendarHeaderProps) {
    const { IconButton } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_Header', styleProp);

    const isHorizontal = scrollMode === 'horizontal';

    const { containerStyle, buttonContainerStyle, buttonWrapperStyle, spacerStyle } =
        useMemo(() => {
            const { datePickerHeader, buttonContainer, buttonWrapper, spacer, ...rest } =
                componentStyles;

            return {
                containerStyle: [datePickerHeader, rest],
                buttonContainerStyle: buttonContainer,
                buttonWrapperStyle: buttonWrapper,
                spacerStyle: spacer,
            };
        }, [componentStyles]);

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            <>
                {isHorizontal ? (
                    <View style={buttonContainerStyle} pointerEvents={'box-none'}>
                        <View style={spacerStyle} pointerEvents={'box-none'} />
                        <View style={buttonWrapperStyle}>
                            <IconButton
                                type="material-community"
                                name="chevron-left"
                                accessibilityLabel={'Previous'}
                                onPress={onPrev}
                            />
                        </View>

                        <View style={buttonWrapperStyle}>
                            <IconButton
                                name="chevron-right"
                                accessibilityLabel={'Next'}
                                onPress={onNext}
                            />
                        </View>
                    </View>
                ) : null}
            </>
            <DayNames disableWeekDays={disableWeekDays} />
        </View>
    );
}

export default memo(DatePickerInline);
