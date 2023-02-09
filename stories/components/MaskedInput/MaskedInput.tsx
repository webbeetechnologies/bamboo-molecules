import { useCallback, useState } from 'react';
import { MaskedInput, MaskedInputProps } from '../../../src/components';

export type Props = MaskedInputProps & {};

export const Example = (props: Props) => {
    return <MaskedInput {...props} />;
};

export const ControlledExample = (props: Props) => {
    const [text, setText] = useState('');

    const onChangeText = useCallback((maskedText: string) => {
        setText(maskedText);
    }, []);

    return <MaskedInput {...props} value={text} onChangeText={onChangeText} />;
};
