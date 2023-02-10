import { FC, forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, useWindowDimensions, ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { ColumnProps } from '../Column';
import Column from '../Column/Column';

export type Props = ViewProps & {
    data: ColumnProps[];
    renderer: FC<{ name: string }>;
};

const keyExtractor = (item: ColumnProps) => item.name;

function Grid({ data, style, renderer }: Props, ref: any) {
    const { View } = useMolecules();
    const { width } = useWindowDimensions();
    const componentStyles = useComponentStyles('Grid', style);

    const { gridStyles, rowStyles } = useMemo(() => {
        const { grid, row, ...otherStyles } = componentStyles;

        return {
            gridStyles: { ...grid, ...otherStyles },
            rowStyles: row,
        };
    }, [componentStyles, width]);

    const MemoizedRenderer = useRef(renderer).current;

    const renderItem = useCallback(
        ({ item }: { item: ColumnProps }) => (
            <Column {...item}>
                <MemoizedRenderer name={item.name} />
            </Column>
        ),
        [renderer],
    );

    return (
        <View ref={ref} style={gridStyles}>
            <FlatList
                columnWrapperStyle={rowStyles}
                keyExtractor={keyExtractor}
                data={data}
                renderItem={renderItem}
                numColumns={12}
            />
        </View>
    );
}

export default memo(forwardRef(Grid));
