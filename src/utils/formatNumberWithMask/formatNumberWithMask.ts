import { formatWithMask } from 'react-native-mask-input';
import { CreateNumberMaskProps, createNumberMask } from '../createNumberMask';
import { isNil } from '../lodash';

export type FormatNumberWithMaskProps = CreateNumberMaskProps & {
    number: number | string | undefined | null;
};

export const formatNumberWithMask = ({
    number,
    separator = '.',
    suffix = '',
    precision = 0,
    ...rest
}: FormatNumberWithMaskProps) => {
    const numberMask = createNumberMask({ separator, suffix, precision, ...rest });
    const numberString = `${
        isNil(number) || number === '' || isNaN(Number(number))
            ? ''
            : Number(number).toFixed(precision)
    }`;
    const separatorReplacedNumber =
        numberString.replace('.', separator) + (numberString ? suffix : '');

    return formatWithMask({ text: separatorReplacedNumber, mask: numberMask }).masked;
};
