export type NormalizeToNumberStringProps = {
    text: string;
    separator?: string;
    allowNegative?: boolean;
};

// TODO - Need to improvement this, later this should also work with mathematical constants like e
export const normalizeToNumberString = ({
    text,
    separator = '',
    allowNegative = false,
}: NormalizeToNumberStringProps) => {
    const separatorReplacedText = text.replaceAll(separator, '.');
    const prefix = allowNegative && text.includes('-') ? '-' : '';
    const textWithNumbersAndDotsOnly = separatorReplacedText.replace(/[^0-9.]/g, '');

    return `${prefix}${parseFloat(textWithNumbersAndDotsOnly) || ''}`;
};
