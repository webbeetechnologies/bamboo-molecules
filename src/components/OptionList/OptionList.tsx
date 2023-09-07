import {
    forwardRef,
    memo,
    PropsWithoutRef,
    ReactElement,
    ReactNode,
    RefAttributes,
    useCallback,
    useMemo,
} from 'react';
import type { ViewStyle, SectionList } from 'react-native';
import {
    useComponentStyles,
    useControlledValue,
    useMolecules,
    useSearchable,
    UseSearchableProps,
} from '../../hooks';
import type { SectionListProps, SectionListRenderItemInfo } from '../SectionList';
import withKeyboardAccessibility, {
    useCurrentIndexStoreValue,
} from '../../hocs/withKeyboardAccessibility';
import { typedMemo } from '../../hocs';

type DefaultSectionT<TItem> = {
    data: TItem[];
    [key: string]: any;
};

type DefaultItemT = {
    id: string | number;
    [key: string]: any;
};

export type OptionListRenderItemInfo<
    TItem = DefaultItemT,
    TSection = DefaultSectionT<TItem>,
> = SectionListRenderItemInfo<TItem, TSection> & {
    focused: boolean;
    [key: string]: any;
};

// To make a correct type inference
export type IOptionList = <ItemType = DefaultItemT, TSectionType = DefaultSectionT<ItemType>>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<SectionList<ItemType>>,
) => ReactElement;

export type Props<TItem = DefaultItemT, TSection = DefaultSectionT<TItem>> = UseSearchableProps &
    Omit<SectionListProps<TItem, {}>, 'sections' | 'renderItem'> & {
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
        selection?: TItem | TItem[] | null;
        /*
         * passes the current selectedItem. Will be an array in multiple mode
         * */
        onSelectionChange?: (item: TItem | TItem[] | null) => void;
        renderItem: (
            info: SectionListRenderItemInfo<TItem, TSection> & {
                onPress: () => void;
                focused: boolean;
            },
        ) => ReactNode;
        enableKeyboardNavigation?: boolean;
        onCancel?: () => void;
    };

const getIdToIndexMapFromRecords = <
    TItem extends DefaultItemT = DefaultItemT,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
>(
    records: TSection[],
) => {
    const flattenRecords = records.reduce((acc, item, sectionIndex: Number) => {
        return acc.concat((item.data || []).map((t: any) => ({ ...t, sectionIndex })));
    }, [] as TItem[]);

    return flattenRecords.reduce((acc, item, currentIndex) => {
        acc[item.id] = currentIndex;

        return acc;
    }, {} as Record<number | string, number>);
};

const OptionList = <
    TItem extends DefaultItemT = DefaultItemT,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
>(
    {
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
        testID,
        ...rest
    }: Props<TItem, TSection>,
    ref: any,
) => {
    const { SectionList, View } = useMolecules();
    const SearchField = useSearchable({ query, onQueryChange, searchable, searchInputProps });
    const [selection, onSelectionChange] = useControlledValue<TItem | TItem[] | null>({
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

    // To get the actual flatten indexes
    const idToIndexMap = useMemo(() => getIdToIndexMapFromRecords(records), [records]);

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
            return (
                <OptionListItem
                    // TODO - fix ts issues
                    renderItem={renderItemProp}
                    info={info}
                    testID={testID ? `${testID}-${info.item.id}` : ''}
                    index={idToIndexMap[info.item.id as keyof typeof idToIndexMap] as number}
                    onPressItem={onPressItem}
                    selectable={selectable}
                />
            );
        },
        [idToIndexMap, testID, onPressItem, renderItemProp, selectable],
    );

    const keyExtractor = useCallback((item: TItem) => `${item.id}`, []);

    return (
        <View style={containerStyles}>
            <>{SearchField && <View style={searchInputContainerStyles}>{SearchField}</View>}</>
            <SectionList
                ref={ref}
                keyExtractor={keyExtractor}
                testID={testID}
                {...rest}
                sections={records}
                renderItem={renderItem as SectionListProps['renderItem']}
                style={style}
            />
        </View>
    );
};

type OptionListItemProps<TItem = DefaultItemT, TSection = DefaultSectionT<TItem>> = Pick<
    Props<TItem, TSection>,
    'renderItem'
> & {
    info: SectionListRenderItemInfo<TItem, TSection>;
    onPressItem?: (item: TItem) => void;
    selectable?: boolean;
    index: number;
    testID?: string;
};

const OptionListItem = typedMemo(
    <
        TItem extends DefaultItemT = DefaultItemT,
        TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
    >({
        info,
        renderItem,
        selectable,
        onPressItem,
        index,
        testID,
    }: OptionListItemProps<TItem, TSection>) => {
        const { TouchableRipple } = useMolecules();

        const focused = useCurrentIndexStoreValue(state => {
            return state.currentIndex === index;
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

export default memo(withKeyboardAccessibility(forwardRef(OptionList))) as IOptionList;
