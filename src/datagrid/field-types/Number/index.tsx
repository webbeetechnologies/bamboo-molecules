import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value } from './types';

export const NumberFieldType: FieldType<Value> = {
    type: 'number',
    title: 'Number',
    icon: 'pound',
    EditorRenderer,
    ValueRenderer,
};
