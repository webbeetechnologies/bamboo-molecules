import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@bambooapp/bamboo-atoms';
import type { ComponentType, ReactNode } from 'react';
import type {
    AccordionItem,
    AccordionProps,
    ActivityIndicatorProps,
    Appbar,
    AvatarProps,
    BackdropProps,
    BadgeProps,
    ButtonProps,
    Card,
    Checkbox,
    Chip,
    DataTable,
    DatePickerInlineProps,
    DatePickerInputProps,
    DatePickerModalProps,
    DateTimePickerProps,
    Dialog,
    Drawer,
    ElementGroupProps,
    FABProps,
    FilePickerProps,
    GridProps,
    HelperTextProps,
    HorizontalDividerProps,
    IActionSheet,
    IDropdownList,
    IFlatGrid,
    IFlatList,
    IOptionFlatList,
    IOptionList,
    ISectionGrid,
    ISectionList,
    ISelect,
    IconButtonProps,
    IconProps,
    If,
    InputAddonProps,
    LinkProps,
    ListItem,
    MaskedInputProps,
    Menu,
    ModalProps,
    NavigationRail,
    NavigationStack,
    NumberInputProps,
    NumberRangeInputProps,
    PopoverProps,
    Portal,
    RadioButton,
    RangeSliderProps,
    RatingProps,
    ScrollViewProps,
    SliderProps,
    StateLayerProps,
    SurfaceProps,
    SwitchProps,
    Tabs,
    TextInputProps,
    TextInputWithMaskProps,
    TimePickerFieldProps,
    TimePickerModalProps,
    TimePickerProps,
    Tooltip,
    TouchableRippleProps,
    TransitionProps,
    VerticalDividerProps,
} from '../../components';

import type { MaterialToastProps, ToastContainerProps } from '../../components/Toast';

declare global {
    namespace BambooMolecules {
        interface Components {}
    }
}

declare global {
    namespace BambooAtoms {
        interface Components extends BambooMolecules.Components {}
    }
}

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
    If: typeof If;
    SearchInput: ComponentType<TextInputProps>;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext &
    DefaultComponents &
    BambooMolecules.Components & {};
