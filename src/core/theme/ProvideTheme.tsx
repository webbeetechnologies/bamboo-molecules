import { useMemo } from 'react';
import {
    ProvideTheme as AtomProvideTheme,
    extendTheme as extendThemeAtoms,
    IExtractStylesFuncArgs,
} from '@webbee/bamboo-atoms';
import merge from 'ts-deepmerge';
import { memoize } from '../../utils';

import {
    activityIndicatorStyles,
    buttonStyles,
    horizontalDividerStyles,
    iconStyles,
    iconButtonStyles,
    touchableRippleStyles,
    surfaceStyles,
    switchStyles,
    verticalDividerStyles,
    listItemStyles,
    listItemTitleStyles,
    listItemDescriptionStyles,
    checkboxStyles,
    flatListStyles,
    sectionListStyles,
    flatGridStyles,
    sectionGridStyles,
    textInputStyles,
    helperTextStyles,
    modalStyles,
    popoverStyles,
    backdropStyles,
    datePickerStyles,
    datePickerYearPickerStyles,
    datePickerMonthStyles,
    datePickerDayStyles,
    datePickerHeaderStyles,
    dateDayNameStyles,
    datePickerDayEmptyStyles,
    datePickerWeekStyles,
    datePickerDayRangeStyles,
    datePickerModalStyles,
    datePickerModalHeaderStyles,
    datePickerModalContentHeaderStyles,
    datePickerModalHeaderBackgroundStyles,
    datePickerModalEditStyles,
    datePickerInputStyles,
    timePickerModalStyles,
    timePickerStyles,
    timePickerInputStyles,
    timePickerInputsStyles,
    timePickerClockStyles,
    timePickerClockHoursStyles,
    timePickerClockMinutesStyles,
    timePickerAmPmSwitcherStyles,
    optionListStyles,
    elementGroupStyles,
    inputAddonStyles,
    actionSheetStyles,
    dropdownListStyles,
    dialogStyles,
    dialogActionsStyles,
    dialogTitleStyles,
    dialogIconStyles,
    dialogContentStyles,
    radioButtonStyles,
    radioButtonItemStyles,
    numberRangeInputStyles,
    dropdownListPopoverStyles,
    cardStyles,
    cardHeaderStyles,
    cardContentStyles,
    cardTextStyles,
    cardMediaStyles,
    cardActionsStyles,
    selectStyles,
} from '../../components';
import { MD3LightTheme, MD3DarkTheme } from '../../styles';
import type { DeepPartial } from '../../types';
import {
    normalizeStyles,
    resolveComponentStyles as defaultResolveComponentStyles,
} from '../../utils';
import type { ITheme, ProvideThemeArgs } from './types';

const defaultThemeValue: Partial<ITheme> = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
    ActivityIndicator: activityIndicatorStyles,
    Button: buttonStyles,
    HorizontalDivider: horizontalDividerStyles,
    Icon: iconStyles,
    IconButton: iconButtonStyles,
    VerticalDivider: verticalDividerStyles,
    TouchableRipple: touchableRippleStyles,
    Surface: surfaceStyles,
    Switch: switchStyles,

    ListItem: listItemStyles,
    ListItemTitle: listItemTitleStyles,
    ListItemDescription: listItemDescriptionStyles,

    Checkbox: checkboxStyles,
    FlatList: flatListStyles,
    SectionList: sectionListStyles,
    TextInput: textInputStyles,
    HelperText: helperTextStyles,
    Modal: modalStyles,
    Popover: popoverStyles,
    Backdrop: backdropStyles,

    FlatGrid: flatGridStyles,
    SectionGrid: sectionGridStyles,

    DatePickerInline: datePickerStyles,
    DatePicker_YearPicker: datePickerYearPickerStyles,
    DatePicker_Month: datePickerMonthStyles,
    DatePicker_Day: datePickerDayStyles,
    DatePicker_DayEmpty: datePickerDayEmptyStyles,
    DatePicker_Header: datePickerHeaderStyles,
    DatePicker_DayName: dateDayNameStyles,
    DatePicker_DayRange: datePickerDayRangeStyles,
    DatePicker_Week: datePickerWeekStyles,

    DatePickerModal: datePickerModalStyles,
    DatePickerModal_Header: datePickerModalHeaderStyles,
    DatePickerModal_ContentHeader: datePickerModalContentHeaderStyles,
    DatePickerModal_HeaderBackground: datePickerModalHeaderBackgroundStyles,
    DatePickerModal_Edit: datePickerModalEditStyles,

    DatePickerInput: datePickerInputStyles,

    TimePickerModal: timePickerModalStyles,

    TimePicker: timePickerStyles,
    TimePicker_Input: timePickerInputStyles,
    TimePicker_Inputs: timePickerInputsStyles,
    TimePicker_Clock: timePickerClockStyles,
    TimePicker_ClockHours: timePickerClockHoursStyles,
    TimePicker_ClockMinutes: timePickerClockMinutesStyles,
    TimePicker_AmPmSwitcher: timePickerAmPmSwitcherStyles,

    OptionList: optionListStyles,
    ElementGroup: elementGroupStyles,
    InputAddon: inputAddonStyles,

    ActionSheet: actionSheetStyles,

    DropdownList: dropdownListStyles,

    Dialog: dialogStyles,
    Dialog_Content: dialogContentStyles,
    Dialog_Title: dialogTitleStyles,
    Dialog_Actions: dialogActionsStyles,
    Dialog_Icon: dialogIconStyles,

    RadioButton: radioButtonStyles,
    RadioButton_Item: radioButtonItemStyles,
    NumberRangeInput: numberRangeInputStyles,

    DropdownListPopover: dropdownListPopoverStyles,

    Card: cardStyles,
    Card_Header: cardHeaderStyles,
    Card_Content: cardContentStyles,
    Card_Text: cardTextStyles,
    Card_Media: cardMediaStyles,
    Card_Actions: cardActionsStyles,

    Select: selectStyles,
};

const defaultExtractStyles = memoize(
    ({ theme, componentName, colorMode, style }: IExtractStylesFuncArgs) => {
        const normalizedComponentStyles = normalizeStyles(theme[componentName], theme[colorMode]);
        const normalizedStyleProp = normalizeStyles(style, theme[colorMode]);

        return { ...normalizedComponentStyles, ...normalizedStyleProp };
    },
);

export const ProvideTheme = ({
    theme,
    resolveComponentStyles = defaultResolveComponentStyles,
    extractStyles = defaultExtractStyles,
    children,
}: ProvideThemeArgs) => {
    const memoizedTheme = useMemo(
        () => ({
            ...theme,
            resolveComponentStyles,
        }),
        [resolveComponentStyles, theme],
    );

    return (
        <AtomProvideTheme theme={memoizedTheme} extractStyles={extractStyles}>
            {children}
        </AtomProvideTheme>
    );
};

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;
