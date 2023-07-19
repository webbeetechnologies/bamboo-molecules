import { memo, useCallback } from 'react';
import type { TextInputProps } from '@bambooapp/bamboo-molecules';

import { InlineInput } from '../../components/InlineInput';
import type { FieldRendererProps } from '../../types';
import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> &
    Omit<TextInputProps, 'value' | 'onChange'> & {};

const SingleLineTextEditorRenderer = ({ value, onChange, ...rest }: Props) => {
    const onChangeText = useCallback(
        (text: string) => {
            onChange(text);
        },
        [onChange],
    );

    return <InlineInput {...rest} onChangeText={onChangeText} value={value || ''} />;
};

export default memo(SingleLineTextEditorRenderer);
