import { memo, useMemo } from 'react';
import type { FieldRendererProps } from '../../types';
import { TextInputProps, formatNumberWithMask, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value, Config } from './types';

export type Props = FieldRendererProps<Value, Config> &
    Omit<TextInputProps, 'value' | 'onChange'> & {};

const NumberFieldValueRenderer = ({ value: valueProp = null, ...rest }: Props) => {
    const { Text } = useMolecules();

    const formattedValue = useMemo(() => {
        return formatNumberWithMask({
            number: valueProp,
            // ...config,
        });
    }, [valueProp]);

    return <Text {...rest}>{formattedValue}</Text>;
};

export default memo(NumberFieldValueRenderer);
