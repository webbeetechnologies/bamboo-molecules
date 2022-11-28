import { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { NumberInputProps } from '../NumberInput';

export type Props = ViewProps & {
    minInputStyle?: ViewProps;
    maxInputStyle?: ViewProps;
    dividerStyle?: ViewProps;
    min?: string;
    max?: string;
    onChange?: (args: { min: string; max: string }) => void;
    minInputProps?: Omit<NumberInputProps, 'value' | 'onChangeText' | 'onChange'>;
    maxInputProps?: Omit<NumberInputProps, 'value' | 'onChangeText' | 'onChange'>;
};

const NumberRangeInput = ({
    dividerStyle: dividerStyleProp = {},
    minInputProps: { style: minInputStyleProp, ...minInputProps } = {},
    maxInputProps: { style: maxInputStyleProp, ...maxInputProps } = {},
    min,
    max,
    onChange,
    style,
    ...rest
}: Props) => {
    const { View, Text, NumberInput, HelperText } = useMolecules();
    const componentStyles = useComponentStyles('NumberRangeInput', [
        style,
        {
            minInput: minInputStyleProp,
            maxInput: maxInputStyleProp,
            divider: dividerStyleProp,
        },
    ]);
    const [value, onValueChange] = useControlledValue({
        value: min === undefined || max === undefined ? undefined : { min, max },
        onChange,
    });
    const timeout = useRef<any>(null);
    const [error, setError] = useState('');

    const { containerStyle, minInputStyle, maxInputStyle, dividerStyle, errorTextStyle } =
        useMemo(() => {
            const { minInput, maxInput, divider, errorText, ...restStyle } = componentStyles;

            return {
                containerStyle: restStyle,
                minInputStyle: minInput,
                maxInputStyle: maxInput,
                dividerStyle: divider,
                errorTextStyle: errorText,
            };
        }, [componentStyles]);

    const onDoneTyping = useCallback(
        ({ min: minValue, max: maxValue }: { min: string; max: string }) => {
            if (Number(minValue) > Number(maxValue)) {
                setError('Error');
            } else {
                setError('');
            }
        },
        [],
    );

    const onInputChange = useCallback(
        (type: 'min' | 'max', text: string) => {
            const newValue = {
                ...(value || {}),
                [type]: text,
            };

            onValueChange(newValue);

            clearTimeout(timeout?.current);
            timeout.current = setTimeout(() => onDoneTyping(newValue), 2000);
        },
        [onDoneTyping, onValueChange, value],
    );

    return (
        <>
            <View style={containerStyle} {...rest}>
                <NumberInput
                    label="min"
                    {...minInputProps}
                    containerStyle={minInputStyle}
                    value={value?.min}
                    onChangeText={text => onInputChange('min', text)}
                />
                <Text style={dividerStyle}>-</Text>
                <NumberInput
                    label="max"
                    {...maxInputProps}
                    containerStyle={maxInputStyle}
                    value={value?.max}
                    onChangeText={text => onInputChange('max', text)}
                />
            </View>
            {error && <HelperText style={errorTextStyle}>{error}</HelperText>}
        </>
    );
};

export default memo(NumberRangeInput);
