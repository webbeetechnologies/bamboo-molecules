import { useState } from 'react';
import { NumberRangeInput, NumberRangeInputProps } from '../../../src/components';

export type Props = NumberRangeInputProps & {};

export const Example = (props: Props) => {
    return <NumberRangeInput {...props} />;
};

export const ControlledExample = (props: Props) => {
    const [value, setValue] = useState({ min: '10', max: '8' });

    return <NumberRangeInput {...props} value={value} onChange={setValue} />;
};
