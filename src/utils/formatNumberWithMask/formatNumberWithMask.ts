import { formatWithMask } from 'react-native-mask-input';
import { CreateNumberMaskProps, createNumberMask } from '../createNumberMask';

export type FormatNumberWithMaskProps = CreateNumberMaskProps & {
    number: number | undefined | null;
};

export const formatNumberWithMask = ({
    number,
    separator = '.',
    ...rest
}: FormatNumberWithMaskProps) => {
    const numberMask = createNumberMask({ separator, ...rest });
    const numberString = `${number || ''}`;
    const separatorReplacedNumber = numberString.replace('.', separator);

    return formatWithMask({ text: separatorReplacedNumber, mask: numberMask }).masked;
};
