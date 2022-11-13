import { useState, useEffect, forwardRef } from 'react';
import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import { enhanceTextWithMask } from './utils';

export type Props = TextInputProps & {
    mask: string;
};

// TODO - make it more universal
function TextInputWithMask({ onChangeText, value, mask, ...rest }: Props, ref: any) {
    const { TextInput } = useMolecules();
    const [controlledValue, setControlledValue] = useState<string>(value || '');

    const onInnerChange = (text: string) => {
        const enhancedText = enhanceTextWithMask(text, mask, controlledValue);
        setControlledValue(enhancedText);

        if (text.length === mask.length) {
            onChangeText && onChangeText(text);
        }
    };

    useEffect(() => {
        setControlledValue(value || '');
    }, [value]);

    return <TextInput ref={ref} {...rest} value={controlledValue} onChangeText={onInnerChange} />;
}

export default forwardRef(TextInputWithMask);
