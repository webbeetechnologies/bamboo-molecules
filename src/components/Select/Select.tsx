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
import { LayoutChangeEvent, Pressable, SectionList, ViewStyle } from 'react-native';
import { useComponentStyles, useControlledValue, useMolecules, useToggle } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import type { DropdownListProps } from '../DropdownList';
import type { SectionListRenderItemInfo } from '../SectionList';

type DefaultItemT = {
    id: string | number;
    label: string;
    right?: ReactNode;
    left?: ReactNode;
    [key: string]: any;
};

type SelectRenderItemInfo<TItem> = SectionListRenderItemInfo<TItem> & {
    selected?: boolean;
};

type DefaultSectionT<TItem> = {
    data: TItem[];
    [key: string]: any;
};

type SelectRenderItem<TItem> = (info: SelectRenderItemInfo<TItem>) => ReactElement | null;

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
    | 'selectedItem'
    | 'onSelectItemChange'
> & {
    inputProps?: Omit<TextInputProps, 'editable'>;
    containerStyle?: ViewStyle;
    renderItem?: SelectRenderItem<TItem>;
    dropdownTestID?: string;
    /*
     * Expects an array of TItem in multiple mode. If the item already exists in the array, it will be removed.
     * */
    value?: TItem | TItem[];
    /*
     * default value for the uncontrolledState
     * */
    defaultValue?: TItem | TItem[];
    /*
     * passes the current selectedItem. Will be an array in multiple mode
     * */
    onChange?: (item: TItem | TItem[]) => void;
    /*
     * whether or not pressing the field will open the popup
     * if false, the popup can be controlled using the ref
     * */
    pressOpen?: boolean;
};

export type SelectHandles = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const Select = <TItem extends DefaultItemT = DefaultItemT>(
    {
        inputProps,
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
        ...rest
    }: Props<TItem>,
    ref: any,
) => {
    const { TextInput, IconButton, DropdownList, ListItem } = useMolecules();
    const componentStyles = useComponentStyles('Select', style);

    const triggerRef = useRef(null);

    const [selectionValue, onSelectionValueChange] = useControlledValue({
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

        if (!Array.isArray(selectionValue)) {
            return selectionValue.label;
        }

        return selectionValue.reduce(
            (acc: string, current: TItem, index: number) =>
                acc.concat(index === 0 ? `${current.label}` : `, ${current.label}`),
            '',
        );
    }, [selectionValue]);

    const onSelectItemChange = useCallback(
        (item: TItem | TItem[]) => {
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
            const selected = Array.isArray(selectionValue)
                ? !!selectionValue.find(item => item.id === info.item.id)
                : selectionValue.id === info.item.id;

            if (renderItemProp) renderItemProp({ ...info, selected });

            return (
                <ListItem
                    variant="menuItem"
                    selected={selected}
                    right={info.item.right}
                    left={info.item.left}>
                    <ListItem.Title>{info.item.label}</ListItem.Title>
                </ListItem>
            );
        },
        [ListItem, renderItemProp, selectionValue],
    );

    // passing the methods and merging with triggerRef so that element instance is also available in the ref (useful for using with components like Tooltip)
    useImperativeHandle<unknown, SelectHandles>(ref, () =>
        Object.assign(triggerRef.current, {
            isOpen,
            setIsOpen,
        }),
    );

    const onPress = useCallback(() => {
        if (!pressOpen) return;

        onOpen();
    }, [onOpen, pressOpen]);

    // TODO - translate label
    return (
        <>
            <Pressable
                ref={triggerRef}
                onPress={onPress}
                onLayout={onInputLayout}
                style={componentStyles}
                testID={testID}>
                <TextInput
                    label={'Select Item'}
                    right={<IconButton name="chevron-down" onPress={onToggle} />}
                    editable={false}
                    {...(inputProps || {})}
                    value={inputValue}
                />
            </Pressable>

            <DropdownList
                popoverProps={popoverProps}
                {...rest}
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

export default memo(forwardRef(Select)) as ISelect;
