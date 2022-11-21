import { forwardRef, memo, PropsWithoutRef, ReactElement, RefAttributes, useMemo } from 'react';
import { SectionList as RNSectionList, SectionListProps } from 'react-native';
import { useComponentStyles } from '../../hooks';

type DefaultSectionT<TItem> = {
    [key: string]: any;
    data?: TItem[];
};

export type Props<
    TItem = any,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
> = SectionListProps<TItem, TSection>;

export type ISectionList = <
    ItemType = any,
    TSectionType extends DefaultSectionT<ItemType> = DefaultSectionT<ItemType>,
>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<RNSectionList<ItemType>>,
) => ReactElement;

const SectionList = <TItem, TSection>(
    {
        style: styleProp,
        indicatorStyle: indicatorStyleProp,
        contentContainerStyle: contentContainerStyleProp,
        ...rest
    }: SectionListProps<TItem, TSection>,
    ref: any,
) => {
    const componentStyles = useComponentStyles('SectionList', [
        styleProp,
        {
            indicatorStyle: indicatorStyleProp,
            contentContainerStyle: contentContainerStyleProp,
        },
    ]);

    const { indicatorStyle, contentContainerStyle, style } = useMemo(() => {
        const {
            indicatorStyle: _indicatorStyle,
            contentContainerStyle: _contentContainerStyle,
            ...restStyle
        } = componentStyles;

        return {
            indicatorStyle: _indicatorStyle,
            contentContainerStyle: _contentContainerStyle,
            style: restStyle,
        };
    }, [componentStyles]);

    return (
        <RNSectionList
            {...rest}
            indicatorStyle={indicatorStyle}
            contentContainerStyle={contentContainerStyle}
            style={style}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList)) as ISectionList;
