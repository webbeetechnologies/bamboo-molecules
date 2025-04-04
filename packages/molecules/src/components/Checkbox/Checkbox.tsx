import { forwardRef, memo } from 'react';
import { useControlledValue } from '../../hooks';

import CheckboxIOS from './CheckboxIOS';
import CheckboxAndroid from './CheckboxAndroid';
import type { CheckBoxBaseProps } from './types';
import { Platform } from 'react-native';

export type Props = CheckBoxBaseProps;
const Checkbox = (
    {
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        disabled,
        indeterminate,
        ...rest
    }: Props,
    ref: any,
) => {
    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        disabled: disabled,
    });

    const CheckboxComponent = Platform.OS === 'ios' ? CheckboxIOS : CheckboxAndroid;

    return (
        <CheckboxComponent
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            indeterminate={indeterminate}
            {...rest}
        />
    );
};

export default memo(forwardRef(Checkbox));
