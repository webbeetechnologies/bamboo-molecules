import { useMolecules, MaskedInputProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = MaskedInputProps & {};

export const Example = (props: Props) => {
    const { MaskedInput } = useMolecules();

    return <MaskedInput {...props} />;
};

export const ControlledExample = (props: Props) => {
    const { MaskedInput } = useMolecules();
    const [text, setText] = useState('');

    const onChangeText = useCallback((maskedText: string) => {
        setText(maskedText);
    }, []);

    return <MaskedInput {...props} value={text} onChangeText={onChangeText} />;
};
