import { memo, useMemo, forwardRef, PropsWithoutRef, RefAttributes, ReactElement } from 'react';
import { StyleSheet, FlatListProps } from 'react-native';
import { FlatList as GestureHandlerFlatList } from 'react-native-gesture-handler';
import { useComponentStyles } from '../../hooks';

export type FlatListRef<ItemType = any> = GestureHandlerFlatList<ItemType>;

export type Props<TItem> = FlatListProps<TItem>;

// To make a correct type inference
export type IFlatList = <ItemType = any>(
    props: PropsWithoutRef<FlatListProps<ItemType>> & RefAttributes<FlatListRef<ItemType>>,
) => ReactElement;

function FlatList<T = any>(
    {
        style: styleProp,
        contentContainerStyle: contentContainerStyleProps,
        ListHeaderComponentStyle: listHeaderComponentStyleProps,
        ListFooterComponentStyle: listFooterComponentStyleProps,
        data,
        renderItem,
        ...props
    }: Props<T>,
    ref: any,
) {
    const componentStyles = useComponentStyles('FlatList', [
        styleProp,
        {
            contentContainerStyle: contentContainerStyleProps,
            listHeaderComponentStyle: listHeaderComponentStyleProps,
            listFooterComponentStyle: listFooterComponentStyleProps,
        },
    ]);

    const { contentContainerStyles, listFooterComponentStyles, listHeaderComponentStyles } =
        useMemo(() => {
            const {
                contentContainerStyle,
                listHeaderComponentStyle,
                listFooterComponentStyle,
                ...restStyles
            } = componentStyles;
            return {
                style: restStyles,
                contentContainerStyles: StyleSheet.flatten([contentContainerStyle, restStyles]),
                listFooterComponentStyles: listHeaderComponentStyle,
                listHeaderComponentStyles: listFooterComponentStyle,
            };
        }, [componentStyles]);

    return (
        <GestureHandlerFlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
}

export default memo(forwardRef(FlatList)) as IFlatList;
