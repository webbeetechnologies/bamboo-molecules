import { memo, PropsWithoutRef, ReactElement, RefAttributes, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import type { FlashList } from '@shopify/flash-list';
import {
    useComponentStyles,
    useControlledValue,
    useMolecules,
    useSearchable,
    UseSearchableProps,
} from '../../hooks';
import type { SectionListProps } from '../SectionList';
import type { SectionListRenderItemInfo } from '../SectionList/types';

type DefaultSectionT<TItem> = {
    data?: TItem[];
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
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<FlashList<ItemType>>,
) => ReactElement;

export type Props<TItem, TSection> = UseSearchableProps &
    Omit<SectionListProps<TItem, TSection>, 'sections'> & {
        records: TSection[];
        containerStyle?: ViewStyle;
        searchInputContainerStyle?: ViewStyle;
        multiple?: boolean;
        selectable?: boolean;
        selectedItem?: TItem | TItem[];
        onSelectItemChange?: (item: TItem | TItem[]) => void;
    };

const OptionList = <
    TItem extends DefaultItemT = DefaultItemT,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
>({
    query = '',
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
                multiple ? [...(Array.isArray(selectedItem) ? selectedItem : []), item] : item,
            );
        },
        [multiple, onSelectItemChange, selectedItem],
    );

    const renderItem = useCallback(
        (info: SectionListRenderItemInfo<TItem, TSection>) => {
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
