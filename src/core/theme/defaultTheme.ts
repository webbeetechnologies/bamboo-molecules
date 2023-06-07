import {
    accordionItemContentStyles,
    accordionItemHeaderStyles,
    accordionItemStyles,
    accordionStyles,
    actionSheetStyles,
    activityIndicatorStyles,
    appbarBaseStyles,
    appbarCenterAlignedStyles,
    appbarLargeStyles,
    appbarLeft,
    appbarMediumStyles,
    appbarRight,
    appbarSmallStyles,
    appbarTitle,
    backdropStyles,
    badgeStyles,
    buttonStyles,
    cardActionsStyles,
    cardContentStyles,
    cardHeaderStyles,
    cardMediaStyles,
    cardStyles,
    cardTypograhyStyles,
    checkboxStyles,
    chipStyles,
    dataTableCellStyles,
    dataTableHeaderCellStyles,
    dataTableHeaderStyles,
    dataTableRowStyles,
    dataTableStyles,
    dateDayNameStyles,
    datePickerDayEmptyStyles,
    datePickerDayRangeStyles,
    datePickerDayStyles,
    datePickerHeaderStyles,
    datePickerInputStyles,
    datePickerModalContentHeaderStyles,
    datePickerModalEditStyles,
    datePickerModalHeaderBackgroundStyles,
    datePickerModalHeaderStyles,
    datePickerModalStyles,
    datePickerMonthStyles,
    datePickerStyles,
    datePickerWeekStyles,
    datePickerYearPickerStyles,
    dateTimePickerStyles,
    dialogActionsStyles,
    dialogContentStyles,
    dialogIconStyles,
    dialogStyles,
    dialogTitleStyles,
    drawerCollapsibleItemContentStyles,
    drawerCollapsibleItemHeaderStyles,
    drawerCollapsibleItemStyles,
    drawerCollapsibleStyles,
    drawerContentStyles,
    drawerFooterStyles,
    drawerHeaderStyles,
    drawerItemGroupStyles,
    drawerItemStyles,
    drawerStyles,
    dropdownListPopoverStyles,
    dropdownListStyles,
    elementGroupStyles,
    fabStyles,
    flatGridStyles,
    flatListStyles,
    gridStyles,
    helperTextStyles,
    horizontalDividerStyles,
    iconButtonStyles,
    iconStyles,
    inputAddonStyles,
    linkStyles,
    listItemDescriptionStyles,
    listItemStyles,
    listItemTitleStyles,
    modalStyles,
    navigationStackItemStyles,
    navigationRailContentStyles,
    navigationRailFooterStyles,
    navigationRailHeaderStyles,
    navigationRailItemStyles,
    navigationRailStyles,
    numberRangeInputStyles,
    optionFlatListStyles,
    optionListStyles,
    popoverStyles,
    radioButtonItemStyles,
    radioButtonStyles,
    ratingItemStyles,
    ratingStyles,
    scrollViewStyles,
    sectionGridStyles,
    sectionListStyles,
    selectStyles,
    stateLayerStyles,
    surfaceStyles,
    switchStyles,
    textInputStyles,
    timePickerAmPmSwitcherStyles,
    timePickerClockHoursStyles,
    timePickerClockMinutesStyles,
    timePickerClockStyles,
    timepickerFieldStyles,
    timePickerInputsStyles,
    timePickerInputStyles,
    timePickerModalStyles,
    timePickerStyles,
    tooltipStyles,
    touchableRippleStyles,
    verticalDividerStyles,
} from '../../components';
import { materialToastStyles } from '../../components/Toast/utils';
import { menuStyles, menuItemStyles } from '../../components/Menu/utils';
import { MD3DarkTheme, MD3LightTheme } from '../../styles';
import type { ITheme } from './types';

const typographyComponentsKeys = [
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'Heading',
    'Italic',
    'Label',
    'Strikethrough',
    'Strong',
    'Text',
    'Underline',
];
const typographyComponentStyles = typographyComponentsKeys.reduce(
    (acc: Record<string, any>, current) => {
        acc[current] = {
            color: 'colors.onSurface',
            fontFamily: 'typescale.bodyMedium.fontFamily',
        };

        return acc;
    },
    {},
);

export const defaultThemeValue: Partial<ITheme> = {
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

    ...typographyComponentStyles,

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

    StateLayer: stateLayerStyles,

    MaterialToast: materialToastStyles,

    NavigationStackItem: navigationStackItemStyles,

    Menu: menuStyles,
    MenuItem: menuItemStyles,
};
