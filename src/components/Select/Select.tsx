import { memo, ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, ViewStyle } from 'react-native';
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

type SelectRenderItem<TItem> = (info: SelectRenderItemInfo<TItem>) => ReactElement | null;

export type SelectProps<TItem extends DefaultItemT = DefaultItemT> = Omit<
    DropdownListProps<TItem>,
    'triggerRef' | 'renderItem' | 'isOpen' | 'setIsOpen' | 'selectable'
> & {
    inputProps?: Omit<TextInputProps, 'editable'>;
    containerStyle?: ViewStyle;
    renderItem?: SelectRenderItem<TItem>;
    dropdownTestID?: string;
};

const Select = <TItem extends DefaultItemT = DefaultItemT>({
    inputProps = {},
    popoverProps: _popoverProps,
    style,
    renderItem: renderItemProp,
    selectedItem: selectedItemProp,
    onSelectItemChange: onSelectedItemChangeProp,
    testID,
    dropdownTestID,
    ...rest
}: SelectProps<TItem>) => {
    const { TextInput, IconButton, DropdownList, ListItem } = useMolecules();
    const componentStyles = useComponentStyles('Select', style);

    const triggerRef = useRef(null);

    const [selectedItem, onSelectedItemChange] = useControlledValue({
        value: selectedItemProp,
        defaultValue: [],
        onChange: onSelectedItemChangeProp,
    });

    const { state: isOpen, onToggle, setState: setIsOpen } = useToggle(false);
    const [value, setValue] = useState('');

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

    const onSelectItemChange = useCallback(
        (item: TItem | TItem[]) => {
            onSelectedItemChange(item);

            if (!Array.isArray(item)) setValue(item.label);

            setValue(
                item.reduce(
                    (acc: string, current: TItem, index: number) =>
                        acc.concat(index === 0 ? `${current.label}` : `, ${current.label}`),
                    '',
                ),
            );
        },
        [onSelectedItemChange],
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
            offset: -inputLayout.height,
            ..._popoverProps,
        }),
        [inputLayout, _popoverProps],
    );

    const renderItem = useCallback(
        (info: SelectRenderItemInfo<TItem>) => {
            const selected = Array.isArray(selectedItem)
                ? !!selectedItem.find(item => item.id === info.item.id)
                : selectedItem.id === info.item.id;

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
        [ListItem, renderItemProp, selectedItem],
    );

    // TODO fix TS issues and Popover issues
    return (
        <>
            <Pressable
                ref={triggerRef}
                onPress={onOpen}
                onLayout={onInputLayout}
                style={componentStyles}
                testID={testID}>
                <TextInput
                    label={'Select Item'}
                    {...inputProps}
                    right={<IconButton name="chevron-down" onPress={onToggle} />}
                    value={value}
                    editable={false}
                />
            </Pressable>

            <DropdownList
                popoverProps={popoverProps}
                renderItem={renderItem as any}
                {...(rest as any)}
                selectedItem={selectedItem}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                triggerRef={triggerRef}
                onSelectItemChange={onSelectItemChange as any}
                selectable
                testID={dropdownTestID}
            />
        </>
    );
};

export default memo(Select);
