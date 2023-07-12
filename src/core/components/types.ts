import type { ComponentType, ReactNode } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@bambooapp/bamboo-atoms';
import type {
    IconProps,
    IconButtonProps,
    ActivityIndicatorProps,
    TouchableRippleProps,
    HorizontalDividerProps,
    SurfaceProps,
    ButtonProps,
    SwitchProps,
    VerticalDividerProps,
    PopoverProps,
    BackdropProps,
    TransitionProps,
    Checkbox,
    ListItem,
    IFlatList,
    TextInputProps,
    NumberInputProps,
    FilePickerProps,
    HelperTextProps,
    ModalProps,
    DatePickerInlineProps,
    DatePickerModalProps,
    DatePickerInputProps,
    TimePickerProps,
    TimePickerModalProps,
    TextInputWithMaskProps,
    ISectionList,
    IFlatGrid,
    ISectionGrid,
    IOptionList,
    IDropdownList,
    ElementGroupProps,
    InputAddonProps,
    IActionSheet,
    Dialog,
    RadioButton,
    NumberRangeInputProps,
    Card,
    ISelect,
    Chip,
    Tooltip,
    Drawer,
    Appbar,
    MaskedInputProps,
    NavigationStack,
    AccordionItem,
    AccordionProps,
    RatingProps,
    LinkProps,
    DateTimePickerProps,
    TimePickerFieldProps,
    NavigationRail,
    BadgeProps,
    FABProps,
    GridProps,
    IOptionFlatList,
    Portal,
    ScrollViewProps,
    DataTable,
    StateLayerProps,
    SliderProps,
    RangeSliderProps,
    Menu,
    AvatarProps,
    Tabs,
} from '../../components';

import type { MaterialToastProps, ToastContainerProps } from '../../components/Toast';

export type ProvideComponentsProps = {
    components?: Partial<IComponentsProviderContext>;
    children: ReactNode;
};

export interface DefaultComponents {
    Icon: ComponentType<IconProps>;
    IconButton: ComponentType<IconButtonProps>;
    TouchableRipple: ComponentType<TouchableRippleProps>;
    ActivityIndicator: ComponentType<ActivityIndicatorProps>;
    HorizontalDivider: ComponentType<HorizontalDividerProps>;
    VerticalDivider: ComponentType<VerticalDividerProps>;
    Button: ComponentType<ButtonProps>;
    Surface: ComponentType<SurfaceProps>;
    Switch: ComponentType<SwitchProps>;
    Transition: ComponentType<TransitionProps>;
    Backdrop: ComponentType<BackdropProps>;
    Popover: ComponentType<PopoverProps>;
    ListItem: typeof ListItem;
    Checkbox: typeof Checkbox;
    FlatList: IFlatList;
    SectionList: ISectionList;
    FlatGrid: IFlatGrid;
    SectionGrid: ISectionGrid;
    TextInput: ComponentType<TextInputProps>;
    NumberInput: ComponentType<NumberInputProps>;
    FilePicker: ComponentType<FilePickerProps>;
    HelperText: ComponentType<HelperTextProps>;
    Modal: ComponentType<ModalProps>;
    DatePickerInline: ComponentType<DatePickerInlineProps>;
    DatePickerModal: ComponentType<DatePickerModalProps>;
    DatePickerInput: ComponentType<DatePickerInputProps>;
    DateTimePicker: ComponentType<DateTimePickerProps>;
    TimePicker: ComponentType<TimePickerProps>;
    TimePickerModal: ComponentType<TimePickerModalProps>;
    TextInputWithMask: ComponentType<TextInputWithMaskProps>;
    OptionList: IOptionList;
    DropdownList: IDropdownList;
    ElementGroup: ComponentType<ElementGroupProps>;
    InputAddon: ComponentType<InputAddonProps>;
    ActionSheet: IActionSheet;
    Dialog: typeof Dialog;
    RadioButton: typeof RadioButton;
    NumberRangeInput: ComponentType<NumberRangeInputProps>;
    DropdownListPopover: ComponentType<PopoverProps>;
    Card: typeof Card;
    Select: ISelect;
    Chip: typeof Chip;
    Tooltip: typeof Tooltip;
    Drawer: typeof Drawer;
    Appbar: typeof Appbar;
    MaskedInput: ComponentType<MaskedInputProps>;
    NavigationStack: typeof NavigationStack;
    Accordion: ComponentType<AccordionProps>;
    AccordionItem: typeof AccordionItem;
    Rating: ComponentType<RatingProps>;
    Link: ComponentType<LinkProps>;
    TimePickerField: ComponentType<TimePickerFieldProps>;
    NavigationRail: typeof NavigationRail;
    Badge: ComponentType<BadgeProps>;
    FAB: ComponentType<FABProps>;
    Grid: ComponentType<GridProps>;
    OptionFlatList: IOptionFlatList;
    Portal: typeof Portal;
    ScrollView: ComponentType<ScrollViewProps>;
    DataTable: typeof DataTable;
    StateLayer: ComponentType<StateLayerProps>;
    MaterialToast: ComponentType<MaterialToastProps>;
    ToastContainer: ComponentType<ToastContainerProps>;
    Slider: ComponentType<SliderProps>;
    RangeSlider: ComponentType<RangeSliderProps>;
    Menu: typeof Menu;
    Avatar: ComponentType<AvatarProps>;
    Tabs: typeof Tabs;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
