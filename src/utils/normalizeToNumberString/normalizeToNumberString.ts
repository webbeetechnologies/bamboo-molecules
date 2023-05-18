import { isNil } from '../lodash';

export type NormalizeToNumberStringProps = {
    text: string;
    prefix?: string;
    suffix?: string;
    separator?: string;
    allowNegative?: boolean;
};

const checkAndRemove = (text: string, searchValue: string): string =>
    searchValue && text.includes(searchValue) ? text.replace(searchValue, '') : text;

const checkAndReplaceAll = (text: string, searchValue: string, replaceValue: string): string =>
    searchValue && text.includes(searchValue) ? text.replaceAll(searchValue, replaceValue) : text;

// TODO - Need to improvement this, later this should also work with mathematical constants like e
export const normalizeToNumberString = ({
    text: _text,
    prefix = '',
    suffix = '',
    separator = '',
    allowNegative = false,
}: NormalizeToNumberStringProps) => {
    const text = _text || '';

    const removedSuffixAndPrefix = checkAndRemove(checkAndRemove(text, prefix), suffix);

    const separatorReplacedText = checkAndReplaceAll(removedSuffixAndPrefix, separator, '.');

    const textWithNumbersDotsAndMinusSign = separatorReplacedText.replace(/[^0-9.-]/g, '');

    // after removing everything we expect the minus sign to be in front of the number if it's exists
    const prefixText = allowNegative && textWithNumbersDotsAndMinusSign[0] === '-' ? '-' : '';

    const numberText = textWithNumbersDotsAndMinusSign.replace(/[^0-9.]/g, '');

    const number = parseFloat(numberText);

    return `${prefixText}${!isNil(number) && !isNaN(number) ? number : ''}`;
};
