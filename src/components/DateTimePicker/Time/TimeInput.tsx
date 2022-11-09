import { useState, useEffect, forwardRef, useMemo } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import Color from 'color';

import { useMolecules, useCurrentTheme } from '../../../hooks';
import { inputTypes, PossibleClockTypes, PossibleInputTypes, useInputColors } from './timeUtils';

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

    const { color, backgroundColor } = useInputColors(highlighted);

    let formattedValue = controlledValue;
    if (!inputFocused) {
        formattedValue =
            controlledValue.length === 1 ? `0${controlledValue}` : `${controlledValue}`;
    }

    const { textInputStyle, buttonStyle } = useMemo(() => {
        return {
            textInputStyle: [
                styles.input,
                {
                    color,
                    backgroundColor,
                    borderRadius: theme.roundness['1'] as number,
                },
            ],
            buttonStyle: [
                StyleSheet.absoluteFill,
                styles.buttonOverlay,
                {
                    // backgroundColor: 'blue',
                    borderRadius: theme.roundness['1'] as number,
                },
            ],
        };
    }, [backgroundColor, color, theme.roundness]);

    return (
        <View style={styles.root}>
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
                        rippleColor={Color(theme.colors.primary).fade(0.7).hex()}
                        onPress={() => onPress(clockType)}
                        borderless={true}>
                        <View />
                    </TouchableRipple>
                ) : null}
            </>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { position: 'relative', height: 80, width: 96 },
    input: {
        fontSize: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 96,
        height: 80,
    },
    buttonOverlay: { overflow: 'hidden' },
});

export default forwardRef(TimeInput);
