import { useRef, useEffect, memo, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useMolecules } from '../../../../hooks';
import { range } from '../../utils';

const ITEM_HEIGHT = 62;

export default function YearPicker({
    selectedYear,
    selectingYear,
    onPressYear,
    startYear,
    endYear,
    yearPickerStyles,
}: {
    selectedYear: number | undefined;
    selectingYear: boolean;
    onPressYear: (year: number) => any;
    startYear: number;
    endYear: number;
    yearPickerStyles: Record<string, any>;
}) {
    const flatList = useRef<FlatList<number> | null>(null);
    const years = range(isNaN(startYear) ? 1800 : startYear, isNaN(endYear) ? 2200 : endYear);

    // scroll to selected year
    useEffect(() => {
        if (flatList.current && selectedYear) {
            const indexToGo = selectedYear - startYear;
            flatList.current.scrollToOffset({
                offset: (indexToGo / 3) * ITEM_HEIGHT - ITEM_HEIGHT,
                animated: false,
            });
        }
    }, [flatList, selectedYear, startYear]);

    const { containerStyle } = useMemo(() => {
        return {
            containerStyle: [
                StyleSheet.absoluteFill,
                styles.root,
                { backgroundColor: yearPickerStyles?.backgroundColor as string },
                selectingYear ? styles.opacity1 : styles.opacity0,
            ],
        };
    }, [selectingYear, yearPickerStyles?.backgroundColor]);

    return (
        <View style={containerStyle} pointerEvents={selectingYear ? 'auto' : 'none'}>
            <FlatList<number>
                ref={flatList}
                style={styles.list}
                data={years}
                renderItem={({ item }) => (
                    <Year
                        year={item}
                        selected={selectedYear === item}
                        onPressYear={onPressYear}
                        yearStyles={yearPickerStyles}
                    />
                )}
                keyExtractor={item => `${item}`}
                numColumns={3}
            />
        </View>
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
    const { TouchableRipple, Text } = useMolecules();

    const { containerStyle, yearInnerStyle, yearLabelStyle, yearButtonStyle } = useMemo(() => {
        const {
            year: yearStyle,
            backgroundColor,
            yearInner,
            yearLabel,
            selectedYear,
            yearButton,
        } = yearStyles;

        return {
            containerStyle: yearStyle,
            yearInnerStyle: [yearInner, selected ? { backgroundColor } : null],
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
