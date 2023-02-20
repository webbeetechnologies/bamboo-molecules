import { memo, PropsWithoutRef, ReactElement, RefAttributes, useCallback, useMemo } from 'react';
import type { ViewStyle, SectionList } from 'react-native';
import {
    useComponentStyles,
    useControlledValue,
    useMolecules,
    useSearchable,
    UseSearchableProps,
} from '../../hooks';
import type { SectionListProps, SectionListRenderItemInfo } from '../SectionList';

type DefaultSectionT<TItem> = {
    data: TItem[];
    [key: string]: any;
};

type DefaultItemT = {
    id: string | number;
    [key: string]: any;
};

// To make a correct type inference
export type IOptionList = <ItemType = DefaultItemT, TSectionType = DefaultSectionT<ItemType>>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<SectionList<ItemType>>,
) => ReactElement;

export type Props<TItem = DefaultItemT, TSection = DefaultSectionT<TItem>> = UseSearchableProps &
    Omit<SectionListProps<TItem, TSection>, 'sections'> & {
        records: TSection[];
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
         * passes the current selectedItem. Will be an array in multiple mode
         * */
        onSelectionChange?: (item: TItem | TItem[]) => void;
    };

const OptionList = <
    TItem extends DefaultItemT = DefaultItemT,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
>({
    query,
    onQueryChange,
    searchInputProps,
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
    ...rest
}: Props<TItem, TSection>) => {
    const { SectionList, View, TouchableRipple } = useMolecules();
    const SearchField = useSearchable({ query, onQueryChange, searchable, searchInputProps });
    const [selection, onSelectionChange] = useControlledValue<TItem | TItem[]>({
        value: selectionProp,
        onChange: onSelectionChangeProp,
    });

    const componentStyles = useComponentStyles('OptionList', [
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
            );
        },
        [multiple, onSelectionChange, selection],
    );

    const renderItem = useCallback(
        (info: SectionListRenderItemInfo<TItem, TSection>) => {
            if (!renderItemProp) return null;

            return selectable && info.item?.selectable !== false ? (
                <TouchableRipple onPress={() => onPressItem(info.item)}>
                    {renderItemProp(info)}
                </TouchableRipple>
            ) : (
                renderItemProp(info)
            );
        },
        [TouchableRipple, onPressItem, renderItemProp, selectable],
    );

    const keyExtractor = useCallback((item: TItem) => `${item.id}`, []);

    return (
        <View style={containerStyles}>
            <>{SearchField && <View style={searchInputContainerStyles}>{SearchField}</View>}</>
            <SectionList
                keyExtractor={keyExtractor}
                {...rest}
                sections={records}
                renderItem={renderItem}
                style={style}
            />
        </View>
    );
};

export default memo(OptionList) as IOptionList;
