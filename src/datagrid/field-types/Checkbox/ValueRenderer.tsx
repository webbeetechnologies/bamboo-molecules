import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import { CheckboxProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value, Config } from './types';

export type Props = Omit<FieldRendererProps<Value, Config>, 'onChange'> &
    Omit<CheckboxProps, 'value' | 'onChange'> & {};

const CheckboxValueRenderer = ({ value, ...rest }: Props) => {
    const { Checkbox } = useMolecules();

    return <Checkbox value={!!value} size="sm" {...rest} disabled />;
};

export default memo(CheckboxValueRenderer);
