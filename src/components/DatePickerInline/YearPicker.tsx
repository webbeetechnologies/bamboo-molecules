import { useRef, useEffect, memo, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { FlatListRef } from '../FlatList';
import { getYearRange } from '../../utils';
import { useStore } from './DatePickerInlineBase';
import { setYear } from 'date-fns';

const ITEM_HEIGHT = 62;

export default function YearPicker() {
    const [{ startDateYear, endDateYear, localDate, pickerType }, setStore] = useStore(
        state => state,
    );
    const { FlatList, View, HorizontalDivider } = useMolecules();
    const yearPickerStyles = useComponentStyles('DatePicker_YearPicker');
    const flatList = useRef<FlatListRef<number> | null>(null);
    const years = getYearRange(startDateYear, endDateYear);
    const selectingYear = pickerType === 'year';
    const selectedYear = localDate.getFullYear();

    // scroll to selected year
    useEffect(() => {
        if (flatList.current && selectingYear && selectedYear) {
            const indexToGo = selectedYear - years[0];
            flatList.current.scrollToOffset({
                offset: (indexToGo / 3) * ITEM_HEIGHT - ITEM_HEIGHT,
                animated: false,
            });
        }
    }, [flatList, selectedYear, selectingYear, years]);

    const { containerStyle, yearStyle } = useMemo(() => {
        const { backgroundColor, ...rest } = yearPickerStyles;

        return {
            containerStyle: [
                StyleSheet.absoluteFill,
                styles.root,
                { backgroundColor },
                selectingYear ? styles.opacity1 : styles.opacity0,
            ],
            yearStyle: rest,
        };
    }, [selectingYear, yearPickerStyles]);

    const handleOnChange = useCallback(
        (year: number) => {
            setStore(prev => ({
                ...prev,
                localDate: setYear(prev.localDate, year),
                pickerType: undefined,
            }));
        },
        [setStore],
    );

    return (
        <>
            {selectingYear && (
                <View style={containerStyle} pointerEvents={selectingYear ? 'auto' : 'none'}>
                    <HorizontalDivider />
                    <FlatList<number>
                        ref={flatList}
                        style={styles.list}
                        data={years}
                        renderItem={({ item }) => (
                            <Year
                                year={item}
                                selected={selectedYear === item}
                                onPressYear={handleOnChange}
                                yearStyles={yearStyle}
                            />
                        )}
                        keyExtractor={item => `${item}`}
                        numColumns={3}
                    />
                </View>
            )}
        </>
    );
}

function YearPure({
    year,
    selected,
    onPressYear,
    yearStyles,
}: {
    year: number;
    selected: boolean;
    onPressYear: (newYear: number) => any;
    yearStyles: Record<string, any>;
}) {
    const { TouchableRipple, Text, View } = useMolecules();

    const { containerStyle, yearInnerStyle, yearLabelStyle, yearButtonStyle } = useMemo(() => {
        const {
            year: yearStyle,
            yearInner,
            yearLabel,
            selectedYear,
            selectedYearInner,
            yearButton,
        } = yearStyles;

        return {
            containerStyle: yearStyle,
            yearInnerStyle: [yearInner, selected ? selectedYearInner : null],
            yearLabelStyle: [yearLabel, selected ? selectedYear : null],
            yearButtonStyle: yearButton,
        };
    }, [selected, yearStyles]);

    return (
        <View style={containerStyle}>
            <TouchableRipple
                onPress={() => onPressYear(year)}
                accessibilityRole="button"
                accessibilityLabel={String(year)}
                style={yearButtonStyle}>
                <View style={yearInnerStyle}>
                    <Text style={yearLabelStyle} selectable={false}>
                        {year}
                    </Text>
                </View>
            </TouchableRipple>
        </View>
    );
}
const Year = memo(YearPure);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        top: 56,
        zIndex: 100,
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
