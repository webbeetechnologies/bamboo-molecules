import { useState, useEffect, forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useCurrentTheme, useComponentStyles } from '../../hooks';
import type { NumberInputProps } from '../NumberInput';
import { inputTypes, PossibleClockTypes, PossibleInputTypes } from './timeUtils';

interface TimeInputProps extends Omit<Omit<NumberInputProps, 'value' | 'variant'>, 'onFocus'> {
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
    const { NumberInput, TouchableRipple, View } = useMolecules();
    const [controlledValue, setControlledValue] = useState<string>(`${value}`);

    const onInnerChange = (text: string) => {
        setControlledValue(text);
        onChanged(Number(text));
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

    const formattedValue = useMemo(() => {
        let _formattedValue = controlledValue;

        if (!inputFocused) {
            _formattedValue =
                controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
        }

        return _formattedValue;
    }, [controlledValue, inputFocused]);

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
            <NumberInput
                variant="plain"
                ref={ref}
                inputStyle={textInputStyle}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                keyboardAppearance={theme.dark ? 'dark' : 'default'}
                value={formattedValue}
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
