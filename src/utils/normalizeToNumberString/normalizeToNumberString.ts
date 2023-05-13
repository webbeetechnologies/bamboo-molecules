export type NormalizeToNumberStringProps = {
    text: string;
    separator?: string;
};

export const normalizeToNumberString = ({ text, separator = '' }: NormalizeToNumberStringProps) => {
    const separatorReplacedText = text.replaceAll(separator, '.');
    const textWithNumbersAndDotsOnly = separatorReplacedText.replace(/[^0-9.]/g, '');

    return `${parseFloat(textWithNumbersAndDotsOnly) || ''}`;
};
