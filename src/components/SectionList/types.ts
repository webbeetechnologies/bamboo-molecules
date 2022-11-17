import type { PropsWithoutRef, ReactElement, RefAttributes } from 'react';
import type { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';

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
    FlashListProps<SectionItem<TItem, TSection>>,
    'data' | 'renderItem'
> & {
    sections: TSection[];
    renderItem: (info: SectionListRenderItemInfo<TItem, TSection>) => ReactElement | null;
    renderSectionHeader?: (props: { section: TSection }) => any;
    renderSectionFooter?: (props: { section: TSection }) => any;
};

// To make a correct type inference // TODO - ItemType is always any
export type ISectionList = <ItemType = any, TSectionType = DefaultSectionT>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<FlashList<ItemType>>,
) => ReactElement;
