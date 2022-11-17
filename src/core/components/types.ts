import type { ComponentType, ReactNode } from 'react';
import type { IComponentsProviderContext as IAtomsComponentsProviderContext } from '@webbee/bamboo-atoms';
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
    PresenceTransitionProps,
    OverlayProps,
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
} from '../../components';

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
    Overlay: ComponentType<OverlayProps>;
    PresenceTransition: ComponentType<PresenceTransitionProps>;
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
    TimePicker: ComponentType<TimePickerProps>;
    TimePickerModal: ComponentType<TimePickerModalProps>;
    TextInputWithMask: ComponentType<TextInputWithMaskProps>;
}

export type IComponentsProviderContext = IAtomsComponentsProviderContext & DefaultComponents & {};
