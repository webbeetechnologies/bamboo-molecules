import { useState, useEffect, forwardRef, useMemo } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

import { useMolecules, useCurrentTheme, useComponentStyles } from '../../hooks';
import { inputTypes, PossibleClockTypes, PossibleInputTypes } from './timeUtils';

interface TimeInputProps extends Omit<Omit<TextInputProps, 'value'>, 'onFocus'> {
    value: number;
    clockType: PossibleClockTypes;
    onPress?: (type: PossibleClockTypes) => any;
    pressed: boolean;
    onChanged: (n: number) => any;
    inputType: PossibleInputTypes;
}

function TimeInput(
    { value, clockType, pressed, onPress, onChanged, inputType, ...rest }: TimeInputProps,
    ref: any,
) {
    const { TouchableRipple, View } = useMolecules();
    const [controlledValue, setControlledValue] = useState<string>(`${value}`);

    const onInnerChange = (text: string) => {
        setControlledValue(text);
        if (text !== '' && text !== '0') {
            onChanged(Number(text));
        }
    };

    useEffect(() => {
        setControlledValue(`${value}`);
    }, [value]);

    const theme = useCurrentTheme();
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    const highlighted = inputType === inputTypes.picker ? pressed : inputFocused;

    const componentStyles = useComponentStyles(
        'TimePicker_Input',
        {},
        {
            states: {
                highlighted,
            },
        },
    );

    let formattedValue = controlledValue;
    if (!inputFocused) {
        formattedValue =
            controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
    }

    const { rippleColor, containerStyle, textInputStyle, buttonStyle } = useMemo(() => {
        const { rippleColor: _rippleColor, container, input, button } = componentStyles;

        return {
            rippleColor: _rippleColor,
            containerStyle: container,
            textInputStyle: input,
            buttonStyle: [StyleSheet.absoluteFill, button],
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle}>
            <TextInput
                ref={ref}
                style={textInputStyle}
                value={formattedValue}
                maxLength={2}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                keyboardAppearance={theme.dark ? 'dark' : 'default'}
                keyboardType="number-pad"
                onChangeText={onInnerChange}
                {...rest}
            />
            <>
                {onPress && inputType === inputTypes.picker ? (
                    <TouchableRipple
                        style={buttonStyle}
                        rippleColor={rippleColor}
                        onPress={() => onPress(clockType)}
                        borderless={true}>
                        <View />
                    </TouchableRipple>
                ) : null}
            </>
        </View>
    );
}

export default forwardRef(TimeInput);
