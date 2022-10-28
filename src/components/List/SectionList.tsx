import { memo, forwardRef, useCallback, useMemo } from 'react';
import type { FlashListProps } from '@shopify/flash-list';
import type { StyleProp, TextStyle } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

type newItems = { rowItems: {} | undefined | null; rowIndex: number };

export type Props = FlashListProps<{}> & {
    headerStyles?: StyleProp<TextStyle>;
} & any;

const SectionList = ({ data, renderItem, headerStyles, ...props }: Props, ref: any) => {
    const { FlatList, Text, View } = useMolecules();
    const componentStyles = useComponentStyles('SectionList', headerStyles);

    const styles = useMemo(() => {
        return componentStyles;
    }, [componentStyles]);

    const render = useCallback(
        ({ rowItems, rowIndex }: newItems) => {
            if (typeof rowItems === 'string') {
                // Rendering header
                return <Text style={styles}>{rowItems}</Text>;
            } else {
                // Render item
                return (
                    <View>{renderItem({ item: rowItems, index: rowIndex, target: 'Cell' })}</View>
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [renderItem],
    );

    // const stickyHeaderIndices = data
    //     .map((item: any, index: number) => {
    //         if (typeof item === 'string') {
    //             return index;
    //         } else {
    //             return null;
    //         }
    //     })
    //     .filter((item: any) => item !== null) as number[];

    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => render({ rowItems: item, rowIndex: index })}
            getItemType={item => (typeof item === 'string' ? 'sectionHeader' : 'row')}
            // stickyHeaderIndices={stickyHeaderIndices}
            {...props}
            ref={ref}
        />
    );
};

export default memo(forwardRef(SectionList));
