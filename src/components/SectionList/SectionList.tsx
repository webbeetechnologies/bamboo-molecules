import React, {
    memo,
    forwardRef,
    useMemo,
    useCallback,
    PropsWithoutRef,
    RefAttributes,
    ReactElement,
} from 'react';
import type { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { useComponentStyles, useMolecules } from '../../hooks';

type DefaultSectionT = {
    [key: string]: any;
};

export type Props<TItem, TSection = DefaultSectionT> = Omit<
    FlashListProps<TItem>,
    'data' | 'renderItem'
> & {
    sections: TSection[];
    renderItem: (
        info: ListRenderItemInfo<TItem> & { section?: TSection },
    ) => React.ReactElement | null;
    renderSectionHeader?: (props: { section: TSection }) => any;
};

// To make a correct type inference
export type ISectionList = <ItemType = any, TSectionType = DefaultSectionT>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<FlashList<ItemType>>,
) => ReactElement;

const SectionList = <TItem, TSection = DefaultSectionT>(
    {
        sections,
        renderItem: renderItemProps,
        renderSectionHeader,
        style: styleProp,
        contentContainerStyle: contentContainerStyleProp,
        ListHeaderComponentStyle: listHeaderComponentStyleProp,
        ListFooterComponentStyle: listFooterComponentStyleProp,
        ...props
    }: Props<TItem, TSection>,
    ref: any,
) => {
    const { FlatList } = useMolecules();
    const componentStyles = useComponentStyles('SectionList', [
        styleProp,
        {
            contentContainerStyle: contentContainerStyleProp,
            listHeaderComponentStyle: listFooterComponentStyleProp,
            listFooterComponentStyle: listHeaderComponentStyleProp,
        },
    ]);

    const { contentContainerStyles, listFooterComponentStyles, listHeaderComponentStyles, styles } =
        useMemo(() => {
            const {
                contentContainerStyle,
                listHeaderComponentStyle,
                listFooterComponentStyle,
                styleProp: style,
            } = componentStyles;
            return {
                contentContainerStyles: contentContainerStyle,
                listFooterComponentStyles: listFooterComponentStyle,
                listHeaderComponentStyles: listHeaderComponentStyle,
                styles: style,
            };
        }, [componentStyles]);

    const normalizedData = useMemo(() => {
        return sections.reduce((acc: TSection[], current: TSection) => {
            return acc.concat([
                current,
                // @ts-ignore
                ...(current?.data?.map((item: TItem) => ({
                    item: item,
                    section: current,
                })) || []),
            ]);
        }, []);
    }, [sections]);

    const renderItem = useCallback(
        ({
            item,
            index,
            target,
            extraData,
        }: ListRenderItemInfo<TSection & { item?: TItem; section?: TSection }>) => {
            if (item?.item) {
                return renderItemProps?.({
                    item: item?.item as TItem,
                    section: item?.section,
                    index,
                    target,
                    extraData,
                });
            } else {
                return renderSectionHeader?.({ section: item });
            }
        },
        [renderSectionHeader, renderItemProps],
    );

    return (
        <FlatList
            style={styles}
            data={normalizedData as any}
            renderItem={renderItem as any}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList)) as ISectionList;
