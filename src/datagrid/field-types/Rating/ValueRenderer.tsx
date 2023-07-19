import { memo } from 'react';
import { RatingProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { FieldRendererProps } from '../../types';
import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> & RatingProps & {};

const RatingFieldValueRenderer = ({ value, onChange, ...rest }: Props) => {
    const { Rating } = useMolecules();

    return (
        <Rating
            {...rest}
            value={value || 0}
            activeColor="colors.onSurfaceVariant"
            onChange={onChange}
            readonly
        />
    );
};

export default memo(RatingFieldValueRenderer);
