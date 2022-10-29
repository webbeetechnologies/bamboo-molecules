import { useCallback, useMemo, useState, useRef, useEffect } from 'react';

const useControlledValue = (
    value: string | undefined,
    onChange: ((value: string) => any) | undefined,
    isDisabled: boolean = false,
): [string | undefined, (value: string) => void] => {
    const isUncontrolled = useRef(value).current === undefined;
    const [uncontrolledValue, setValue] = useState(value);

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
        () => (isUncontrolled ? [uncontrolledValue, updateValue] : [value, updateValue]),
        [isUncontrolled, uncontrolledValue, updateValue, value],
    );
};

export default useControlledValue;
