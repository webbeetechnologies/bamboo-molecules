import { getRegisteredComponentWithFallback } from '../../core';
// @component ./Checkbox.tsx
import CheckboxBox, { CheckboxLabel, CheckboxRow as CheckboxRowComponent } from './Checkbox';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Checkbox = Object.assign(getRegisteredComponentWithFallback('Checkbox', CheckboxBox), {
    Label: CheckboxLabel,
    Row: CheckboxRowComponent,
});
export const CheckboxRow = CheckboxRowComponent;

export type { CheckboxLabelProps, CheckboxProps, CheckboxRowProps } from './types';
export { checkboxRowStyles, styles as checkboxStyles } from './utils';
