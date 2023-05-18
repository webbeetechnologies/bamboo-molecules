import { formatWithMask } from 'react-native-mask-input';
import { CreateNumberMaskProps, createNumberMask } from '../createNumberMask';
import { isNil } from '../lodash';

export type FormatNumberWithMaskProps = CreateNumberMaskProps & {
    number: number | undefined | null;
};

export const formatNumberWithMask = ({
    number,
    separator = '.',
    ...rest
}: FormatNumberWithMaskProps) => {
    const numberMask = createNumberMask({ separator, ...rest });
    const numberString = `${!isNil(number) ? number : ''}`;
    const separatorReplacedNumber = numberString.replace('.', separator);

    return formatWithMask({ text: separatorReplacedNumber, mask: numberMask }).masked;
};
