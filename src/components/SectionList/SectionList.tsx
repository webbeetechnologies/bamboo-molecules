import {
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

export type Props<TItem, TSection = DefaultSectionT> = Omit<FlashListProps<TItem>, 'data'> & {
    sections: TSection[];
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
        const newData: any[] = [];

        sections.forEach(section => {
            newData.push(section);
            // @ts-ignore
            section?.data?.forEach(d => {
                // @ts-ignore
                newData.push({ item: d, section: section });
            });
        });

        return newData;
    }, [sections]);

    // TODO fix ts issues
    const renderItem = useCallback(
        ({ item, index, target, extraData }: ListRenderItemInfo<TItem>) => {
            // @ts-ignore
            if (item?.item) {
                return renderItemProps?.({
                    // @ts-ignore
                    item: item?.item,
                    // @ts-ignore
                    section: item?.section,
                    index,
                    target,
                    extraData,
                });
            } else {
                // @ts-ignore
                return renderSectionHeader?.({ section: item });
            }
        },
        [renderSectionHeader, renderItemProps],
    );

    return (
        <FlatList
            style={styles}
            data={normalizedData}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList)) as ISectionList;
