import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value, Config } from './types';

export const SingleLineTextFieldType: FieldType<Value, Config> = {
    type: 'singleLineText',
    title: 'SingleLineText',
    icon: {
        name: 'format-letter-case',
    },
    EditorRenderer,
    ValueRenderer,
};
