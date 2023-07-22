import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import type { CheckboxProps } from '@bambooapp/bamboo-molecules';

import type { Value } from './types';
import CheckboxEditorRenderer from './EditorRenderer';

export type Props = Omit<FieldRendererProps<Value>, 'onChange'> & Omit<CheckboxProps, 'value'> & {};

const CheckboxValueRenderer = ({ value, ...rest }: Props) => {
    return <CheckboxEditorRenderer value={!!value} {...rest} disabled />;
};

export default memo(CheckboxValueRenderer);
