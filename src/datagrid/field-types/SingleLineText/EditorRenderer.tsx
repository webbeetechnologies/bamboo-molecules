import { memo, useCallback } from 'react';
import type { FieldRendererProps } from '@bambooapp/bamboo-molecules/datagrid';
import type { TextInputProps } from '@bambooapp/bamboo-molecules';

import { useMolecules } from '../../hooks';
import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> &
    Omit<TextInputProps, 'value' | 'onChange'> & {};

const SingleLineTextEditorRenderer = ({ value, onChange, ...rest }: Props) => {
    const { TextInput } = useMolecules();

    const onChangeText = useCallback(
        (text: string) => {
            onChange(text);
        },
        [onChange],
    );

    return <TextInput {...rest} onChangeText={onChangeText} value={value || ''} />;
};

export default memo(SingleLineTextEditorRenderer);
