import type { DatePickerSingleProps } from '../DatePickerInline';

export type DatePickerDockedProps = DatePickerSingleProps & {
    triggerRef: any;
    onToggle: () => void;
    isOpen: boolean;
};
