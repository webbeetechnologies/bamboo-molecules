import { memo, forwardRef, useMemo, useCallback } from 'react';
import type { FlashListProps } from '@shopify/flash-list';
import type { StyleProp, TextStyle } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

type NewItems = { item: Section; index: number };

// interface Data {
//     title: string;
//     data: any[];
// }

type Item = {};

interface Section {
    title: string;
    data: Item[];
}

export type Props = FlashListProps<{}> & {
    headerStyle?: StyleProp<TextStyle>;
    section: Section;
    renderHeader?: Section;
} & any;

const SectionList = (
    {
        section,
        renderItem,
        renderHeader,
        style: styleProp,
        headerStyle: headerStyleProp,
        contentContainerStyle: contentContainerStyleProps,
        ListHeaderComponentStyle: listHeaderComponentStyleProps,
        ListFooterComponentStyle: listFooterComponentStyleProps,
        ...props
    }: Props,
    ref: any,
) => {
    const { FlatList } = useMolecules();
    const componentStyles = useComponentStyles('SectionList', [
        styleProp,
        {
            headerStyleProp,
            contentContainerStyleProps,
            listFooterComponentStyleProps,
            listHeaderComponentStyleProps,
        },
    ]);

    const { contentContainerStyles, listFooterComponentStyles, listHeaderComponentStyles } =
        useMemo(() => {
            const { contentContainerStyle, ListHeaderComponentStyle, ListFooterComponentStyle } =
                componentStyles;
            return {
                contentContainerStyles: contentContainerStyle,
                listFooterComponentStyles: ListFooterComponentStyle,
                listHeaderComponentStyles: ListHeaderComponentStyle,
            };
        }, [componentStyles]);

    // const render = useCallback(
    //     ({ rowItems, rowIndex }: NewItems) => {
    //         if (typeof rowItems === 'string') {
    //             // Rendering header
    //             return <Text style={headerStyleProp}>{rowItems}</Text>;
    //         } else {
    //             // Render item
    //             return renderItem({ item: rowItems, index: rowIndex, target: 'Cell' });
    //         }
    //     },
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [renderItem],
    // );

    // const stickyHeaderIndices = data
    //     .map((item: any, index: number) => {
    //         if (typeof item === 'string') {
    //             return index;
    //         } else {
    //             return null;
    //         }
    //     })
    //     .filter((item: any) => item !== null) as number[];

    // const render = (items: any, index: number) => {
    //     if (!items) return null;
    //     const newItems = items;
    //     const flattenItem = newItems.flat();
    //     // console.error('>>>>', items, typeof items, index);
    //     console.error('>>>> flatten >>>>', flattenItem, index);
    //     return null;
    // };

    // const flattenItems = (itemVal: Record<string, any>) => {
    //     let flattenedStyles = {};
    //     if (itemVal) {
    //         flattenedStyles = { ...flattenedStyles, ...(itemVal || {}) };
    //     }
    //     return flattenedStyles;
    // };

    const render = useCallback(
        ({ item, index }: NewItems) => {
            if (Object.keys(item).find(e => e === 'data')) {
                // const newArr = ...item;
                // console.error('data is available', item, typeof item);
                const newData = item?.data;
                return newData.map(val => renderItem({ item: val, index }));
            }
            return renderHeader({ item, index });

            // const newData = item?.data;
            // return typeof Object.values(item).flat() === 'object'
            //     ? newData.map(val => renderItem({ item: val, index }))
            //     : renderHeader({ item, index });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [renderItem],
    );

    return (
        <FlatList
            section
            data={section}
            // renderItem={({ item, index }) => render({ rowItems: item, rowIndex: index })}
            renderItem={render}
            // renderItem={renderItem}
            // getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
            // getItemType={type => console.log('type', type)}
            // stickyHeaderIndices={stickyHeaderIndices}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList));
