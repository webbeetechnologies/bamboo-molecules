import { FC, forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, FlatListProps, useWindowDimensions } from 'react-native';
import { useComponentStyles, useTheme } from '../../hooks';
import type { ColumnProps } from './Column';
import Column from './Column/Column';
import type { Breakpoints } from './types';

type IColumnProps = Omit<ColumnProps, 'referenceBreakpoints' | 'numberOfColumns'>;

export type Props = FlatListProps<IColumnProps> & {
    renderer: FC<{ name: string }>;
    referenceBreakpoints?: Partial<Breakpoints>;
    numberOfColumns?: number;
};

const keyExtractor = (item: IColumnProps) => item.name;

const Grid = (
    { data, style, renderer, referenceBreakpoints, numberOfColumns }: Props,
    ref: any,
) => {
    const { width } = useWindowDimensions();
    const componentStyles = useComponentStyles('Grid', style);

    const theme = useTheme();

    const { gridStyles } = useMemo(() => {
        const { grid, ...otherStyles } = componentStyles;

        return {
            gridStyles: { ...grid, ...otherStyles },
        };
    }, [componentStyles, width]);

    const MemoizedRenderer = useRef(renderer).current;

    const { _breakpoints, _numberOfColumns } = useMemo(() => {
        const { breakpoints, numberOfColumns: defaultNumberOfColumns } = theme.grid;

        return {
            _breakpoints: referenceBreakpoints ?? breakpoints,
            _numberOfColumns: defaultNumberOfColumns ?? numberOfColumns,
        };
    }, [theme.grid, referenceBreakpoints]);

    const renderItem = useCallback(
        ({ item }: { item: IColumnProps }) => (
            <Column
                {...item}
                referenceBreakpoints={_breakpoints}
                numberOfColumns={_numberOfColumns}>
                <MemoizedRenderer name={item.name} />
            </Column>
        ),
        [],
    );

    return (
        <FlatList
            columnWrapperStyle={gridStyles}
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
            numColumns={_numberOfColumns}
            ref={ref}
        />
    );
};

export default memo(forwardRef(Grid));
