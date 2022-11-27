import RadioButtonComponent from './RadioButton';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonGroup from './RadioButtonGroup';
import RadioButtonIOS from './RadioButtonIOS';
import RadioButtonItem from './RadioButtonItem';

export const RadioButton = Object.assign(
    // @component ./RadioButton.tsx
    RadioButtonComponent,
    {
        // @component ./RadioButtonGroup.tsx
        Group: RadioButtonGroup,
        // @component ./RadioButtonAndroid.tsx
        Android: RadioButtonAndroid,
        // @component ./RadioButtonIOS.tsx
        IOS: RadioButtonIOS,
        // @component ./RadioButtonItem.tsx
        Item: RadioButtonItem,
    },
);

export { Props as RadioButtonProps } from './RadioButton';
export { Props as RadioButtonGroupProps } from './RadioButtonGroup';
export { Props as RadioButtonItemProps } from './RadioButtonItem';

export { radioButtonStyles } from './utils';
