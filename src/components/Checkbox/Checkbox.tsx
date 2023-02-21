import { forwardRef, memo } from 'react';
import { useControlledValue, useCurrentTheme, usePlatformType } from '../../hooks';
import { normalizeStyles } from '../../utils';

import CheckboxIOS from './CheckboxIOS';
import CheckboxAndroid from './CheckboxAndroid';
import type { CheckBoxBaseProps } from './types';

export type Props = CheckBoxBaseProps;
const Checkbox = (
    {
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        color,
        uncheckedColor,
        disabled,
        indeterminate,
        ...rest
    }: Props,
    ref: any,
) => {
    const platform = usePlatformType();
    const currentTheme = useCurrentTheme();
    const normalizedProps = normalizeStyles({ color, uncheckedColor }, currentTheme);

    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        disabled: disabled || !!indeterminate,
    });

    const CheckboxComponent = platform === 'ios' ? CheckboxIOS : CheckboxAndroid;

    return (
        <CheckboxComponent
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            indeterminate={indeterminate}
            {...normalizedProps}
            {...rest}
        />
    );
};

export default memo(forwardRef(Checkbox));
