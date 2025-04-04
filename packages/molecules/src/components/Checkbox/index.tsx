import CheckboxComponent from './Checkbox';
import CheckboxItem from './CheckboxItem';

const Checkbox = Object.assign(
    // @component ./Checkbox.tsx
    CheckboxComponent,
    {
        // @component ./CheckboxItem.tsx
        Item: CheckboxItem,
    },
);

export default Checkbox;

export { Props as CheckboxProps } from './Checkbox';
export { Props as CheckboxItemProps } from './CheckboxItem';
export { styles as checkboxStyles } from './utils';
