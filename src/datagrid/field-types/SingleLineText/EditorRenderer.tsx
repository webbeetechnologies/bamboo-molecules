import { memo, useCallback } from 'react';
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import type { TextInputProps } from '../../../components';
import { InlineInput } from '../../components/InlineInput';
import type { FieldRendererProps } from '../../types';
import type { Value } from './types';
import { handleEmitKeyboardEvent } from '../../utils';
import { isEnterKey, isEscapeKey, isTabKey } from '../../../shortcuts-manager/utils';

export type Props = FieldRendererProps<Value> & Omit<TextInputProps, 'value' | 'onChange'> & {};

const SingleLineTextEditorRenderer = ({ value, onChange, ...rest }: Props) => {
    const onChangeText = useCallback(
        (text: string) => {
            onChange(text);
        },
        [onChange],
    );
    const onKeyPress = useCallback((_e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const e = _e as unknown as KeyboardEvent;

        if (e.key && (isEscapeKey(e.key) || isEnterKey(e.key) || isTabKey(e.key))) {
            handleEmitKeyboardEvent('keydown', e);
        }
    }, []);

    return (
        <InlineInput
            {...rest}
            onKeyPress={onKeyPress as any}
            onChangeText={onChangeText}
            value={value || ''}
        />
    );
};

export default memo(SingleLineTextEditorRenderer);
