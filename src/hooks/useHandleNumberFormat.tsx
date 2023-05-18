import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatNumberWithMask, isNil, normalizeToNumberString } from '../utils';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export type NumberMaskConfig = {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
    separator?: string;
    precision?: number;
    allowNegative?: boolean;
};

type DefaultPropsT = { [key: string]: any };

export type UseHandleNumberFormatProps<T extends DefaultPropsT = DefaultPropsT> = T & {
    value: number | null;
    onChangeText: (newValue: number | null) => void;
    config?: NumberMaskConfig;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const useHandleNumberFormat = <T extends DefaultPropsT = DefaultPropsT>({
    value: valueProp,
    onChangeText: onChangeTextProp,
    config,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...rest
}: UseHandleNumberFormatProps<T>) => {
    const [displayValue, setDisplayValue] = useState(() =>
        isNil(valueProp) ? `${formatNumberWithMask({ number: valueProp, ...config })}` : '',
    );

    const [isBlur, setIsBlur] = useState(true);

    const onChangeText = useCallback(
        (text: string) => {
            const normalizedNumberString = normalizeToNumberString({ text, ...config });

            onChangeTextProp(
                normalizedNumberString === ''
                    ? null
                    : +normalizeToNumberString({ text, ...config }),
            );
            setDisplayValue(text);
        },
        [config, onChangeTextProp],
    );

    const onBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlurProp?.(e);

            setDisplayValue(`${formatNumberWithMask({ number: valueProp, ...config })}`);
            setIsBlur(true);
        },
        [config, onBlurProp, valueProp],
    );

    const onFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onFocusProp?.(e);

            setIsBlur(false);
        },
        [onFocusProp],
    );

    useEffect(() => {
        if (!isBlur) return;

        setDisplayValue(`${formatNumberWithMask({ number: valueProp, ...config })}`);
    }, [config, isBlur, valueProp]);

    return useMemo(
        () => ({
            value: displayValue,
            onChangeText: onChangeText,
            onFocus,
            onBlur,
            ...rest,
        }),
        [displayValue, onBlur, onChangeText, onFocus, rest],
    );
};

export default useHandleNumberFormat;
