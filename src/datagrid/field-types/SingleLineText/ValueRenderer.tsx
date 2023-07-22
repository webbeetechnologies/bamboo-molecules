import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import { TextInputProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value } from './types';

export type Props = FieldRendererProps<Value> & Omit<TextInputProps, 'value' | 'onChange'> & {};

const SingleLineTextValueRenderer = ({ value, ...rest }: Props) => {
    const { Text } = useMolecules();

    return (
        <Text {...rest} numberOfLines={1}>
            {value}
        </Text>
    );
};

export default memo(SingleLineTextValueRenderer);
