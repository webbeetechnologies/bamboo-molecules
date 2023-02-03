import { useState } from 'react';
import { NumberInput, NumberInputProps } from '../../../src/components';

export type Props = NumberInputProps & {};

export const Example = (props: Props) => {
    const [number, setNumber] = useState('');

    return <NumberInput {...props} value={number} onChangeText={masked => setNumber(masked)} />;
};
