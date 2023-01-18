import type { Mask } from 'react-native-mask-input/lib/typescript/src/formatWithMask.types';
import type { CreateNumberMaskProps } from 'react-native-mask-input/lib/typescript/src/createNumberMask.types';
import type { MaskArray } from 'react-native-mask-input';

interface Props extends Partial<CreateNumberMaskProps> {
    suffix?: CreateNumberMaskProps['prefix'];
}

export default function createNumberMask(props?: Props): Mask {
    const {
        delimiter = '.',
        precision = 2,
        prefix = [],
        separator = ',',
        suffix = [],
    } = props || {};

    return (value: string | number = '') => {
        value = String(value);
        const [normalizedValue = '', ...mantissa] = value.split('.');
        const shouldAddSeparatorOnMask = !!value && precision > 0 && !!separator;
        const numericValue = normalizedValue.replace(/\D+/g, '') || '';
        const decimalLength = Math.max(
            0,
            Math.min(mantissa.join('').replace(/\D+/g, '').length, precision),
        );

        const mask: MaskArray = numericValue.split('').map(() => /\d/);

        const hasDecimalAlready = shouldAddSeparatorOnMask && value.includes(separator);

        const amountOfDelimiters = Math.ceil(numericValue.length / 3) - 1;

        if (delimiter) {
            for (let i = 0; i < amountOfDelimiters; i++) {
                const precisionOffset = 0;
                const separatorOffset = 0;
                const thousandOffset = 3 + (delimiter ? 1 : 0);
                const delimiterPosition =
                    -precisionOffset - separatorOffset - i * thousandOffset - 3;

                mask.splice(delimiterPosition, 0, delimiter);
            }
        }

        if (hasDecimalAlready) {
            mask.push(separator, ...Array.from({ length: decimalLength }, () => /\d/));
        }

        return [...prefix, ...mask, ...suffix];
    };
}
