import { memo } from 'react';
import type { RatingProps } from '../../../components';

import type { FieldRendererProps } from '../../types';
import type { Value } from './types';
import RatingFieldEditorRenderer from './EditorRenderer';

export type Props = FieldRendererProps<Value> & RatingProps & {};

const RatingFieldValueRenderer = (props: Props) => {
    return <RatingFieldEditorRenderer {...props} readonly activeColor="colors.onSurfaceVariant" />;
};

export default memo(RatingFieldValueRenderer);
