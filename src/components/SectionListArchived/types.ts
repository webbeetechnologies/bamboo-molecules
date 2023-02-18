import type { PropsWithoutRef, ReactElement, RefAttributes } from 'react';
import type { FlatList as GestureHandlerFlatList } from 'react-native-gesture-handler';
import type { FlatListProps, ListRenderItemInfo } from 'react-native';

export type DefaultSectionT = {
    [key: string]: any;
};

export enum SectionItemType {
    Header = 'sectionHeader',
    Row = 'row',
    Footer = 'sectionFooter',
}

// normalized SectionItem
export type SectionItem<ITem, TSection> = {
    item: ITem;
    section?: TSection;
    _type: `${SectionItemType}`;
} & Partial<TSection>;

// RenderItemInfo for the SectionList // section is always included
export type SectionListRenderItemInfo<TItem, TSection> = ListRenderItemInfo<TItem> & {
    section: TSection;
};

// SectionList Props
export type Props<TItem, TSection = DefaultSectionT> = Omit<
    FlatListProps<SectionItem<TItem, TSection>>,
    'data' | 'renderItem' | 'stickyHeaderIndices'
> & {
    sections: TSection[];
    renderItem: (info: SectionListRenderItemInfo<TItem, TSection>) => ReactElement | null;
    renderSectionHeader?: (props: { section: TSection }) => any;
    renderSectionFooter?: (props: { section: TSection }) => any;
    stickySectionHeadersEnabled?: boolean;
};

// To make a correct type inference // TODO - ItemType is always any
export type ISectionList = <ItemType = any, TSectionType = DefaultSectionT>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> &
        RefAttributes<GestureHandlerFlatList<ItemType>>,
) => ReactElement;
