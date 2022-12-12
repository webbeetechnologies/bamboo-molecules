import RadioButtonComponent from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import RadioButtonItem from './RadioButtonItem';

export const RadioButton = Object.assign(
    // @component ./RadioButton.tsx
    RadioButtonComponent,
    {
        // @component ./RadioButtonGroup.tsx
        Group: RadioButtonGroup,
        // @component ./RadioButtonItem.tsx
        Item: RadioButtonItem,
    },
);

export { Props as RadioButtonProps } from './RadioButton';
export { Props as RadioButtonGroupProps } from './RadioButtonGroup';
export { Props as RadioButtonItemProps } from './RadioButtonItem';

export { radioButtonStyles, radioButtonItemStyles } from './utils';
