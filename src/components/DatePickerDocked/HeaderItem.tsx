import { useComponentStyles } from '@bambooapp/bamboo-atoms';
import { memo, useCallback, useMemo } from 'react';
import { useMolecules } from '../../hooks';

function HeaderItem({
    value,
    onNext,
    onPrev,
    disabled,
    onPressDropdown,
    selecting,
    type,
}: {
    value: number | string;
    onNext: () => any;
    onPrev: () => any;
    disabled: boolean;
    type: 'month' | 'year' | undefined;
    onPressDropdown: (type: 'month' | 'year' | undefined) => void;
    selecting: boolean;
}) {
    const { View, IconButton, TouchableRipple, Text } = useMolecules();
    const headerItemStyles = useComponentStyles('DatePicker_HeaderItem');

    const {
        buttonContainerStyle,
        buttonWrapperStyle,
        spacerStyle,
        buttonStyle,
        innerStyle,
        labelStyle,
        iconContainerStyle,
        emtpyViewStyle,
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
            emtpyViewStyle: emtpyView,
        };
    }, [headerItemStyles]);

    const handlePressDropDown = useCallback(() => {
        onPressDropdown(type);
    }, [onPressDropdown, type]);

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
                        disabled={value === 1800}
                    />
                </View>
            ) : (
                <View style={emtpyViewStyle} />
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
                            name={selecting ? 'menu-up' : 'menu-down'}
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
                        disabled={value === 2200}
                    />
                </View>
            ) : (
                <View style={emtpyViewStyle} />
            )}
        </View>
    );
}

export default memo(HeaderItem);
