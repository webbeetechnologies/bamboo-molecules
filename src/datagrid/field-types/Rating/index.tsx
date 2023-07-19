import type { FieldType } from '../../types';
import EditorRenderer from './EditorRenderer';
import ValueRenderer from './ValueRenderer';
import type { Value, Config } from './types';

export const RatingFieldType: FieldType<Value, Config> = {
    type: 'rating',
    title: 'Rating',
    icon: {
        name: 'star-outline',
    },
    EditorRenderer,
    ValueRenderer,
    displayEditorOnHover: true,
};
