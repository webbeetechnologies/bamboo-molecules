import type { TextInputProps } from '../../TextInput';
import type { ValidRangeType } from './Calendar/Calendar';

export type DatePickerInputProps = {
    inputMode: 'start' | 'end';
    locale: string;
    onChange: (date: Date | undefined) => void;
    value: Date | undefined;
    validRange?: ValidRangeType | undefined;
    withModal?: boolean;
    withDateFormatInLabel?: boolean;
    calendarIcon?: string;
} & Omit<TextInputProps, 'value' | 'onChange' | 'onChangeText'>;
