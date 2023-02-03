import { useState } from 'react';
import {
    RadioButton,
    RadioButtonProps,
    RadioButtonGroupProps,
    RadioButtonItemProps,
} from '../../../src/components';

export type Props = RadioButtonProps & {};

export const Example = (props: Props) => {
    return <RadioButton {...props} />;
};

export const ExampleRadioItem = (props: RadioButtonItemProps) => {
    return <RadioButton.Item {...props} />;
};

export const ExampleWithRadioGroup = (props: RadioButtonGroupProps) => {
    const [value, onValueChange] = useState('');

    return <RadioButton.Group {...props} onValueChange={onValueChange} value={value} />;
};

export const ExampleWithUncontrolledRadioGroup = (props: RadioButtonGroupProps) => {
    return <RadioButton.Group {...props} />;
};
