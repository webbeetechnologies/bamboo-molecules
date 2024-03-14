import { memo, useMemo } from 'react';
import type { FieldRendererProps } from '../../types';
import type { TextInputProps } from '../../../components';
import { useMolecules } from '../../../hooks';
import { formatNumberWithMask } from '../../../utils';
import type { Value } from './types';

export type Props = FieldRendererProps<Value> &
    Omit<TextInputProps, 'value' | 'onChange' | 'ref'> & {};

const NumberFieldValueRenderer = ({ value: valueProp = null, ...rest }: Props) => {
    const { Text } = useMolecules();

    const formattedValue = useMemo(() => {
        return formatNumberWithMask({
            number: valueProp,
            // ...config,
        });
    }, [valueProp]);

    return (
        <Text {...rest} numberOfLines={1}>
            {formattedValue}
        </Text>
    );
};

export default memo(NumberFieldValueRenderer);
