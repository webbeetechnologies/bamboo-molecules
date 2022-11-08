import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useCurrentTheme, useMolecules } from '../../../../hooks';
import { daySize } from '../dateUtils';
import DayRange from './DayRange';

function EmptyDayPure() {
    return <View style={styles.empty} />;
}
export const EmptyDay = memo(EmptyDayPure);

function Day(props: {
    textColorOnPrimary: string;
    day: number;
    month: number;
    year: number;
    selected: boolean;
    inRange: boolean;
    leftCrop: boolean;
    rightCrop: boolean;
    primaryColor: string;
    selectColor: string;
    isToday: boolean;
    disabled: boolean;
    onPressDate: (date: Date) => any;
}) {
    const {
        day,
        month,
        year,
        selected,
        inRange,
        leftCrop,
        rightCrop,
        onPressDate,
        primaryColor,
        selectColor,
        isToday,
        disabled,
        textColorOnPrimary,
    } = props;
    // console.log(month, { day })
    const { TouchableRipple, Text } = useMolecules();
    const theme = useCurrentTheme();

    const onPress = useCallback(() => {
        onPressDate(new Date(year, month, day));
    }, [onPressDate, year, month, day]);

    const borderColor =
        selected || (inRange && theme.dark) ? textColorOnPrimary : theme.dark ? '#fff' : '#000';

    const textColor = selected || (inRange && theme.dark) ? textColorOnPrimary : undefined;

    const { containerStyle, buttonStyle, dayStyle, textStyle } = useMemo(() => {
        return {
            containerStyle: [styles.root, disabled && styles.disabled],
            buttonStyle: [styles.button, { backgroundColor: inRange ? selectColor : undefined }],
            dayStyle: [
                styles.day,
                isToday ? { borderColor: borderColor } : null,
                selected ? { backgroundColor: primaryColor } : null,
            ],
            textStyle: textColor ? { color: textColor } : undefined,
        };
    }, [borderColor, disabled, inRange, isToday, primaryColor, selectColor, selected, textColor]);

    return (
        <View style={containerStyle}>
            <DayRange
                inRange={inRange}
                leftCrop={leftCrop}
                rightCrop={rightCrop}
                selectColor={selectColor}
            />

            <TouchableRipple
                testID={`day-${year}-${month}-${day}`}
                disabled={disabled}
                borderless={true}
                onPress={disabled ? undefined : onPress}
                style={buttonStyle}
                accessibilityRole="button">
                <View style={dayStyle}>
                    <Text style={textStyle} selectable={false}>
                        {day}
                    </Text>
                </View>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        flexBasis: 0,
    },
    disabled: {
        opacity: 0.3,
    },
    root: {
        flexBasis: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    button: {
        width: daySize,
        height: daySize,
        overflow: 'hidden',
        borderRadius: daySize / 2,
    },
    day: {
        flexBasis: 0,
        flex: 1,
        borderRadius: daySize / 2,
        width: daySize,
        height: daySize,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    flex1: {
        flex: 1,
    },
});

export default memo(Day);
