import { useMolecules, NumberInputProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = NumberInputProps & {};

export const Example = (props: Props) => {
    const { NumberInput } = useMolecules();

    const [number, setNumber] = useState('');

    const onChangeNumber = useCallback((text: string) => {
        setNumber(text);
    }, []);

    return <NumberInput {...props} value={number} onChangeText={onChangeNumber} />;
};
