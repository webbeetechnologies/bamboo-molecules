import { ForwardedRef, forwardRef, memo, RefObject, useCallback, useMemo, useRef } from 'react';
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewProps,
} from 'react-native';
import {
    VariableSizeList,
    InfiniteLoader,
    InfiniteLoaderChildrenArg,
} from '@bambooapp/virtualized-list';

import { useComponentStyles, useLatest, useMolecules } from '../../hooks';
import {
    useDataTable,
    useDataTableComponent,
    useDataTableStoreRef,
} from './DataTableContext/DataTableContext';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { DataTableHeaderRow } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { defaultProps } from './defaults';
import { HorizontalScrollIndexProvider, defaultValue, useStoreRef } from './hooks';
import type { DataTableBase, DataTableProps, LoadMoreRowsArg, TDataTableRow } from './types';

const defaultGetItemSize = () => 40;

type DataTableComponentProps = DataTableBase &
    ScrollViewProps &
    Pick<
        Partial<DataTableProps>,
        | 'rowCount'
        | 'rowKey'
        | 'rowSize'
        | 'onRowsRendered'
        | 'getRowSize'
        | 'rowsMinimumBatchSize'
        | 'rowsLoadingThreshold'
        | 'loadMoreRows'
        | 'isRowLoaded'
        | 'rowOverscanCount'
    > & {
        flatListRef?: RefObject<any>;
    };
type DataTablePresentationProps = DataTableComponentProps &
    Pick<DataTableProps, 'records'> & { tableWidth: number } & Pick<
        Required<DataTableProps>,
        'FlatListComponent' | 'ScrollViewComponent'
    >;

const DataTablePresentationComponent = memo(
    forwardRef((props: DataTablePresentationProps, ref: ForwardedRef<ScrollView>) => {
        const {
            verticalScrollProps = {},
            horizontalScrollProps = {},
            style: hStyleProp,
            records,
            // tableHeight,
            ScrollViewComponent,
            onLayout: onLayoutProp,
            HeaderRowComponent: HeaderRowComponentProp,
            flatListRef,
            rowsMinimumBatchSize,
            rowCount: rowCountProp,
            rowsLoadingThreshold = 5,
            loadMoreRows,
            onRowsRendered,
            getRowSize,
            rowOverscanCount = 5,
            ...restScrollViewProps
        } = props;

        const { View } = useMolecules();
        const hStyle = useComponentStyles('DataTable', [hStyleProp]);

        const containerHeight = useDataTable(store => store.containerHeight);
        const contentWidth = useDataTable(store => store.contentWidth);
        const isRowLoaded = useDataTable(store => store.isRowLoaded);

        const { set: setStore } = useStoreRef();
        const { set: setDataTableStore } = useDataTableStoreRef();
        const renderedRowsRef = useRef<Omit<LoadMoreRowsArg, 'startIndex' | 'stopIndex'> | null>(
            null,
        );

        const HeaderRowComponent = HeaderRowComponentProp || DataTableHeaderRow;

        const rowCount = rowCountProp || records.length;

        const onScroll = useCallback(
            (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                setStore(prev => ({
                    x: e.nativeEvent.contentOffset.x,
                    scrollXVelocity: e.nativeEvent.contentOffset.x - prev.x,
                }));
            },
            [setStore],
        );

        // const onFlatListScroll = useCallback(
        //     (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        //         setStore(() => ({ y: e.nativeEvent.contentOffset.y }));
        //     },
        //     [setStore],
        // );

        const onLayout = useCallback(
            (e: LayoutChangeEvent) => {
                onLayoutProp?.(e);

                setDataTableStore(() => ({
                    containerWidth: e.nativeEvent.layout.width,
                    containerHeight: e.nativeEvent.layout.height,
                }));
            },
            [onLayoutProp, setDataTableStore],
        );

        const onContentSizeChange = useCallback(
            (w: number) =>
                setDataTableStore(() => ({
                    contentWidth: w,
                })),
            [setDataTableStore],
        );

        const isItemLoaded = useCallback((index: number) => isRowLoaded(index), [isRowLoaded]);

        const loadMoreItems = useCallback(
            async (startIndex: number, stopIndex: number) => {
                loadMoreRows?.({ startIndex, stopIndex, ...renderedRowsRef.current! });
            },
            [loadMoreRows],
        );

        const itemSize = useCallback(
            (index: number) => {
                return getRowSize ? getRowSize(index) : defaultGetItemSize();
            },
            [getRowSize],
        );

        const vProps = useMemo(
            () => ({ ...defaultProps, ...verticalScrollProps }),
            [verticalScrollProps],
        );

        // TODO - Revisit // create separate component to make it cleaner
        const renderList = useCallback(
            ({ onItemsRendered, ref: _ref }: InfiniteLoaderChildrenArg) => {
                const setRef = (listRef: any) => {
                    if (flatListRef) {
                        (flatListRef as any).current = listRef;
                    }
                    _ref(listRef);
                };

                const _onItemsRenderer: DataTableProps['onRowsRendered'] = args => {
                    renderedRowsRef.current = args;
                    onRowsRendered?.(args);
                    onItemsRendered(args);
                };

                return (
                    <VariableSizeList
                        onItemsRendered={_onItemsRenderer}
                        ref={setRef}
                        width={contentWidth || 0}
                        height={containerHeight || 0}
                        itemSize={itemSize}
                        overscanCount={rowOverscanCount}
                        itemCount={rowCount}
                        {...vProps}>
                        {/*@ts-ignore */}
                        {DataTableRow}
                    </VariableSizeList>
                );
            },
            [
                containerHeight,
                contentWidth,
                flatListRef,
                rowCount,
                itemSize,
                onRowsRendered,
                rowOverscanCount,
                vProps,
            ],
        );

        return (
            <ScrollViewComponent
                {...restScrollViewProps}
                {...horizontalScrollProps}
                onLayout={onLayout}
                onContentSizeChange={onContentSizeChange}
                onScroll={onScroll}
                scrollEventThrottle={16}
                horizontal={true}
                ref={ref}
                style={hStyle}>
                <View>
                    <HeaderRowComponent />

                    {!!contentWidth && (
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            threshold={rowsLoadingThreshold}
                            minimumBatchSize={rowsMinimumBatchSize}
                            itemCount={rowCount}
                            loadMoreItems={loadMoreItems}>
                            {renderList}
                        </InfiniteLoader>
                    )}
                </View>
            </ScrollViewComponent>
        );
    }),
);

const DataTableComponent = memo(
    forwardRef((props: DataTableComponentProps, ref: ForwardedRef<ScrollView>) => {
        const { records = [], tableWidth } = useDataTable(store => ({
            records: store.records || [],
            tableWidth: store.tableWidth,
        }));
        const { FlatListComponent, ScrollViewComponent } = useDataTableComponent<TDataTableRow>();

        return (
            <DataTablePresentationComponent
                {...props}
                ref={ref}
                records={records}
                tableWidth={tableWidth}
                // tableHeight={tableHeight}
                FlatListComponent={FlatListComponent}
                ScrollViewComponent={ScrollViewComponent}
            />
        );
    }),
);

const withDataTableContext = (Component: typeof DataTableComponent) =>
    memo(
        forwardRef((props: DataTableProps, ref: ForwardedRef<ScrollView>) => {
            const {
                records,
                columns,
                defaultColumnWidth,
                FlatListComponent,
                ScrollViewComponent,
                renderCell,
                renderHeader,
                headerRowProps,
                headerCellProps,
                cellProps,
                rowProps,
                selectedRows,
                rowSize,
                columnWidths,
                useRowRenderer,
                CellWrapperComponent,
                horizontalOffset,
                getRowId,
                isRowLoaded,
                ...rest
            } = props;

            const latestRecordsRef = useLatest(records);

            const context = {
                records,
                columns,
                defaultColumnWidth,
                FlatListComponent,
                ScrollViewComponent,
                renderCell,
                renderHeader,
                headerRowProps,
                headerCellProps,
                cellProps,
                rowProps,
                selectedRows,
                rowSize: rowSize || 'sm',
                columnWidths,
                useRowRenderer,
                CellWrapperComponent,
                horizontalOffset,
                getRowId: useCallback<Exclude<DataTableProps['getRowId'], undefined>>(
                    index => getRowId?.(index) ?? index,
                    [getRowId],
                ),
                isRowLoaded: useCallback(
                    (index: number) =>
                        !!latestRecordsRef.current[index] || isRowLoaded?.(index) || false,
                    [isRowLoaded, latestRecordsRef],
                ),
            };

            return (
                <DataTableContextProvider {...context}>
                    <HorizontalScrollIndexProvider value={defaultValue}>
                        <Component {...rest} ref={ref} />
                    </HorizontalScrollIndexProvider>
                </DataTableContextProvider>
            );
        }),
    );

export const DataTable = withDataTableContext(DataTableComponent);
