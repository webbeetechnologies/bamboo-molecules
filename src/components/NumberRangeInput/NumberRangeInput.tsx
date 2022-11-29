import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { NumberInputProps } from '../NumberInput';
import { isNil } from '../../utils';

export type Props = ViewProps & {
    inputsContainerStyle?: ViewProps;
    dividerStyle?: ViewProps;
    min?: string;
    max?: string;
    onChange?: (args: { min: string; max: string }) => void;
    minInputProps?: Omit<NumberInputProps, 'variant' | 'value' | 'onChangeText' | 'onChange'>;
    maxInputProps?: Omit<NumberInputProps, 'variant' | 'value' | 'onChangeText' | 'onChange'>;
    variant?: NumberInputProps['variant'];
    errorMessage?: string;
};

const NumberRangeInput = ({
    variant = 'flat',
    inputsContainerStyle: inputsContainerStyleProp = {},
    dividerStyle: dividerStyleProp = {},
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
    min,
    max,
    onChange,
    errorMessage = 'Invalid number range.',
    style,
    ...rest
}: Props) => {
    const { View, InputGroup, NumberInput, HelperText } = useMolecules();
    const componentStyles = useComponentStyles('NumberRangeInput', [
        style,
        {
            inputsContainer: inputsContainerStyleProp,
            minInput: minInputStyleProp,
            maxInput: maxInputStyleProp,
            divider: dividerStyleProp,
        },
    ]);
    const [value, onValueChange] = useControlledValue({
        value: min === undefined || max === undefined ? undefined : { min, max },
        onChange,
    });
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isTouched, setIsTouched] = useState(false); // TODO - create a hook

    const { containerStyle, inputsContainerStyle, minInputStyle, maxInputStyle, errorTextStyle } =
        useMemo(() => {
            const { inputsContainer, minInput, maxInput, errorText, ...restStyle } =
                componentStyles;

            return {
                containerStyle: restStyle,
                inputsContainerStyle: inputsContainer,
                minInputStyle: minInput,
                maxInputStyle: maxInput,
                errorTextStyle: errorText,
            };
        }, [componentStyles]);

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

            if (!isFocused) setIsFocused(true);

            if (type === 'min') {
                onFocusMinInput?.(args);
                return;
            }

            onFocusMaxInput?.(args);
        },
        [isFocused, isTouched, onFocusMaxInput, onFocusMinInput],
    );

    const onBlur = useCallback(
        (args: any, type: 'min' | 'max') => {
            if (isFocused) setIsFocused(false);

            if (type === 'min') {
                onBlurMinInput?.(args);
                return;
            }

            onBlurMaxInput?.(args);
        },
        [isFocused, onBlurMaxInput, onBlurMinInput],
    );

    useEffect(() => {
        if (
            !isTouched ||
            isFocused ||
            value?.min === '' ||
            value?.max === '' ||
            isNil(value?.min) ||
            isNil(value?.max)
        )
            return;

        setError(Number(value?.min) > Number(value?.max));
    }, [isFocused, isTouched, value?.max, value?.min]);

    return (
        <View style={containerStyle}>
            <InputGroup style={inputsContainerStyle} {...rest}>
                <NumberInput
                    label="min"
                    {...minInputProps}
                    variant={variant}
                    containerStyle={minInputStyle}
                    value={value?.min}
                    onChangeText={text => onInputChange('min', text)}
                    onFocus={(args: any) => onFocus(args, 'min')}
                    onBlur={(args: any) => onBlur(args, 'min')}
                />
                <NumberInput
                    label="max"
                    {...maxInputProps}
                    variant={variant}
                    containerStyle={maxInputStyle}
                    value={value?.max}
                    onChangeText={text => onInputChange('max', text)}
                    onFocus={(args: any) => onFocus(args, 'max')}
                    onBlur={(args: any) => onBlur(args, 'max')}
                />
            </InputGroup>
            {error && <HelperText style={errorTextStyle}>{errorMessage}</HelperText>}
        </View>
    );
};

export default memo(NumberRangeInput);
