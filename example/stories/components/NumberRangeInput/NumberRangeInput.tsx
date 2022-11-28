import { useState } from 'react';
import { useMolecules, NumberRangeInputProps } from 'bamboo-molecules';

export type Props = NumberRangeInputProps & {};

export const Example = (props: Props) => {
    const { NumberRangeInput } = useMolecules();
    const [value, setValue] = useState({ min: '', max: '' });

    return <NumberRangeInput min={value.min} max={value.max} onChange={setValue} {...props} />;
};
