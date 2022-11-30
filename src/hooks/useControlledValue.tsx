import { useCallback, useMemo, useState, useRef, useEffect } from 'react';

type ReturnType<T> = [T, (value: T) => void];

type Args<T> = {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => any;
    disabled?: boolean;
    manipulateValue?: (value: T | undefined, prevValue: T | undefined) => T;
};

const useControlledValue = <T,>({
    value: valueProp,
    defaultValue,
    disabled = false,
    onChange,
    manipulateValue = val => val as T,
}: Args<T>): ReturnType<T> => {
    const value = useMemo(
        () =>
            valueProp !== undefined
                ? manipulateValue(valueProp, undefined)
                : manipulateValue(defaultValue, undefined),
        [defaultValue, manipulateValue, valueProp],
    );

    const hasWarnedRef = useRef(false);

    const isUncontrolled = useRef(valueProp).current === undefined;
    const [uncontrolledValue, setValue] = useState(value);

    const updateValue = useCallback(
        (val: T) => {
            if (disabled) return;

            if (isUncontrolled) {
                setValue(manipulateValue(val, uncontrolledValue));
            }

            onChange?.(manipulateValue(val, isUncontrolled ? uncontrolledValue : valueProp));
        },
        [disabled, isUncontrolled, manipulateValue, onChange, uncontrolledValue, valueProp],
    );

    useEffect(() => {
        if (hasWarnedRef.current) return;
        hasWarnedRef.current = true;

        if (valueProp !== undefined && isUncontrolled) {
            console.warn(
                'Trying to change the value from uncontrolled to controlled can lead to inconsistencies',
            );
        }
    }, [isUncontrolled, valueProp]);

    return useMemo(
        () => [isUncontrolled ? uncontrolledValue : value, updateValue],
        [isUncontrolled, uncontrolledValue, updateValue, value],
    );
};

export default useControlledValue;
