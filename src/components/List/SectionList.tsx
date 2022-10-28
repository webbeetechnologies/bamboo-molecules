import { memo, forwardRef, useMemo } from 'react';
import type { FlashListProps } from '@shopify/flash-list';
import type { StyleProp, TextStyle } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

// type NewItems = { rowItems: {}; rowIndex: number };

// interface Data {
//     title: string;
//     data: any[];
// }

export type Props = FlashListProps<{}> & {
    headerStyle?: StyleProp<TextStyle>;
} & any;

const SectionList = (
    {
        data,
        // renderItem,
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

    // const render = (items: {}, index: number) => {
    //     if (!items) return null;

    //     //
    //     // const;
    // };

    return (
        <FlatList
            data={data}
            // renderItem={({ item, index }) => render({ rowItems: item, rowIndex: index })}
            // renderItem={({ item, index }) => render(item, index)}
            getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
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
