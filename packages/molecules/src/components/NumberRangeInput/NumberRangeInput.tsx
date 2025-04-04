import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleProp, View, ViewStyle, type ViewProps } from 'react-native';
import { useControlledValue } from '../../hooks';
import { NumberInput, type NumberInputProps } from '../NumberInput';
import { isNil } from '../../utils';
import { ElementGroup } from '../ElementGroup';
import { HelperText } from '../HelperText';
import { numberRangeInputStyles } from './utils';

type Value = {
    min: string;
    max: string;
};

export type Props = ViewProps & {
    inputsContainerStyle?: ViewProps;
    value: Value;
    onChange: (args: { min: string; max: string }) => void;
    minInputProps?: Omit<NumberInputProps, 'variant' | 'value' | 'onChangeText' | 'onChange'>;
    maxInputProps?: Omit<NumberInputProps, 'variant' | 'value' | 'onChangeText' | 'onChange'>;
    variant?: NumberInputProps['variant'];
    errorMessage?: string;
};

const NumberRangeInput = ({
    variant = 'flat',
    inputsContainerStyle: inputsContainerStyleProp = {},
    minInputProps: {
        style: minInputStyleProp = {},
        onFocus: onFocusMinInput,
        onBlur: onBlurMinInput,
        ...minInputProps
    } = {},
    maxInputProps: {
        style: maxInputStyleProp = {},
        onFocus: onFocusMaxInput,
        onBlur: onBlurMaxInput,
        ...maxInputProps
    } = {},
    value: valueProp,
    onChange,
    errorMessage = 'Invalid number range.',
    style,
    ...rest
}: Props) => {
    const [value, onValueChange] = useControlledValue({
        value: valueProp,
        onChange,
    });
    const [error, setError] = useState(false);
    const [isTouched, setIsTouched] = useState(false); // TODO - create a hook

    const { containerStyle, inputsContainerStyle, minInputStyle, maxInputStyle, errorTextStyle } =
        useMemo(() => {
            const { minInput, maxInput, errorText } = numberRangeInputStyles;

            return {
                containerStyle: [numberRangeInputStyles.root, style],
                inputsContainerStyle: inputsContainerStyleProp,
                minInputStyle: [minInput, minInputStyleProp] as StyleProp<ViewStyle>,
                maxInputStyle: [maxInput, maxInputStyleProp],
                errorTextStyle: errorText,
            };
        }, [inputsContainerStyleProp, maxInputStyleProp, minInputStyleProp, style]);

    const onInputChange = useCallback(
        (type: 'min' | 'max', text: string) => {
            const newValue = {
                ...(value || {}),
                [type]: text,
            };

            onValueChange(newValue);
        },
        [onValueChange, value],
    );

    const onFocus = useCallback(
        (args: any, type: 'min' | 'max') => {
            if (!isTouched) setIsTouched(true);

            if (type === 'min') {
                onFocusMinInput?.(args);
                return;
            }

            onFocusMaxInput?.(args);
        },
        [isTouched, onFocusMaxInput, onFocusMinInput],
    );

    const onBlur = useCallback(
        (args: any, type: 'min' | 'max') => {
            if (type === 'min') {
                onBlurMinInput?.(args);
                return;
            }

            onBlurMaxInput?.(args);
        },
        [onBlurMaxInput, onBlurMinInput],
    );

    useEffect(() => {
        if (
            !isTouched ||
            value?.min === '' ||
            value?.max === '' ||
            isNil(value?.min) ||
            isNil(value?.max)
        )
            return;

        setError(Number(value?.min) > Number(value?.max));
    }, [isTouched, value?.max, value?.min]);

    return (
        <View style={containerStyle}>
            <ElementGroup style={inputsContainerStyle} {...rest}>
                <NumberInput
                    label="min"
                    {...minInputProps}
                    variant={variant}
                    containerStyle={minInputStyle}
                    value={value?.min}
                    onChangeText={useCallback(
                        (text: string) => onInputChange('min', text),
                        [onInputChange],
                    )}
                    onFocus={useCallback((args: any) => onFocus(args, 'min'), [onFocus])}
                    onBlur={useCallback((args: any) => onBlur(args, 'min'), [onBlur])}
                />
                <NumberInput
                    label="max"
                    {...maxInputProps}
                    variant={variant}
                    containerStyle={maxInputStyle}
                    value={value?.max}
                    onChangeText={useCallback(
                        (text: string) => onInputChange('max', text),
                        [onInputChange],
                    )}
                    onFocus={useCallback((args: any) => onFocus(args, 'max'), [onFocus])}
                    onBlur={useCallback((args: any) => onBlur(args, 'max'), [onBlur])}
                />
            </ElementGroup>
            {error && <HelperText style={errorTextStyle}>{errorMessage}</HelperText>}
        </View>
    );
};

export default memo(NumberRangeInput);
