import { useMolecules, NumberInputProps } from 'bamboo-molecules';
import { useState } from 'react';

export type Props = NumberInputProps & {};

export const Example = (props: Props) => {
    const { NumberInput } = useMolecules();
    const [number, setNumber] = useState('');

    return <NumberInput {...props} value={number} onChangeText={masked => setNumber(masked)} />;
};
