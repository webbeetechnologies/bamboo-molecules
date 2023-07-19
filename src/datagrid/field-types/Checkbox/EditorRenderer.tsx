import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import { CheckboxProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> &
    Omit<CheckboxProps, 'value' | 'onChange'> & {};

const CheckboxEditorRenderer = ({ value, ...rest }: Props) => {
    const { Checkbox } = useMolecules();

    return <Checkbox value={!!value} size="sm" {...rest} />;
};

export default memo(CheckboxEditorRenderer);
