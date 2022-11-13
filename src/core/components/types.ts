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
    ListItemProps,
    Checkbox,
    FlatListProps,
    SectionListProps,
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
    ListItem: ComponentType<ListItemProps>;
    Checkbox: typeof Checkbox;
    FlatList: ComponentType<FlatListProps>;
    SectionList: ComponentType<SectionListProps>;
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
