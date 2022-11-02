import { useCallback, useMemo, useState, useRef, useEffect } from 'react';

type Value = string | undefined;

type ReturnType = [Value, (value: string) => void];

const defaultManipulateValue = (val: Value) => val;

const useControlledValue = (
    value: Value,
    onChange: ((value: string) => any) | undefined,
    isDisabled: boolean = false,
    manipulateValue: (value: Value) => Value = defaultManipulateValue,
): ReturnType => {
    const isUncontrolled = useRef(value).current === undefined;
    const [uncontrolledValue, setValue] = useState(manipulateValue(value));

    const updateValue = useCallback(
        (val: string) => {
            if (isDisabled) return;

            if (isUncontrolled) {
                setValue(val);
            }

            onChange?.(val);
        },
        [isDisabled, isUncontrolled, onChange],
    );

    useEffect(() => {
        if (value === undefined && uncontrolledValue !== value) {
            console.warn(
                'Trying to change the value from uncontrolled to controlled can lead to inconsistencies',
            );
        }
    }, [uncontrolledValue, value]);

    return useMemo(
        () =>
            isUncontrolled
                ? [manipulateValue(uncontrolledValue), updateValue]
                : [manipulateValue(value), updateValue],
        [isUncontrolled, manipulateValue, uncontrolledValue, updateValue, value],
    );
};

export default useControlledValue;
