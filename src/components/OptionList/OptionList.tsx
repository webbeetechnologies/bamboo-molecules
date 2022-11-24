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
    [key: string]: any;
};

// To make a correct type inference
export type IOptionList = <
    ItemType extends DefaultItemT = DefaultItemT,
    TSectionType extends DefaultSectionT<ItemType> = DefaultSectionT<ItemType>,
>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<SectionList<ItemType>>,
) => ReactElement;

export type Props<
    TItem = any,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
> = UseSearchableProps &
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
        selectedItem?: TItem | TItem[];
        /*
         * passes the current selectedItem. Will be an array in multiple mode
         * */
        onSelectItemChange?: (item: TItem | TItem[]) => void;
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
    selectedItem: selectedItemProp,
    onSelectItemChange: onSelectItemChangeProp,
    renderItem: renderItemProp,
    ...rest
}: Props<TItem, TSection>) => {
    const { SectionList, View, TouchableRipple } = useMolecules();
    const SearchField = useSearchable({ query, onQueryChange, searchable, searchInputProps });
    const [selectedItem, onSelectItemChange] = useControlledValue<TItem | TItem[]>({
        value: selectedItemProp,
        onChange: onSelectItemChangeProp,
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
            onSelectItemChange(
                // if multiple we push the item into an array and if it's already exists we filter them
                multiple
                    ? Array.isArray(selectedItem)
                        ? selectedItem.filter(sItem => sItem !== item)
                        : [item]
                    : item,
            );
        },
        [multiple, onSelectItemChange, selectedItem],
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

    return (
        <View style={containerStyles}>
            <>{SearchField && <View style={searchInputContainerStyles}>{SearchField}</View>}</>
            <SectionList {...rest} sections={records} renderItem={renderItem} style={style} />
        </View>
    );
};

export default memo(OptionList) as IOptionList;
