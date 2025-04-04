import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DatePickerInlineDefault from './DatePickerInline';

registerMoleculesComponents({
    DatePickerInline: DatePickerInlineDefault,
});

export const DatePickerInline = getRegisteredMoleculesComponent('DatePickerInline');

export { DatePickerInlineProps, getStateValue } from './DatePickerInline';
export {
    DatePickerInlineBaseProps,
    ValidRangeType,
    CalendarDate,
    CalendarDates,
    ModeType,
    MultiChange,
    BaseDatePickerProps,
    RangeChange,
    SingleChange,
    MultiConfirm,
    DatePickerSingleProps,
    DatePickerMultiProps,
    DatePickerRangeProps,
} from './types';
export {
    datePickerStyles,
    datePickerMonthStyles,
    datePickerYearPickerStyles,
    datePickerDayStyles,
    datePickerHeaderStyles,
    dateDayNameStyles,
    datePickerDayRangeStyles,
    datePickerDayEmptyStyles,
    datePickerWeekStyles,
    datePickerYearItemStyles,
} from './utils';
