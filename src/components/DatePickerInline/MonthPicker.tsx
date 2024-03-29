import { useRef, memo, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { FlatListRef } from '../FlatList';
import { range } from '../../utils/dateTimePicker';
import { useDatePickerStore, useDatePickerStoreValue } from './DatePickerInlineBase';
import { format, setMonth } from 'date-fns';

export default function MonthPicker() {
    const [_, setStore] = useDatePickerStore(state => state);
    const { localDate, selectingMonth } = useDatePickerStoreValue(state => ({
        localDate: state.localDate,
        selectingMonth: state.pickerType === 'month',
    }));
    const { FlatList, View, HorizontalDivider } = useMolecules();
    const monthPickerStyles = useComponentStyles('DatePickerDocked_MonthPicker');
    const flatList = useRef<FlatListRef<number> | null>(null);
    const months = range(0, 11);

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
            setStore(prev => ({
                localDate: setMonth(prev.localDate, month),
                pickerType: undefined,
            }));
        },
        [setStore],
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
    const { Text, View, Icon, ListItem } = useMolecules();
    const montLocalStyles = useComponentStyles('DatePickerDocked_MonthItem', monthStyles, {
        states: {
            selected,
        },
    });
    const { monthInnerStyle, monthLabelStyle, monthButtonStyle, accessibilityState } =
        useMemo(() => {
            const { monthInner, monthLabel, monthButton } = montLocalStyles;

            return {
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
        <ListItem
            onPress={handleMonthPress}
            accessibilityRole="button"
            accessibilityLabel={String(month)}
            accessibilityState={accessibilityState}
            style={monthButtonStyle}
            testID={`pick-month-${month}`}
            left={
                selected ? (
                    <View style={styles.checkIconView}>
                        <Icon name="check" size={24} />
                    </View>
                ) : (
                    <View style={styles.spacer} />
                )
            }>
            <View style={monthInnerStyle}>
                <Text style={monthLabelStyle} selectable={false}>
                    {format(new Date(2000, month, 1), 'MMMM')}
                </Text>
            </View>
        </ListItem>
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
        marginLeft: 'spacings.4',
    },

    spacer: {
        width: 44,
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
