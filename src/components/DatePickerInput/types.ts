import type { TextInputProps } from '../TextInput';
import type { ValidRangeType } from '../DatePickerInline';

export type DatePickerInputProps = {
    inputMode: 'start' | 'end';
    locale?: string;
    onChange: (date: Date | undefined) => void;
    value: Date | undefined;
    validRange?: ValidRangeType | undefined;
    withModal?: boolean;
    withDateFormatInLabel?: boolean;
    calendarIcon?: string;
    /**
     * date format of the input
     * should be date-fns accepted format
     * */
    dateFormat?: string;
} & Omit<TextInputProps, 'value' | 'onChange' | 'onChangeText'>;
