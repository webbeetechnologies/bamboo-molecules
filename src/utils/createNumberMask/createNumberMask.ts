import type { Mask } from 'react-native-mask-input/lib/typescript/src/formatWithMask.types';
import type { CreateNumberMaskProps } from 'react-native-mask-input/lib/typescript/src/createNumberMask.types';
import type { MaskArray } from 'react-native-mask-input';

interface Props extends Partial<CreateNumberMaskProps> {
    suffix?: string | string[];
    getDelimiterOffset?: (index: number) => number;
}

export default function createNumberMask(props?: Props): Mask {
    const {
        delimiter = ',',
        precision = 2,
        prefix = [],
        separator = '.',
        suffix = [],
        getDelimiterOffset = (_index: number) => 3,
    } = props || {};

    return (value: string | number = '') => {
        value = String(value);
        const shouldAddSeparatorOnMask = !!value && precision > 0 && !!separator;
        const [normalizedValue = '', ...mantissa] =
            shouldAddSeparatorOnMask || precision === 0 ? value.split(separator) : [value];
        const numericValue = normalizedValue.replace(/\D+/g, '') || '';
        const decimalLength = Math.max(
            0,
            Math.min(mantissa.join('').replace(/\D+/g, '').length, precision),
        );

        const mask: MaskArray = numericValue.split('').map(() => /\d/);

        if (delimiter) {
            let i = 0;
            let elapsed = numericValue.length;

            do {
                const precisionOffset = 0;
                const separatorOffset = 0;
                const thousandOffset = getDelimiterOffset(i) + (delimiter ? 1 : 0);
                elapsed -= getDelimiterOffset(i);

                if (elapsed <= 0) {
                    break;
                }

                const delimiterPosition =
                    -precisionOffset - separatorOffset - i * thousandOffset - 3;

                mask.splice(delimiterPosition, 0, delimiter);
                i++;
            } while (true);
        }

        const hasDecimalAlready = shouldAddSeparatorOnMask && value.includes(separator);
        if (hasDecimalAlready) {
            mask.push(separator, ...Array.from({ length: decimalLength }, () => /\d/));
        }

        return [...prefix, ...mask, ...suffix];
    };
}
