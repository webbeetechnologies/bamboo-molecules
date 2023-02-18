import { memo, forwardRef, useMemo, useCallback } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { omit } from '../../utils';
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
        stickySectionHeadersEnabled,
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
        ({ item, index, separators }: ListRenderItemInfo<SectionItem<TItem, TSection>>) => {
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
                              separators,
                          })
                        : renderItemProps?.({
                              item: item.item,
                              section,
                              index,
                              separators,
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

    // if stickySectionHeaderEnabled we push sectionHeader indices to the stickyHeaderIndices array
    // in both cases we still want to add the array from stickyHeaderIndices prop
    const stickyHeaderIndices = useMemo((): number[] | undefined => {
        return stickySectionHeadersEnabled
            ? normalizedData.reduce(
                  (acc: number[], current, index: number) =>
                      current._type === SectionItemType.Header
                          ? acc.concat([index])
                          : acc.concat([]),
                  [],
              )
            : undefined;
    }, [normalizedData, stickySectionHeadersEnabled]);

    return (
        <FlatList
            style={styles}
            data={normalizedData}
            renderItem={renderItem}
            contentContainerStyle={contentContainerStyles}
            ListHeaderComponentStyle={listHeaderComponentStyles}
            ListFooterComponentStyle={listFooterComponentStyles}
            stickyHeaderIndices={stickyHeaderIndices}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList)) as ISectionList;
