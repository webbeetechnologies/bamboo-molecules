import { useRef, memo, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { FlatListRef } from '../FlatList';
import { range } from '../../utils/dateTimePicker';
import { MONTHS_DATA } from './utils';
import { useStore } from './DatePickerDocked';

export default function MonthPicker({
    onChange,
}: {
    onChange: (month: number, type: 'month' | 'year') => any;
}) {
    const [{ localDate, pickerType }] = useStore(state => state);
    const { FlatList, View, HorizontalDivider } = useMolecules();
    const monthPickerStyles = useComponentStyles('DatePickerDocked_MonthPicker');
    const flatList = useRef<FlatListRef<number> | null>(null);
    const months = range(0, 11);
    const selectingMonth = pickerType === 'month';

    const { containerStyle, monthStyle } = useMemo(() => {
        const { backgroundColor, ...rest } = monthPickerStyles;

        return {
            containerStyle: [
                StyleSheet.absoluteFill,
                styles.root,
                { backgroundColor },
                selectingMonth ? styles.opacity1 : styles.opacity0,
            ],
            monthStyle: rest,
        };
    }, [selectingMonth, monthPickerStyles]);

    const handleOnChange = useCallback(
        (month: number) => {
            onChange(month, 'month');
        },
        [onChange],
    );

    const renderItem = useCallback(
        ({ item }: { item: number }) => {
            return (
                <Month
                    month={item}
                    selected={localDate.getMonth() === item}
                    onPressMonth={handleOnChange}
                    monthStyles={monthStyle}
                />
            );
        },
        [localDate, handleOnChange, monthStyle],
    );

    if (!selectingMonth) {
        return null;
    }

    return (
        <View style={containerStyle} pointerEvents={selectingMonth ? 'auto' : 'none'}>
            <HorizontalDivider />
            <FlatList<number>
                ref={flatList}
                style={styles.list}
                data={months}
                renderItem={renderItem}
                keyExtractor={item => `${item}`}
            />
        </View>
    );
}

function MonthPure({
    month,
    selected,
    onPressMonth,
    monthStyles,
}: {
    month: number;
    selected: boolean;
    onPressMonth: (newMonth: number) => any;
    monthStyles: Record<string, any>;
}) {
    const { TouchableRipple, Text, View, Icon } = useMolecules();
    const montLocalStyles = useComponentStyles('DatePickerDocked_Month', monthStyles, {
        states: {
            selected,
        },
    });
    const {
        containerStyle,
        monthInnerStyle,
        monthLabelStyle,
        monthButtonStyle,
        accessibilityState,
    } = useMemo(() => {
        const { month: monthStyle, monthInner, monthLabel, monthButton } = montLocalStyles;

        return {
            containerStyle: monthStyle,
            monthInnerStyle: monthInner,
            monthLabelStyle: monthLabel,
            monthButtonStyle: monthButton,
            accessibilityState: { selected },
        };
    }, [selected, montLocalStyles]);

    const handleMonthPress = useCallback(() => {
        onPressMonth(month);
    }, [onPressMonth, month]);

    return (
        <View style={containerStyle}>
            <TouchableRipple
                onPress={handleMonthPress}
                accessibilityRole="button"
                accessibilityLabel={String(month)}
                accessibilityState={accessibilityState}
                style={monthButtonStyle}>
                <View style={monthInnerStyle}>
                    {selected ? (
                        <View style={styles.checkIconView}>
                            <Icon name="check" size={24} />
                        </View>
                    ) : (
                        <View style={styles.spacer} />
                    )}
                    <Text style={monthLabelStyle} selectable={false}>
                        {MONTHS_DATA[month]}
                    </Text>
                </View>
            </TouchableRipple>
        </View>
    );
}
const Month = memo(MonthPure);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        top: 56,
        zIndex: 100,
    },

    checkIconView: {
        marginHorizontal: 'spacings.4',
    },

    spacer: {
        width: 54,
    },

    list: {
        flex: 1,
    },
    opacity0: {
        opacity: 0,
    },
    opacity1: {
        opacity: 1,
    },
});
