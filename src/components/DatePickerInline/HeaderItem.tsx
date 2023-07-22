import { useComponentStyles } from '@bambooapp/bamboo-atoms';
import { memo, useCallback, useMemo } from 'react';
import { useMolecules } from '../../hooks';
import { useDatePickerStoreValue } from './DatePickerInlineBase';

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
    const { View, IconButton, TouchableRipple, Text } = useMolecules();
    const headerItemStyles = useComponentStyles('DatePicker_HeaderItem');
    const disabled = pickerType && pickerType !== type;

    const {
        buttonContainerStyle,
        buttonWrapperStyle,
        buttonStyle,
        innerStyle,
        labelStyle,
        iconContainerStyle,
    } = useMemo(() => {
        const {
            buttonContainer,
            buttonWrapper,
            spacer,
            buttonStyle: _buttonStyle,
            innerStyle: _innerStyle,
            labelStyle: _labelStyle,
        } = headerItemStyles;

        return {
            buttonContainerStyle: [
                buttonContainer,
                {
                    justifyContent: !onPressDropdown
                        ? 'flex-end'
                        : !onNext
                        ? 'flex-start'
                        : 'center',
                },
            ],
            buttonWrapperStyle: buttonWrapper,
            spacerStyle: spacer,
            buttonStyle: _buttonStyle,
            innerStyle: _innerStyle,
            labelStyle: _labelStyle,
            iconContainerStyle: { opacity: 1 },
        };
    }, [headerItemStyles, onNext, onPressDropdown]);

    const handlePressDropDown = useCallback(() => {
        type && onPressDropdown && onPressDropdown(type);
    }, [onPressDropdown, type]);

    const handleOnPrevious = useCallback(() => {
        onPrev && onPrev(type);
    }, [onPrev, type]);

    const handleOnNext = useCallback(() => {
        onNext && onNext(type);
    }, [onNext, type]);

    return (
        <View style={buttonContainerStyle} pointerEvents={'box-none'}>
            {!selecting && onPrev && (
                <View style={buttonWrapperStyle}>
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
                    style={buttonStyle}>
                    <View style={innerStyle}>
                        <Text style={labelStyle} selectable={false}>
                            {value}
                        </Text>
                        <View style={iconContainerStyle}>
                            <IconButton
                                onPress={handlePressDropDown}
                                name={selecting && type === pickerType ? 'menu-up' : 'menu-down'}
                                size="xs"
                                disabled={disabled}
                            />
                        </View>
                    </View>
                </TouchableRipple>
            )}
            {!selecting && onNext && (
                <View style={buttonWrapperStyle}>
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
