import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value } from './types';

export const RatingFieldType: FieldType<Value> = {
    type: 'rating',
    title: 'Rating',
    icon: 'pound',
    EditorRenderer,
    ValueRenderer,
    showEditor: ({ hovered, focused }) => hovered || focused,
};
