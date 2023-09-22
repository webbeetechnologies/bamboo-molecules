import { memo, useCallback } from 'react';
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import type { TextInputProps } from '../../../components';
import { useHandleNumberFormat } from '../../../hooks';
import { InlineInput } from '../../components/InlineInput';
import type { FieldRendererProps } from '../../types';
import type { Value } from './types';
import { handleEmitKeyboardEvent } from '../../utils';

export type Props = FieldRendererProps<Value> & Omit<TextInputProps, 'value' | 'onChange'> & {};

const NumberFieldEditorRenderer = ({ value: valueProp = null, onChange, ...rest }: Props) => {
    const numberFieldProps = useHandleNumberFormat({
        ...rest,
        value: valueProp,
        onChangeText: onChange,
        // config,
    });
    const onKeyPress = useCallback((_e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const e = _e as unknown as KeyboardEvent;

        if (e.key && (e.key === 'Escape' || e.key === 'Enter' || e.key === 'Tab')) {
            handleEmitKeyboardEvent('keydown', e);
        }
    }, []);

    return <InlineInput {...rest} onKeyPress={onKeyPress} {...numberFieldProps} />;
};

export default memo(NumberFieldEditorRenderer);
