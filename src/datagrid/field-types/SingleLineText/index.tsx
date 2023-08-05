import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value } from './types';

export const SingleLineTextFieldType: FieldType<Value> = {
    type: 'singleLineText',
    title: 'Single line text',
    icon: 'format-letter-case',
    EditorRenderer,
    ValueRenderer,
};
