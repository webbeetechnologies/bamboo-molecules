import { ComponentType, ReactNode, useMemo } from 'react';
import {
    IExtendComponentsTypes,
    ProvideComponents as AtomsProvideComponents,
    ConsumeComponents as AtomsConsumeComponents,
    extractComponents as extractComponentsAtoms,
} from '@webbee/bamboo-atoms';
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
    Overlay,
    Popover,
    PresenceTransition,
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
    InputGroup,
    InputAddon,
    ActionSheet,
    Dialog,
} from '../../components';
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
    Overlay,
    Popover,
    PresenceTransition,
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
    TimePicker,
    TimePickerModal,
    TextInputWithMask: TextInputWithMask as ComponentType<TextInputWithMaskProps>,
    OptionList,
    DropdownList,
    InputGroup,
    InputAddon,
    ActionSheet,
    Dialog,
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
