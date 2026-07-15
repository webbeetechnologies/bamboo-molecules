import { getRegisteredComponentWithFallback } from '../../core';
// @component ./Radio.tsx
import RadioControl, {
    RadioGroup as RadioGroupComponent,
    RadioLabel,
    RadioRow as RadioRowComponent,
} from './Radio';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Radio = Object.assign(getRegisteredComponentWithFallback('Radio', RadioControl), {
    Label: RadioLabel,
    Group: RadioGroupComponent,
    Row: RadioRowComponent,
});
export const RadioGroup = RadioGroupComponent;
export const RadioRow = RadioRowComponent;

export type { RadioGroupProps, RadioLabelProps, RadioProps, RadioRowProps } from './types';
export { radioRowStyles, radioStyles } from './utils';
