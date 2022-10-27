import { memo, useMemo, forwardRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useComponentStyles } from '../../hooks';

export type Props = FlashListProps<{}> & {
    /**
     * You can use `contentContainerStyle` to apply padding that will be applied to the whole content itself.
     * For example, you can apply this padding, so that all of your items have leading and trailing space.
     * Note: horizontal padding is ignored on vertical lists and vertical padding on horizontal ones.
     */
    contentContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Styling for internal View for `ListHeaderComponent`.
     */
    ListHeaderComponentStyle?: StyleProp<ViewStyle>;

    /**
     * Styling for internal View for `ListFooterComponent`.
     */
    ListFooterComponentStyle?: StyleProp<ViewStyle>;
};

const FlatList = (
    {
        style: styleProp,
        contentContainerStyle: contentContainerStyleProps,
        ListHeaderComponentStyle: listHeaderComponentStyleProps,
        ListFooterComponentStyle: listFooterComponentStyleProps,
        data,
        renderItem,
        ...props
    }: Props,
    ref: any,
) => {
    const componentStyles = useComponentStyles('FlatList', [
        styleProp,
        contentContainerStyleProps,
        listHeaderComponentStyleProps,
        listFooterComponentStyleProps,
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

    return (
        <FlashList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(FlatList));
