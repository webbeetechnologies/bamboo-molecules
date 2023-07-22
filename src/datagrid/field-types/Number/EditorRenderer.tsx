import { memo } from 'react';
import { TextInputProps, useHandleNumberFormat } from '@bambooapp/bamboo-molecules';

import { InlineInput } from '../../components/InlineInput';
import type { FieldRendererProps } from '../../types';
import type { Value } from './types';

export type Props = FieldRendererProps<Value> & Omit<TextInputProps, 'value' | 'onChange'> & {};

const NumberFieldEditorRenderer = ({ value: valueProp = null, onChange, ...rest }: Props) => {
    const numberFieldProps = useHandleNumberFormat({
        ...rest,
        value: valueProp,
        onChangeText: onChange,
        // config,
    });

    return <InlineInput {...rest} {...numberFieldProps} />;
};

export default memo(NumberFieldEditorRenderer);
