import { ComponentType, ReactNode, useMemo } from 'react';
import {
    IExtendComponentsTypes,
    ProvideComponents as AtomsProvideComponents,
    ConsumeComponents as AtomsConsumeComponents,
    extractComponents as extractComponentsAtoms,
} from '@bambooapp/bamboo-atoms';
import {
    ActivityIndicator,
    Icon,
    IconButton,
    HorizontalDivider,
    VerticalDivider,
    TouchableRipple,
    Button,
    Surface,
    Switch,
    Popover,
    Backdrop,
    Transition,
    ListItem,
    Checkbox,
    FlatList,
    SectionList,
    FlatGrid,
    SectionGrid,
    TextInput,
    TextInputProps,
    NumberInput,
    FilePicker,
    HelperText,
    Modal,
    DatePickerInline,
    DatePickerModal,
    DatePickerInput,
    TimePicker,
    TimePickerModal,
    TextInputWithMask,
    TextInputWithMaskProps,
    OptionList,
    DropdownList,
    ElementGroup,
    InputAddon,
    ActionSheet,
    Dialog,
    RadioButton,
    NumberRangeInput,
    DropdownListPopover,
    Card,
    Select,
    Chip,
    Tooltip,
    Drawer,
    Appbar,
    MaskedInput,
    NavigationStack,
    Accordion,
    AccordionItem,
    Rating,
    Link,
    DateTimePicker,
    TimePickerField,
    NavigationRail,
    Badge,
    FAB,
    Grid,
    OptionFlatList,
    Portal,
    ScrollView,
    DataTable,
    StateLayer,
    Slider,
    RangeSlider,
    Menu,
    Avatar,
    Tabs,
    If,
} from '../../components';

import { MaterialToast, ToastContainer } from '../../components/Toast';

import type { DefaultComponents, ProvideComponentsProps } from './types';

/**
 * All component platform-specific themes will be exported in the same file
 * for android and ios, the corresponding themes will be exported
 * for web, need to create a function that'll set the user input theme.
 * The value of user input will be stored in a variable and will be used to decide which theme will be exported if the platform isn't mobile // need more discussion
 * Components like Icons are neutral, they don't have platform specific styles.
 * Example implementation below
 */
const defaultComponents: DefaultComponents = {
    Icon,
    IconButton,
    TouchableRipple,
    ActivityIndicator,
    HorizontalDivider,
    VerticalDivider,
    Button,
    Surface,
    Switch,
    Popover,
    Transition,
    Backdrop,
    ListItem,
    Checkbox,
    FlatList,
    SectionList,
    SectionGrid,
    FlatGrid,
    TextInput: TextInput as ComponentType<TextInputProps>,
    NumberInput,
    FilePicker,
    HelperText,
    Modal,
    DatePickerInline,
    DatePickerModal,
    DatePickerInput,
    DateTimePicker,
    TimePicker,
    TimePickerModal,
    TimePickerField,
    TextInputWithMask: TextInputWithMask as ComponentType<TextInputWithMaskProps>,
    OptionList,
    DropdownList,
    ElementGroup,
    InputAddon,
    ActionSheet,
    Dialog,
    RadioButton,
    NumberRangeInput,
    DropdownListPopover,
    Card,
    Select,
    Chip,
    Tooltip,
    Drawer,
    Appbar,
    MaskedInput,
    NavigationStack,
    Accordion,
    AccordionItem,
    Rating,
    Link,
    NavigationRail,
    Badge,
    FAB,
    Grid,
    OptionFlatList,
    Portal,
    ScrollView,
    DataTable,
    StateLayer,
    MaterialToast,
    ToastContainer,
    Slider,
    RangeSlider,
    Menu,
    Avatar,
    Tabs,
    If,
};

export const ProvideComponents = ({ components = {}, children }: ProvideComponentsProps) => {
    const memoizedValue = useMemo(
        () => ({
            ...defaultComponents,
            ...components,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return <AtomsProvideComponents components={memoizedValue}>{children}</AtomsProvideComponents>;
};

export const ConsumeComponents = <T extends DefaultComponents>({
    children,
}: {
    children: (comp: IExtendComponentsTypes<T>) => ReactNode;
}) => {
    return <AtomsConsumeComponents>{children}</AtomsConsumeComponents>;
};

export const extractComponents: <T>(
    children: (comp: IExtendComponentsTypes<T & DefaultComponents>) => ReactNode,
) => (props: IExtendComponentsTypes<T & DefaultComponents>) => ReactNode = extractComponentsAtoms;
