import { memo } from 'react';
import { RatingProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { FieldRendererProps } from '../../types';
import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> & RatingProps & {};

const RatingFieldEditorRenderer = ({ value, onChange, ...rest }: Props) => {
    const { Rating } = useMolecules();

    return <Rating {...rest} value={value || 0} onChange={onChange} />;
};

export default memo(RatingFieldEditorRenderer);
