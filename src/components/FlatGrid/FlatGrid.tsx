import { memo, ReactElement, PropsWithoutRef, RefAttributes, useMemo, forwardRef } from 'react';
import type { FlatList } from 'react-native';
import { FlatGrid as SuperFlatGrid, FlatGridProps } from 'react-native-super-grid';
import { useComponentStyles, useMolecules } from '../../hooks';

export type IFlatGrid = <ItemType = any>(
    props: PropsWithoutRef<FlatGridProps<ItemType>> & RefAttributes<FlatList<ItemType>>,
) => ReactElement;

const FlatGrid = (
    {
        style: styleProp,
        contentContainerStyle: contentContainerStyleProp,
        additionalRowStyle: additionalRowStyleProp,
        itemContainerStyle: itemContainerStyleProp,
        ...rest
    }: FlatGridProps,
    ref: any,
) => {
    const { FlatList } = useMolecules();
    const componentStyles = useComponentStyles('FlatGrid', [
        styleProp,
        {
            contentContainerStyle: contentContainerStyleProp,
            additionalRowStyle: additionalRowStyleProp,
            itemContainerStyle: itemContainerStyleProp,
        },
    ]);

    const { contentContainerStyles, itemContainerStyles, additionalRowStyles, style } =
        useMemo(() => {
            const { contentContainerStyle, additionalRowStyle, itemContainerStyle, ...restStyle } =
                componentStyles;

            return {
                contentContainerStyles: contentContainerStyle,
                additionalRowStyles: additionalRowStyle,
                itemContainerStyles: itemContainerStyle,
                style: restStyle,
            };
        }, [componentStyles]);
    return (
        <SuperFlatGrid
            {...rest}
            customFlatList={FlatList as any}
            style={style}
            contentContainerStyle={contentContainerStyles}
            itemContainerStyle={itemContainerStyles}
            additionalRowStyle={additionalRowStyles}
            ref={ref}
        />
    );
};

export default memo(forwardRef(FlatGrid)) as IFlatGrid;
