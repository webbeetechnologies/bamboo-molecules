import {
    ComponentType,
    forwardRef,
    memo,
    PropsWithoutRef,
    ReactElement,
    ReactNode,
    RefAttributes,
    useCallback,
    useMemo,
} from 'react';
import type { FlatList, ListRenderItemInfo, ViewStyle } from 'react-native';

import { typedMemo } from '../../hocs';
import withKeyboardAccessibility, {
    useCurrentIndexStoreValue,
} from '../../hocs/withKeyboardAccessibility';
import {
    useComponentStyles,
    useControlledValue,
    useMolecules,
    UseSearchableProps,
} from '../../hooks';
import type { FlatListProps } from '../FlatList';
import { useSearchInputProps } from '../../hooks/useSearchable';

type DefaultItemT = {
    id: string | number;
    selectable?: boolean;
    [key: string]: any;
};

// To make a correct type inference
export type IOptionFlatList = <ItemType extends DefaultItemT = DefaultItemT>(
    props: PropsWithoutRef<Props<ItemType> & RefAttributes<FlatList<ItemType>>>,
) => ReactElement;

export type OptionFlatListRenderItemInfo<TItem = DefaultItemT> = ListRenderItemInfo<TItem> & {
    focused: boolean;
    onPress: () => void;
};

export type Props<TItem extends DefaultItemT = DefaultItemT> = UseSearchableProps &
    Omit<FlatListProps<TItem>, 'data' | 'renderItem'> & {
        records: TItem[];
        containerStyle?: ViewStyle;
        searchInputContainerStyle?: ViewStyle;
        /*
         * when set to true, the items will be selectable. Each item will be wrapped around by TouchableRipple component. Whenever they're pressed, onSelectedItem function will trigger
         * */
        selectable?: boolean;
        /*
         * when set to true, multiple items can be selected and selectedItem will be an array. onSelectItem's argument will be an array.
         * */
        multiple?: boolean;
        /*
         * Expects an array of TItem in multiple mode. If the item already exists in the array, it will be removed.
         * */
        selection?: TItem | TItem[];
        /*
         * passes the current selectedItem. Will be an array in multiple mode. Item is the specific item which is pressed
         * */
        onSelectionChange?: (selection: TItem | TItem[], item: TItem) => void;
        customFlatList?: ComponentType<FlatListProps<TItem>>;
        renderItem: (
            info: ListRenderItemInfo<TItem> & {
                onPress: () => void;
                focused: boolean;
            },
        ) => ReactNode;
        enableKeyboardNavigation?: boolean;
        onCancel?: () => void;
    };

const OptionFlatList = <TItem extends DefaultItemT = DefaultItemT>(
    {
        query,
        onQueryChange,
        searchInputProps: dirtySearchInputProps,
        searchable,
        containerStyle = {},
        searchInputContainerStyle = {},
        style: styleProp,
        records,
        multiple = false,
        selectable,
        selection: selectionProp,
        onSelectionChange: onSelectionChangeProp,
        renderItem: renderItemProp,
        customFlatList: CustomFlatList,
        testID,
        ...rest
    }: Props<TItem>,
    ref: any,
) => {
    const { FlatList, View, TextInput } = useMolecules();
    const FlatListComponent = CustomFlatList || FlatList;

    const [selection, onSelectionChange] = useControlledValue<TItem | TItem[]>({
        value: selectionProp,
        onChange: onSelectionChangeProp,
    });

    const componentStyles = useComponentStyles('OptionFlatList', [
        { container: containerStyle, searchInputContainer: searchInputContainerStyle },
    ]);

    const { containerStyles, searchInputContainerStyles, style } = useMemo(() => {
        const { container, searchInputContainer, ...restStyle } = componentStyles;

        return {
            containerStyles: container,
            searchInputContainerStyles: searchInputContainer,
            style: [restStyle, styleProp],
        };
    }, [componentStyles, styleProp]);

    const searchInputProps = useSearchInputProps(dirtySearchInputProps);

    const onPressItem = useCallback(
        (item: TItem) => {
            const isSelected = Array.isArray(selection)
                ? selection.find(sItem => sItem?.id === item.id)
                : selection?.id === item.id;

            onSelectionChange(
                // if multiple we push the item into an array and if it's already exists we filter them
                multiple
                    ? Array.isArray(selection)
                        ? isSelected
                            ? selection.filter(sItem => sItem.id !== item.id)
                            : [...selection, item]
                        : [item]
                    : item,
                item,
            );
        },
        [multiple, onSelectionChange, selection],
    );

    const renderItem = useCallback(
        (info: ListRenderItemInfo<TItem>) => {
            return (
                <OptionListItem
                    renderItem={renderItemProp}
                    info={info}
                    onPressItem={onPressItem}
                    selectable={selectable}
                    testID={testID && `${testID}-${info.item.id}`}
                />
            );
        },
        [onPressItem, renderItemProp, selectable, testID],
    );

    const keyExtractor = useCallback((item: TItem) => `${item.id}`, []);

    return (
        <View style={containerStyles}>
            <>
                {searchable && (
                    <View style={searchInputContainerStyles}>
                        <TextInput
                            value={query}
                            onChangeText={onQueryChange}
                            {...searchInputProps}
                        />
                    </View>
                )}
            </>
            <FlatListComponent
                ref={ref}
                keyExtractor={keyExtractor}
                testID={testID}
                {...rest}
                data={records}
                renderItem={renderItem}
                style={style}
            />
        </View>
    );
};

type OptionListItemProps<TItem extends DefaultItemT = DefaultItemT> = Pick<
    Props<TItem>,
    'renderItem'
> & {
    info: ListRenderItemInfo<TItem>;
    onPressItem?: (item: TItem) => void;
    selectable?: boolean;
    testID?: string;
};

const OptionListItem = typedMemo(
    <TItem extends DefaultItemT = DefaultItemT>({
        info,
        renderItem,
        selectable,
        onPressItem,
        testID,
    }: OptionListItemProps<TItem>) => {
        const { TouchableRipple } = useMolecules();

        const focused = useCurrentIndexStoreValue(state => {
            return state.currentIndex === info.index;
        });
        const onPress = useCallback(() => {
            onPressItem?.(info.item);
        }, [info.item, onPressItem]);

        const renderItemInfo = useMemo(
            () => ({
                ...info,
                focused,
                onPress,
            }),
            [focused, info, onPress],
        );

        if (selectable && info.item?.selectable !== false) {
            return (
                <TouchableRipple testID={testID} onPress={onPress}>
                    {renderItem(renderItemInfo)}
                </TouchableRipple>
            );
        }

        return <>{renderItem(renderItemInfo)}</>;
    },
);

export default memo(
    withKeyboardAccessibility(forwardRef(OptionFlatList), 'records', true),
) as IOptionFlatList;
