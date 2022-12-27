import { default as LinearProgressIndicator } from './Linear';
import { default as CircularProgressIndicator } from './Circular';

export const ProgressIndicator = Object.assign(
    // @component ./Checkbox.tsx
    {
        // @component ./CheckboxItem.tsx
        Linear: LinearProgressIndicator,
        Circular: CircularProgressIndicator,
    },
);

export { Props as LinearProgressIndicatorProps } from './Linear';
export { Props as CircularProgressIndicatorProps } from './Circular';
export { linearProgressIndicatorStyles, circularProgressIndicatorStyles } from './utils';
