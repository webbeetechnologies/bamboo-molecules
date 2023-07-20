import { useComponentStyles } from '@bambooapp/bamboo-atoms';
import { memo, useCallback, useMemo } from 'react';
import { useMolecules } from '../../hooks';
import { useStore } from './DatePickerDocked';

function HeaderItem({
    value,
    onNext,
    onPrev,
    selecting,
    type,
}: {
    value: number | string;
    onNext: () => any;
    onPrev: () => any;
    type: 'month' | 'year' | undefined;
    selecting: boolean;
}) {
    const { View, IconButton, TouchableRipple, Text } = useMolecules();
    const [{ startDateYear, endDateYear, pickerType }, setStore] = useStore(state => state);
    const headerItemStyles = useComponentStyles('DatePicker_HeaderItem');
    const disabled = pickerType && pickerType !== type;

    const {
        buttonContainerStyle,
        buttonWrapperStyle,
        spacerStyle,
        buttonStyle,
        innerStyle,
        labelStyle,
        iconContainerStyle,
        emptyViewStyle,
    } = useMemo(() => {
        const {
            buttonContainer,
            buttonWrapper,
            spacer,
            buttonStyle: _buttonStyle,
            innerStyle: _innerStyle,
            labelStyle: _labelStyle,
            emtpyView,
        } = headerItemStyles;

        return {
            buttonContainerStyle: buttonContainer,
            buttonWrapperStyle: buttonWrapper,
            spacerStyle: spacer,
            buttonStyle: _buttonStyle,
            innerStyle: _innerStyle,
            labelStyle: _labelStyle,
            iconContainerStyle: { opacity: 1 },
            emptyViewStyle: emtpyView,
        };
    }, [headerItemStyles]);

    const handlePressDropDown = useCallback(() => {
        setStore(prev => ({
            ...prev,
            pickerType: pickerType ? undefined : type,
        }));
    }, [setStore, type, pickerType]);

    return (
        <View style={buttonContainerStyle} pointerEvents={'box-none'}>
            <View style={spacerStyle} pointerEvents={'box-none'} />
            {!selecting ? (
                <View style={buttonWrapperStyle}>
                    <IconButton
                        type="material-community"
                        name="chevron-left"
                        size="sm"
                        // Todo: Translate
                        accessibilityLabel={'Previous'}
                        onPress={onPrev}
                        disabled={value === startDateYear}
                    />
                </View>
            ) : (
                <View style={emptyViewStyle} />
            )}
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
            {!selecting ? (
                <View style={buttonWrapperStyle}>
                    <IconButton
                        name="chevron-right"
                        size="sm"
                        // Todo: Translate
                        accessibilityLabel={'Next'}
                        onPress={onNext}
                        disabled={value === endDateYear}
                    />
                </View>
            ) : (
                <View style={emptyViewStyle} />
            )}
        </View>
    );
}

export default memo(HeaderItem);
