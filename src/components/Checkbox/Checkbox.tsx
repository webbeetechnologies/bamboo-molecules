import { forwardRef, memo, useMemo } from 'react';
import { useControlledValue, useNormalizeStyles, usePlatformType } from '../../hooks';

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
    const normalizedProps = useNormalizeStyles(
        useMemo(() => ({ color, uncheckedColor }), [color, uncheckedColor]),
        'checkbox_base',
    );

    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeProp,
        defaultValue,
        disabled: disabled,
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
