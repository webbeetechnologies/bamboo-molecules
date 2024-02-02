import { useState, useEffect, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import { enhanceTextWithMask } from './utils';

export type Props = TextInputProps & {
    mask: string;
};

// TODO - make it more universal
function TextInputWithMask(
    { onChangeText: onChangeTextProp, value = '', mask, ...rest }: Props,
    ref: any,
) {
    const { TextInput } = useMolecules();
    const [controlledValue, setControlledValue] = useState<string>(value || '');

    const inputRef = useRef(null);

    const onChangeText = useCallback(
        (text: string) => {
            const enhancedText = enhanceTextWithMask(text, mask, controlledValue);
            setControlledValue(enhancedText);
        },
        [controlledValue, mask],
    );

    const onBlur = useCallback(() => {
        onChangeTextProp?.(controlledValue);
    }, [controlledValue, onChangeTextProp]);

    useEffect(() => {
        setControlledValue(value || '');
    }, [value]);

    useImperativeHandle(ref, () =>
        Object.assign({ setDisplayValue: setControlledValue }, inputRef?.current || {}),
    );

    return (
        <TextInput
            ref={inputRef}
            {...rest}
            value={controlledValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
        />
    );
}

export default forwardRef(TextInputWithMask);
