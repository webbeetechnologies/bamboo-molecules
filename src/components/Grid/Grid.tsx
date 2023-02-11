import { FC, forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, FlatListProps, useWindowDimensions } from 'react-native';
import { useComponentStyles } from '../../hooks';
import type { ColumnProps } from './Column';
import Column from './Column/Column';

const defaultBreakpoints = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

const defaultNumberOfColumns = 12;

type IColumnProps = Omit<ColumnProps, 'referenceBreakpoints' | 'numberOfColumns'>;

export type Props = FlatListProps<IColumnProps> & {
    renderer: FC<{ name: string }>;
    referenceBreakpoints?: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    numberOfColumns?: number;
};

const keyExtractor = (item: IColumnProps) => item.name;

const Grid = (
    {
        data,
        style,
        renderer,
        referenceBreakpoints = defaultBreakpoints,
        numberOfColumns = defaultNumberOfColumns,
    }: Props,
    ref: any,
) => {
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
        ({ item }: { item: IColumnProps }) => (
            <Column
                {...item}
                referenceBreakpoints={referenceBreakpoints}
                numberOfColumns={numberOfColumns}>
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
            numColumns={numberOfColumns}
            ref={ref}
        />
    );
};

export default memo(forwardRef(Grid));
