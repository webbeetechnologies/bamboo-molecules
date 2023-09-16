import { ForwardedRef, forwardRef, memo, RefObject, useCallback, useMemo } from 'react';
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewProps,
} from 'react-native';
import type { DataTableBase, DataTableProps, TDataTableRow } from './types';

import { useComponentStyles } from '../../hooks';
import {
    useDataTable,
    useDataTableComponent,
    useDataTableStoreRef,
} from './DataTableContext/DataTableContext';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { DataTableHeaderRow } from './DataTableHeader';
import { renderRow } from './DataTableRow';
import { defaultProps } from './defaults';
import {
    HorizontalScrollIndexProvider,
    defaultValue,
    useStoreRef,
    useViewabilityConfigCallbackPairs,
} from './hooks';

type DataTableComponentProps = DataTableBase &
    ScrollViewProps & {
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
            stickyRowIndices,
            records,
            tableWidth,
            // tableHeight,
            FlatListComponent,
            ScrollViewComponent,
            onLayout: onLayoutProp,
            HeaderRowComponent: HeaderRowComponentProp,
            flatListRef,
            ...restScrollViewProps
        } = props;

        const {
            style: vStyleProp,
            windowSize = defaultProps.windowSize,
            maxToRenderPerBatch = defaultProps.maxToRenderPerBatch,
            keyExtractor: keyExtractorProp = defaultProps.keyExtractor,
            viewabilityConfigCallbackPairs: viewabilityConfigCallbackPairsProp = [],
            ...vProps
        } = { ...defaultProps, ...verticalScrollProps };

        const hStyle = useComponentStyles('DataTable', [hStyleProp]);
        const vStyle = useMemo(() => [{ width: tableWidth }, vStyleProp], [vStyleProp, tableWidth]);

        const containerWidth = useDataTable(store => store.containerWidth);

        const { store, set: setStore } = useStoreRef();
        const { set: setDataTableStore } = useDataTableStoreRef();

        const HeaderRowComponent = HeaderRowComponentProp || DataTableHeaderRow;

        const stickyHeaderIndices = useMemo(
            () =>
                stickyRowIndices
                    ? Array.from(new Set([0, ...stickyRowIndices.map(x => x + 1)]))
                    : [0],
            [stickyRowIndices],
        );

        const onScroll = useCallback(
            (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                setStore(() => ({
                    x: e.nativeEvent.contentOffset.x,
                    scrollXVelocity: e.nativeEvent.contentOffset.x - store.current.x,
                }));
            },
            [setStore, store],
        );

        const onFlatListScroll = useCallback(
            (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                setStore(() => ({ y: e.nativeEvent.contentOffset.y }));
            },
            [setStore],
        );

        const viewabilityConfigCallbackPairs = useViewabilityConfigCallbackPairs(
            viewabilityConfigCallbackPairsProp,
        );

        const onLayout = useCallback(
            (e: LayoutChangeEvent) => {
                onLayoutProp?.(e);

                setDataTableStore(() => ({
                    containerWidth: e.nativeEvent.layout.width,
                }));
            },
            [onLayoutProp, setDataTableStore],
        );

        return (
            <ScrollViewComponent
                {...restScrollViewProps}
                {...horizontalScrollProps}
                onLayout={onLayout}
                onScroll={onScroll}
                scrollEventThrottle={16}
                horizontal={true}
                ref={ref}
                style={hStyle}>
                {!!containerWidth && (
                    <FlatListComponent
                        ref={flatListRef}
                        {...vProps}
                        data={records}
                        windowSize={windowSize}
                        style={vStyle}
                        ListHeaderComponent={HeaderRowComponent}
                        maxToRenderPerBatch={maxToRenderPerBatch}
                        keyExtractor={keyExtractorProp}
                        renderItem={renderRow}
                        stickyHeaderIndices={stickyHeaderIndices}
                        onScroll={onFlatListScroll}
                        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    />
                )}
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
                ...rest
            } = props;

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
