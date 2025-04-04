import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import CheckboxComponent from './Checkbox';
import CheckboxItem from './CheckboxItem';

const CheckboxDefault = Object.assign(
    // @component ./Checkbox.tsx
    CheckboxComponent,
    {
        // @component ./CheckboxItem.tsx
        Item: CheckboxItem,
    },
);

registerMoleculesComponents({
    Checkbox: CheckboxDefault,
});

export const Checkbox = getRegisteredComponentWithFallback('Checkbox', CheckboxDefault);

export { Props as CheckboxProps } from './Checkbox';
export { Props as CheckboxItemProps } from './CheckboxItem';
export { styles as checkboxStyles } from './utils';
