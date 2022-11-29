import { useState } from 'react';
import { useMolecules, NumberRangeInputProps } from 'bamboo-molecules';

export type Props = NumberRangeInputProps & {};

export const Example = (props: Props) => {
    const { NumberRangeInput } = useMolecules();
    const [value, setValue] = useState({ min: '10', max: '8' });

    return <NumberRangeInput min={value.min} max={value.max} {...props} onChange={setValue} />;
};
