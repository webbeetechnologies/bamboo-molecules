import { memo, useCallback, useMemo } from 'react';
import { useDatePickerStoreValue } from './DatePickerInlineBase';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { IconButton } from '../IconButton';
import { TouchableRipple } from '../TouchableRipple';
import { datePickerHeaderItemStyles } from '../DatePickerDocked';

function HeaderItem({
    value,
    selecting,
    type,
    pickerType,
    onPressDropdown,
    onNext,
    onPrev,
}: {
    value: number | string;
    type?: 'month' | 'year';
    selecting?: boolean;
    pickerType: 'month' | 'year' | undefined;
    onPressDropdown?: (type: 'month' | 'year') => void;
    onNext?: (type: 'month' | 'year' | undefined) => void;
    onPrev?: (type: 'month' | 'year' | undefined) => void;
}) {
    const { startDateYear, endDateYear } = useDatePickerStoreValue(state => ({
        startDateYear: state.startDateYear,
        endDateYear: state.endDateYear,
    }));
    const disabled = pickerType && pickerType !== type;

    const handlePressDropDown = useCallback(() => {
        type && onPressDropdown && onPressDropdown(type);
    }, [onPressDropdown, type]);

    const handleOnPrevious = useCallback(() => {
        onPrev && onPrev(type);
    }, [onPrev, type]);

    const handleOnNext = useCallback(() => {
        onNext && onNext(type);
    }, [onNext, type]);

    const containerStyle = useMemo(
        () =>
            [
                datePickerHeaderItemStyles.buttonContainer,
                {
                    justifyContent: !onPressDropdown
                        ? 'flex-end'
                        : !onNext
                        ? 'flex-start'
                        : 'center',
                },
            ] as StyleProp<ViewStyle>,
        [onPressDropdown, onNext],
    );

    return (
        <View style={containerStyle} pointerEvents={'box-none'}>
            {!selecting && onPrev && (
                <View style={datePickerHeaderItemStyles.buttonWrapper}>
                    <IconButton
                        type="material-community"
                        name="chevron-left"
                        size="sm"
                        // Todo: Translate
                        accessibilityLabel={'Previous'}
                        onPress={handleOnPrevious}
                        disabled={value === startDateYear}
                    />
                </View>
            )}
            {type && (
                <TouchableRipple
                    disabled={disabled}
                    onPress={handlePressDropDown}
                    accessibilityRole="button"
                    accessibilityLabel={`${value}`}
                    style={datePickerHeaderItemStyles.buttonStyle}>
                    <View style={datePickerHeaderItemStyles.innerStyle}>
                        <Text style={datePickerHeaderItemStyles.labelStyle} selectable={false}>
                            {value}
                        </Text>
                        <IconButton
                            onPress={handlePressDropDown}
                            name={selecting && type === pickerType ? 'menu-up' : 'menu-down'}
                            size="xs"
                            disabled={disabled}
                        />
                    </View>
                </TouchableRipple>
            )}
            {!selecting && onNext && (
                <View style={datePickerHeaderItemStyles.buttonWrapper}>
                    <IconButton
                        name="chevron-right"
                        size="sm"
                        // Todo: Translate
                        accessibilityLabel={'Next'}
                        onPress={handleOnNext}
                        disabled={value === endDateYear}
                    />
                </View>
            )}
        </View>
    );
}

export default memo(HeaderItem);
