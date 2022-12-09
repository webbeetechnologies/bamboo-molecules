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
     * We currently only accept the variations of dd MM yyyy
     * */
    dateFormat?: string;
} & Omit<TextInputProps, 'value' | 'onChange' | 'onChangeText'>;

export type DatePickerInputWithoutModalProps = DatePickerInputProps & {
    modal?: (params: DatePickerInputModalParams) => any;
    inputButtons?: any;
};

export type DatePickerInputModalParams = {
    value: DatePickerInputProps['value'];
    locale: DatePickerInputProps['locale'];
    inputMode: DatePickerInputProps['inputMode'];
    validRange: DatePickerInputProps['validRange'];
};
