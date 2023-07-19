import { memo } from 'react';
import type { FieldRendererProps } from '../../types';
import { TextInputProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> &
    Omit<TextInputProps, 'value' | 'onChange'> & {};

const SingleLineTextValueRenderer = ({ value, ...rest }: Props) => {
    const { Text } = useMolecules();

    return <Text {...rest}>{value}</Text>;
};

export default memo(SingleLineTextValueRenderer);
