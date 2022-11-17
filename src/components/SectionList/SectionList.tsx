import { memo, forwardRef, useMemo, useCallback } from 'react';
import omit from 'lodash.omit';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { useComponentStyles, useMolecules } from '../../hooks';
import { Props, SectionItem, ISectionList, SectionItemType } from './types';

const SectionList = <TItem, TSection>(
    {
        sections,
        renderItem: renderItemProps,
        renderSectionHeader,
        renderSectionFooter,
        style: styleProp,
        contentContainerStyle: contentContainerStyleProp,
        ListHeaderComponentStyle: listHeaderComponentStyleProp,
        ListFooterComponentStyle: listFooterComponentStyleProp,
        ...props
    }: Props<TItem, TSection>,
    ref: any,
) => {
    const { FlatList } = useMolecules();
    const componentStyles = useComponentStyles('SectionList', [
        styleProp,
        {
            contentContainerStyle: contentContainerStyleProp,
            listHeaderComponentStyle: listFooterComponentStyleProp,
            listFooterComponentStyle: listHeaderComponentStyleProp,
        },
    ]);

    const { contentContainerStyles, listFooterComponentStyles, listHeaderComponentStyles, styles } =
        useMemo(() => {
            const {
                contentContainerStyle,
                listHeaderComponentStyle,
                listFooterComponentStyle,
                styleProp: style,
            } = componentStyles;
            return {
                contentContainerStyles: contentContainerStyle,
                listFooterComponentStyles: listFooterComponentStyle,
                listHeaderComponentStyles: listHeaderComponentStyle,
                styles: style,
            };
        }, [componentStyles]);

    const normalizedData = useMemo(() => {
        return sections.reduce((acc: SectionItem<TItem, TSection>[], current: TSection) => {
            return acc.concat([
                {
                    ...(current || {}),
                    _type: 'sectionHeader',
                },
                // TODO - resolve this later
                // @ts-ignore
                ...(current?.data?.map((item: TItem) => ({
                    item: item,
                    section: current,
                    _type: 'row',
                })) || []),
                {
                    ...(current || {}),
                    _type: 'sectionFooter',
                },
            ]);
        }, []);
    }, [sections]);

    const renderItem = useCallback(
        ({ item, index, target, extraData }: ListRenderItemInfo<SectionItem<TItem, TSection>>) => {
            const section = omit(item, '_type') as unknown as TSection; // removing _type property

            switch (item._type) {
                case SectionItemType.Header:
                    return renderSectionHeader?.({
                        section,
                    });

                case SectionItemType.Row:
                    // TODO - resolve this later
                    // @ts-ignore
                    return item?.section?.renderItem
                        ? // @ts-ignore
                          item.section?.renderItem({
                              item: item.item,
                              section,
                              index,
                              target,
                              extraData,
                          })
                        : renderItemProps?.({
                              item: item.item,
                              section,
                              index,
                              target,
                              extraData,
                          });

                case SectionItemType.Footer:
                    return renderSectionFooter?.({
                        section,
                    });

                default:
                    return null;
            }
        },
        [renderSectionHeader, renderItemProps, renderSectionFooter],
    );

    return (
        <FlatList
            style={styles}
            data={normalizedData}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList)) as ISectionList;
