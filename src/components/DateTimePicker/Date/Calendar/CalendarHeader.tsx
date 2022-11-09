import { memo, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useMolecules } from '../../../../hooks';
import { getTranslation } from '../../translations/utils';
import type { DisableWeekDaysType } from '../dateUtils';
import DayNames, { dayNamesHeight } from './DayNames';

const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;

export type CalendarHeaderProps = {
    locale: undefined | string;
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

function CalendarHeader({
    scrollMode,
    onPrev,
    onNext,
    disableWeekDays,
    locale,
    style: styleProp,
}: CalendarHeaderProps) {
    const { IconButton } = useMolecules();
    const isHorizontal = scrollMode === 'horizontal';

    const { containerStyle, buttonWrapperStyle } = useMemo(() => {
        const { backgroundColor, ...rest } = styleProp || {};

        return {
            containerStyle: [styles.datePickerHeader, rest],
            buttonWrapperStyle: [styles.buttonWrapper, { backgroundColor }],
        };
    }, [styleProp]);

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            <>
                {isHorizontal ? (
                    <View style={styles.buttonContainer} pointerEvents={'box-none'}>
                        <View style={styles.spacer} pointerEvents={'box-none'} />
                        <View style={buttonWrapperStyle}>
                            <IconButton
                                type="material-community"
                                name="chevron-left"
                                accessibilityLabel={getTranslation(locale, 'previous')}
                                onPress={onPrev}
                            />
                        </View>

                        <View style={buttonWrapperStyle}>
                            <IconButton
                                name="chevron-right"
                                accessibilityLabel={getTranslation(locale, 'next')}
                                onPress={onNext}
                            />
                        </View>
                    </View>
                ) : null}
            </>
            <DayNames disableWeekDays={disableWeekDays} locale={locale} />
        </View>
    );
}

const styles = StyleSheet.create({
    datePickerHeader: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
    },
    buttonContainer: {
        height: buttonContainerHeight,
        marginTop: buttonContainerMarginTop,
        marginBottom: buttonContainerMarginBottom,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {},
    spacer: { flex: 1 },
});

export default memo(CalendarHeader);
