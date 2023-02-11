import { FC, forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, useWindowDimensions, ViewProps } from 'react-native';
import { useComponentStyles } from '../../hooks';
import type { ColumnProps } from '../Column';
import Column from '../Column/Column';

export type Props = ViewProps & {
    data: ColumnProps[];
    renderer: FC<{ name: string }>;
};

const keyExtractor = (item: ColumnProps) => item.name;

function Grid({ data, style, renderer }: Props, ref: any) {
    const { width } = useWindowDimensions();
    const componentStyles = useComponentStyles('Grid', style);

    const { gridStyles } = useMemo(() => {
        const { grid, ...otherStyles } = componentStyles;

        return {
            gridStyles: { ...grid, ...otherStyles },
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
        <FlatList
            columnWrapperStyle={gridStyles}
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
            numColumns={12}
            ref={ref}
        />
    );
}

export default memo(forwardRef(Grid));
