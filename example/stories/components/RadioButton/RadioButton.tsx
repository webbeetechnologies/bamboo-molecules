import { useState } from 'react';
import {
    useMolecules,
    RadioButtonProps,
    RadioButtonGroupProps,
    RadioButtonItemProps,
} from 'bamboo-molecules';

export type Props = RadioButtonProps & {};

export const Example = (props: Props) => {
    const { RadioButton } = useMolecules();

    return <RadioButton {...props} />;
};

export const ExampleRadioItem = (props: RadioButtonItemProps) => {
    const { RadioButton } = useMolecules();

    return <RadioButton.Item {...props} />;
};

export const ExampleWithRadioGroup = (props: RadioButtonGroupProps) => {
    const { RadioButton } = useMolecules();
    const [value, onValueChange] = useState('');

    return <RadioButton.Group {...props} onValueChange={onValueChange} value={value} />;
};
