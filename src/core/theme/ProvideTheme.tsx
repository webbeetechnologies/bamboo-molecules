import { useEffect, useMemo } from 'react';
import {
    ProvideTheme as AtomProvideTheme,
    extendTheme as extendThemeAtoms,
    IExtractStylesFuncArgs,
} from '@bambooapp/bamboo-atoms';
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
    cardTypograhyStyles,
    cardMediaStyles,
    cardActionsStyles,
    selectStyles,
    chipStyles,
    tooltipStyles,
    drawerStyles,
    drawerItemStyles,
    drawerContentStyles,
    drawerHeaderStyles,
    drawerFooterStyles,
    appbarBaseStyles,
    appbarCenterAlignedStyles,
    appbarSmallStyles,
    appbarMediumStyles,
    appbarLargeStyles,
    appbarLeft,
    appbarRight,
    appbarTitle,
    accordionStyles,
    accordionItemStyles,
    drawerItemGroupStyles,
    accordionItemHeaderStyles,
    accordionItemContentStyles,
    drawerCollapsibleStyles,
    drawerCollapsibleItemStyles,
    drawerCollapsibleItemHeaderStyles,
    drawerCollapsibleItemContentStyles,
    ratingStyles,
    ratingItemStyles,
    linkStyles,
    dateTimePickerStyles,
    timepickerFieldStyles,
    navigationRailStyles,
    navigationRailHeaderStyles,
    navigationRailContentStyles,
    navigationRailFooterStyles,
    navigationRailItemStyles,
    badgeStyles,
    fabStyles,
    gridStyles,
    optionFlatListStyles,
    scrollViewStyles,
    dataTableStyles,
    dataTableCellStyles,
    dataTableRowStyles,
    dataTableHeaderStyles,
    dataTableHeaderCellStyles,
} from '../../components';
import { MD3LightTheme, MD3DarkTheme } from '../../styles';
import type { DeepPartial } from '../../types';
import {
    normalizeStyles,
    resolveComponentStyles as defaultResolveComponentStyles,
} from '../../utils';
import type { ITheme, ProvideThemeArgs } from './types';
import { usePrevious } from '../../hooks';
import { clearStylesCache } from '../../utils';

const defaultThemeValue: Partial<ITheme> = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
    grid: {
        breakpoints: {
            xs: 320,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
        numberOfColumns: 12,
    },
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

    DateTimePicker: dateTimePickerStyles,

    TimePickerModal: timePickerModalStyles,

    TimePicker: timePickerStyles,
    TimePicker_Input: timePickerInputStyles,
    TimePicker_Inputs: timePickerInputsStyles,
    TimePicker_Clock: timePickerClockStyles,
    TimePicker_ClockHours: timePickerClockHoursStyles,
    TimePicker_ClockMinutes: timePickerClockMinutesStyles,
    TimePicker_AmPmSwitcher: timePickerAmPmSwitcherStyles,

    TimePickerField: timepickerFieldStyles,

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
    Card_Typography: cardTypograhyStyles,
    Card_Media: cardMediaStyles,
    Card_Actions: cardActionsStyles,

    Select: selectStyles,

    Chip: chipStyles,

    Tooltip: tooltipStyles,

    Drawer: drawerStyles,
    Drawer_Item: drawerItemStyles,
    Drawer_ItemGroup: drawerItemGroupStyles,
    Drawer_Content: drawerContentStyles,
    Drawer_Header: drawerHeaderStyles,
    Drawer_Footer: drawerFooterStyles,
    Drawer_Collapsible: drawerCollapsibleStyles,
    Drawer_CollapsibleItem: drawerCollapsibleItemStyles,
    Drawer_CollapsibleItem_Header: drawerCollapsibleItemHeaderStyles,
    Drawer_CollapsibleItem_Content: drawerCollapsibleItemContentStyles,

    Appbar: appbarBaseStyles,
    Appbar_CenterAligned: appbarCenterAlignedStyles,
    Appbar_Small: appbarSmallStyles,
    Appbar_Medium: appbarMediumStyles,
    Appbar_Large: appbarLargeStyles,
    Appbar_Left: appbarLeft,
    Appbar_Right: appbarRight,
    Appbar_Title: appbarTitle,

    Accordion: accordionStyles,
    AccordionItem: accordionItemStyles,
    AccordionItem_Header: accordionItemHeaderStyles,
    AccordionItem_Content: accordionItemContentStyles,

    Rating: ratingStyles,
    Rating_Item: ratingItemStyles,

    Link: linkStyles,

    NavigationRail: navigationRailStyles,
    NavigationRail_Header: navigationRailHeaderStyles,
    NavigationRail_Content: navigationRailContentStyles,
    NavigationRail_Footer: navigationRailFooterStyles,
    NavigationRail_Item: navigationRailItemStyles,

    Badge: badgeStyles,

    FAB: fabStyles,

    Grid: gridStyles,
    OptionFlatList: optionFlatListStyles,

    ScrollView: scrollViewStyles,

    DataTable: dataTableStyles,
    DataTable_Cell: dataTableCellStyles,
    DataTable_Row: dataTableRowStyles,
    DataTable_HeaderRow: dataTableHeaderStyles,
    DataTable_HeaderCell: dataTableHeaderCellStyles,
};

export const defaultExtractStyles = memoize(
    ({ theme, componentName, colorMode, style }: IExtractStylesFuncArgs) => {
        const normalizedComponentStyles = normalizeStyles(
            theme[componentName],
            theme[colorMode],
            componentName,
        );
        const normalizedStyleProp = normalizeStyles(style, theme[colorMode], componentName);

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

    const memoizedThemeRef = usePrevious(memoizedTheme);

    useEffect(
        () => () => {
            // When theme changes burst cache
            if (memoizedThemeRef.current === memoizedTheme) return;
            clearStylesCache();
        },
        [memoizedTheme, memoizedThemeRef],
    );

    return (
        <AtomProvideTheme theme={memoizedTheme} extractStyles={extractStyles}>
            {children}
        </AtomProvideTheme>
    );
};

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;
