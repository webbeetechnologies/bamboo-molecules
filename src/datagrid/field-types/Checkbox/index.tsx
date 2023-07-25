import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value } from './types';

export const CheckboxFieldType: FieldType<Value> = {
    type: 'checkbox',
    title: 'Checkbox',
    icon: {
        name: 'checkbox-outline',
    },
    EditorRenderer,
    ValueRenderer,
    showEditor: ({ hovered, focused }) => hovered || focused,
};
