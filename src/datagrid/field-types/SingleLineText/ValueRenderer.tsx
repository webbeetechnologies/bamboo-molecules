import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import type { TextInputProps } from '../../../components';
import { useMolecules } from '../../../hooks';

import type { Value } from './types';

export type Props = FieldRendererProps<Value> &
    Omit<TextInputProps, 'value' | 'onChange' | 'ref'> & {};

const SingleLineTextValueRenderer = ({ value, ...rest }: Props) => {
    const { Text } = useMolecules();

    return (
        <Text {...rest} numberOfLines={1}>
            {value}
        </Text>
    );
};

export default memo(SingleLineTextValueRenderer);
