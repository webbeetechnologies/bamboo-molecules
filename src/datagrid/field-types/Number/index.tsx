import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value, Config } from './types';

export const NumberFieldType: FieldType<Value, Config> = {
    type: 'number',
    title: 'Number',
    icon: {
        name: 'pound',
    },
    EditorRenderer,
    ValueRenderer,
};
