import { memo, useMemo, forwardRef, PropsWithoutRef, RefAttributes, ReactElement } from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useComponentStyles } from '../../hooks';

export type Props<TItem> = FlashListProps<TItem>;

// To make a correct type inference
export type IFlatList = <ItemType = any>(
    props: PropsWithoutRef<FlashListProps<ItemType>> & RefAttributes<FlashList<ItemType>>,
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

    const { contentContainerStyles, listFooterComponentStyles, listHeaderComponentStyles, style } =
        useMemo(() => {
            const {
                contentContainerStyle,
                listHeaderComponentStyle,
                listFooterComponentStyle,
                ...restStyles
            } = componentStyles;
            return {
                style: restStyles,
                contentContainerStyles: contentContainerStyle,
                listFooterComponentStyles: listHeaderComponentStyle,
                listHeaderComponentStyles: listFooterComponentStyle,
            };
        }, [componentStyles]);

    return (
        <FlashList
            data={data}
            style={style}
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
