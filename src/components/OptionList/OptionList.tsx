import { memo, PropsWithoutRef, ReactElement, RefAttributes, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import type { FlashList } from '@shopify/flash-list';
import { useComponentStyles, useMolecules, useSearchable, UseSearchableProps } from '../../hooks';
import type { DefaultSectionT } from '../SectionList/types';
import type { SectionListProps } from '../SectionList';

// To make a correct type inference
export type IOptionList = <ItemType = any, TSectionType = DefaultSectionT>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<FlashList<ItemType>>,
) => ReactElement;

export type Props<TItem, TSection> = UseSearchableProps &
    Omit<SectionListProps<TItem, TSection>, 'sections'> & {
        records: TSection[];
        containerStyle?: ViewStyle;
        searchInputContainerStyle?: ViewStyle;
    };

const OptionList = <TItem, TSection>({
    query = '',
    onQueryChange,
    searchInputProps,
    searchable,
    containerStyle = {},
    searchInputContainerStyle = {},
    style: styleProp,
    records,
    ...rest
}: Props<TItem, TSection>) => {
    const { SectionList, View } = useMolecules();
    const SearchField = useSearchable({ query, onQueryChange, searchable, searchInputProps });

    const componentStyles = useComponentStyles('OptionList', [
        { container: containerStyle, searchInputContainer: searchInputContainerStyle },
    ]);

    const { containerStyles, searchInputContainerStyles, style } = useMemo(() => {
        const { container, searchInputContainer, ...restStyle } = componentStyles;

        return {
            containerStyles: container,
            searchInputContainerStyles: searchInputContainer,
            style: [restStyle, styleProp],
        };
    }, [componentStyles, styleProp]);

    return (
        <View style={containerStyles}>
            <>{SearchField && <View style={searchInputContainerStyles}>{SearchField}</View>}</>
            <SectionList {...rest} sections={records} style={style} />
        </View>
    );
};

export default memo(OptionList) as IOptionList;
