import { memo, PropsWithoutRef, ReactElement, RefAttributes, useMemo } from 'react';
import type { FlashList } from '@shopify/flash-list';
import { useComponentStyles, useMolecules, useSearchable, UseSearchableProps } from '../../hooks';
import type { DefaultSectionT } from '../SectionList/types';
import type { SectionListProps } from '../SectionList';
import type { ViewStyle } from 'react-native';

// To make a correct type inference
export type IOptionList = <ItemType = any, TSectionType = DefaultSectionT>(
    props: PropsWithoutRef<Props<ItemType, TSectionType>> & RefAttributes<FlashList<ItemType>>,
) => ReactElement;

export type Props<TItem, TSection> = UseSearchableProps &
    SectionListProps<TItem, TSection> & {
        containerStyle?: ViewStyle;
        searchInputContainerStyle?: ViewStyle;
    };

const OptionList = <TItem, TSection>({
    query,
    onQueryChange,
    searchInputProps,
    searchable,
    containerStyle = {},
    searchInputContainerStyle = {},
    style: styleProp,
    ...rest
}: Props<TItem, TSection>) => {
    const { SectionList, View, Text } = useMolecules();
    const SearchField = useSearchable({ query, onQueryChange, searchable, searchInputProps });

    const componentStyles = useComponentStyles('OptionList', [
        { container: containerStyle, searchInputContainer: searchInputContainerStyle },
    ]);

    const { containerStyles, searchInputContainerStyles, emptyTextStyles, style } = useMemo(() => {
        const { container, searchInputContainer, emptyText, ...restStyle } = componentStyles;

        return {
            containerStyles: container,
            searchInputContainerStyles: searchInputContainer,
            emptyTextStyles: emptyText,
            style: [restStyle, styleProp],
        };
    }, [componentStyles, styleProp]);

    return (
        <View style={containerStyles}>
            <View style={searchInputContainerStyles}>{SearchField}</View>
            <SectionList
                ListEmptyComponent={<Text style={emptyTextStyles}>No options to display</Text>}
                {...rest}
                style={style}
            />
        </View>
    );
};

export default memo(OptionList) as IOptionList;
