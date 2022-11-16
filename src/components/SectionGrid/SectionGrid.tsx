import { memo, ReactElement, PropsWithoutRef, RefAttributes, useMemo, forwardRef } from 'react';
import { SectionGrid as SuperSectionGrid, SectionGridProps } from 'react-native-super-grid';
import type { SectionList as NativeSectionList } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type ISectionGrid = <ItemType = any>(
    props: PropsWithoutRef<SectionGridProps<ItemType>> & RefAttributes<NativeSectionList<ItemType>>,
) => ReactElement;

const SectionGrid = (
    {
        style: styleProp,
        contentContainerStyle: contentContainerStyleProp,
        additionalRowStyle: additionalRowStyleProp,
        itemContainerStyle: itemContainerStyleProp,
        ...rest
    }: SectionGridProps,
    ref: any,
) => {
    const { SectionList } = useMolecules();
    const componentStyles = useComponentStyles('SectionGrid', [
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
        <SuperSectionGrid
            {...rest}
            style={style}
            customSectionList={SectionList as unknown as typeof NativeSectionList}
            contentContainerStyle={contentContainerStyles}
            itemContainerStyle={itemContainerStyles}
            additionalRowStyle={additionalRowStyles}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionGrid)) as ISectionGrid;
