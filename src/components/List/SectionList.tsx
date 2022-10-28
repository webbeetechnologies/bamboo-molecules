import { memo, forwardRef, useMemo, useCallback } from 'react';
import type { FlashListProps } from '@shopify/flash-list';
import type { StyleProp, TextStyle } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

type NewItems = { item: Section; index: number };

type Item = {};

interface Section {
    title: string;
    data: Item[];
}

export type Props = FlashListProps<{}> & {
    headerStyle?: StyleProp<TextStyle>;
    renderHeader?: Section;
} & any;

const SectionList = (
    {
        data,
        renderItem: renderItemProps,
        renderHeader,
        style: styleProp,
        headerStyle: headerStyleProp,
        contentContainerStyle: contentContainerStyleProp,
        ListHeaderComponentStyle: listHeaderComponentStyleProp,
        ListFooterComponentStyle: listFooterComponentStyleProp,
        ...props
    }: Props,
    ref: any,
) => {
    const { FlatList, Text } = useMolecules();
    const componentStyles = useComponentStyles('SectionList', [
        styleProp,
        {
            headerStyleProp,
            contentContainerStyleProp,
            listFooterComponentStyleProp,
            listHeaderComponentStyleProp,
        },
    ]);

    const {
        contentContainerStyles,
        listFooterComponentStyles,
        listHeaderComponentStyles,
        headerStyles,
        styles,
    } = useMemo(() => {
        const {
            headerStyleProp: headerStyle,
            contentContainerStyleProp: contentContainerStyle,
            listHeaderComponentStyleProp: listHeaderComponentStyle,
            listFooterComponentStyleProp: listFooterComponentStyle,
            styleProp: style,
        } = componentStyles;
        return {
            contentContainerStyles: contentContainerStyle,
            listFooterComponentStyles: listFooterComponentStyle,
            listHeaderComponentStyles: listHeaderComponentStyle,
            headerStyles: headerStyle,
            styles: style,
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

    const render = useCallback(
        ({ item, index }: NewItems) => {
            const newData = [...Object.values(item)].flat();
            return newData.map(val => {
                if (typeof val === 'object') {
                    return renderItemProps({ item: val, index, target: 'Cell' });
                } else {
                    return renderHeader ? (
                        renderHeader({ item })
                    ) : (
                        <Text style={headerStyles}>{val}</Text>
                    );
                }
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [renderItemProps],
    );

    return (
        <FlatList
            data={data}
            style={styles}
            // renderItem={({ item, index }) => render({ rowItems: item, rowIndex: index })}
            renderItem={render}
            // getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
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
