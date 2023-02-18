import { Checkbox, CheckboxProps, CheckboxItemProps } from '../../../src/components';

export const Example = (props: CheckboxProps) => {
    return <Checkbox {...props} />;
};

export const ExampleCheckboxItem = (props: CheckboxItemProps) => {
    return <Checkbox.Item {...props} />;
};
