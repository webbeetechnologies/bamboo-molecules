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
    text,
    prefix = '',
    suffix = '',
    separator = '',
    allowNegative = false,
}: NormalizeToNumberStringProps) => {
    const removedSuffixAndPrefix = checkAndRemove(checkAndRemove(text, prefix), suffix);

    const separatorReplacedText = checkAndReplaceAll(removedSuffixAndPrefix, separator, '.');

    // TODO - only add minus sign if it's in front of a number and not in between or behind
    const prefixText = allowNegative && text.includes('-') ? '-' : '';

    const textWithNumbersAndDotsOnly = separatorReplacedText.replace(/[^0-9.]/g, '');

    const number = parseFloat(textWithNumbersAndDotsOnly);

    return `${prefixText}${!isNil(number) ? number : ''}`;
};
