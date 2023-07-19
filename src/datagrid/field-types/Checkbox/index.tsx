import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value, Config } from './types';

export const CheckboxFieldType: FieldType<Value, Config> = {
    type: 'checkbox',
    title: 'Checkbox',
    icon: {
        name: 'checkbox-outline',
    },
    EditorRenderer,
    ValueRenderer,
    displayEditorOnHover: true,
};
