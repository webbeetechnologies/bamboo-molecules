import {
    forwardRef,
    memo,
    PropsWithoutRef,
    ReactElement,
    ReactNode,
    RefAttributes,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { LayoutChangeEvent, Pressable, SectionList, StyleSheet, ViewStyle } from 'react-native';
import { useComponentStyles, useControlledValue, useMolecules, useToggle } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import type { DropdownListProps } from '../DropdownList';
import type { SectionListRenderItemInfo } from '../SectionList';

type DefaultItemT = {
    id: string | number;
    label?: string;
    right?: ReactNode;
    left?: ReactNode;
    [key: string]: any;
};

export type SelectRenderItemInfo<TItem> = SectionListRenderItemInfo<TItem> & {
    selected?: boolean;
};

type DefaultSectionT<TItem> = {
    data: TItem[];
    [key: string]: any;
};

export type SelectRenderItem<TItem> = (info: SelectRenderItemInfo<TItem>) => ReactElement | null;

export type ISelect = <
    ItemType extends DefaultItemT = DefaultItemT,
    TSectionType extends DefaultSectionT<ItemType> = DefaultSectionT<ItemType>,
>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<SectionList<ItemType>>,
) => ReactElement;

export type Props<
    TItem extends DefaultItemT = DefaultItemT,
    TSectionType extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
> = Omit<
    DropdownListProps<TItem, TSectionType>,
    | 'triggerRef'
    | 'renderItem'
    | 'isOpen'
    | 'setIsOpen'
    | 'selectable'
    | 'selection'
    | 'onSelectionchange'
    | 'style'
> & {
    inputProps?: Omit<TextInputProps, 'editable'>;
    renderItem?: SelectRenderItem<TItem>;
    dropdownTestID?: string;
    /*
     * Expects an array of TItem in multiple mode. If the item already exists in the array, it will be removed.
     * */
    value?: TItem | TItem[] | null;
    /*
     * default value for the uncontrolledState
     * */
    defaultValue?: TItem | TItem[] | null;
    /*
     * passes the current selectedItem. Will be an array in multiple mode
     * */
    onChange?: (item: TItem | TItem[] | null) => void;
    /*
     * whether or not pressing the field will open the popup
     * if false, the popup can be controlled using the ref
     * */
    pressOpen?: boolean;
    /**
     * style will go through the TextInput
     * */
    style?: TextInputProps['style'];
    /**
     * style for the dropdownList
     * */
    dropdownListStyle?: ViewStyle;
    /**
     * style for the Pressable container
     * */
    containerStyle?: ViewStyle;
    /**
     * key for the label which will be displayed in input value and list-items of the dropdown list
     * @default 'label'
     * */
    labelKey?: string;
    /**
     * maxHeight of the list
     * */
    maxHeight?: number;
};

export type SelectHandles = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const Select = <TItem extends DefaultItemT = DefaultItemT>(
    {
        inputProps: _inputProps,
        popoverProps: _popoverProps,
        style,
        renderItem: renderItemProp,
        value: valueProp,
        onChange: onChangeProp,
        testID,
        dropdownTestID,
        searchable,
        onQueryChange,
        defaultValue = [],
        pressOpen = true,
        containerStyle: containerStyleProp,
        dropdownListStyle,
        labelKey = 'label',
        ...rest
    }: Props<TItem>,
    ref: any,
) => {
    const { TextInput, IconButton, DropdownList, ListItem } = useMolecules();
    const componentStyles = useComponentStyles('Select', [
        style,
        {
            containerStyle: containerStyleProp,
        },
    ]);

    const triggerRef = useRef(null);

    const [selectionValue, onSelectionValueChange] = useControlledValue<TItem | TItem[] | null>({
        value: valueProp,
        defaultValue,
        onChange: onChangeProp,
    });

    const { state: isOpen, onToggle, setState: setIsOpen } = useToggle(false);

    const [inputLayout, setInputLayout] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0,
    });

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const inputValue = useMemo(() => {
        if (!selectionValue) return '';

        if (!Array.isArray(selectionValue) && Object.keys(selectionValue).length) {
            return selectionValue[labelKey];
        }

        return selectionValue.reduce(
            (acc: string, current: TItem, index: number) =>
                acc.concat(index === 0 ? `${current[labelKey]}` : `, ${current[labelKey]}`),
            '',
        );
    }, [labelKey, selectionValue]);

    const onSelectItemChange = useCallback(
        (item: TItem | TItem[] | null) => {
            onSelectionValueChange(item);
        },
        [onSelectionValueChange],
    );

    const onInputLayout = useCallback((e: LayoutChangeEvent) => {
        setInputLayout({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    }, []);

    const popoverProps = useMemo(
        () => ({
            contentStyles: { width: inputLayout.width },
            showArrow: false,
            offset: searchable && onQueryChange ? -inputLayout.height : 0,
            ..._popoverProps,
        }),
        [inputLayout.width, inputLayout.height, searchable, onQueryChange, _popoverProps],
    );

    const renderItem = useCallback(
        (info: SectionListRenderItemInfo<TItem>) => {
            const selected = isItemInSelection(selectionValue, info.item);

            if (renderItemProp) {
                return renderItemProp({ ...info, selected });
            }

            return (
                <ListItem
                    variant="menuItem"
                    hoverable
                    selected={selected}
                    right={info.item.right}
                    left={info.item.left}>
                    <ListItem.Title>{info.item[labelKey]}</ListItem.Title>
                </ListItem>
            );
        },
        [ListItem, labelKey, renderItemProp, selectionValue],
    );

    // passing the methods and merging with triggerRef so that element instance is also available in the ref (useful for using with components like Tooltip)
    useImperativeHandle<unknown, SelectHandles>(
        ref,
        () =>
            Object.assign(triggerRef.current, {
                isOpen,
                setIsOpen,
            }),
        [isOpen, setIsOpen],
    );

    const onPress = useCallback(() => {
        if (!pressOpen) return;

        onOpen();
    }, [onOpen, pressOpen]);

    const { containerStyle, inputProps } = useMemo(() => {
        const { containerStyle: _containerStyle, ...restStyle } = componentStyles;

        return {
            containerStyle: _containerStyle,
            inputProps: {
                ..._inputProps,
                style: StyleSheet.flatten([restStyle, _inputProps?.style]),
            },
        };
    }, [componentStyles, _inputProps]);

    // TODO - translate label
    return (
        <>
            <Pressable
                ref={triggerRef}
                onPress={onPress}
                onLayout={onInputLayout}
                style={containerStyle}
                testID={testID}>
                <TextInput
                    label={'Select Item'}
                    right={<IconButton name="chevron-down" onPress={onToggle} />}
                    editable={false}
                    value={inputValue}
                    {...inputProps}
                />
            </Pressable>

            <DropdownList
                popoverProps={popoverProps}
                {...rest}
                style={dropdownListStyle}
                renderItem={renderItem}
                selection={selectionValue}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                triggerRef={triggerRef}
                onSelectionChange={onSelectItemChange}
                selectable
                searchable={searchable}
                onQueryChange={onQueryChange}
                testID={dropdownTestID}
            />
        </>
    );
};

const isItemInSelection = <TItem extends DefaultItemT = DefaultItemT>(
    selectionValue: TItem | TItem[] | null,
    item: TItem,
) => {
    // If selection is falsy (null, undefined, false, etc.), the item is not in the selection
    if (!selectionValue) return false;

    if (Array.isArray(selectionValue)) {
        // If selection is an array, check if at least one item in the array has the same ID as the current item
        return selectionValue.some(selectionItem => selectionItem.id === item.id);
    }

    // If selection is an object, check if its ID is the same as the current item's ID
    return selectionValue?.id === item.id;
};

export default memo(forwardRef(Select)) as ISelect;
