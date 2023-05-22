import type { ForwardedRef } from 'react';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import type { DataTableBase, DataTableProps, TDataTableRow } from './types';
import type { ScrollView } from 'react-native';
import { useComponentStyles } from '../../hooks';
import { useDataTable, useDataTableComponent } from './DataTableContext/DataTableContext';
import { defaultProps } from './defaults';
import { renderRow } from './DataTableRow';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { DataTableHeaderRow } from './DataTableHeader';
import type { ScrollViewProps } from 'react-native';

type DataTableComponentProps = DataTableBase & ScrollViewProps;
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
            FlatListComponent,
            ScrollViewComponent,
            ...restScrollViewProps
        } = props;

        const {
            style: vStyleProp,
            windowSize = defaultProps.windowSize,
            maxToRenderPerBatch = defaultProps.maxToRenderPerBatch,
            keyExtractor: keyExtractorProp = defaultProps.keyExtractor,
            ...vProps
        } = { ...defaultProps, ...verticalScrollProps };

        const hStyle = useComponentStyles('DataTable', [hStyleProp]);
        const vStyle = useMemo(() => [{ width: tableWidth }, vStyleProp], [vStyleProp, tableWidth]);
        const normalizedData = useMemo(() => [{ id: '__header__' }, ...records], [records]);

        const renderItem: typeof renderRow = useCallback(props => {
            return props.index === 0 ? (
                <DataTableHeaderRow key={props.item} />
            ) : (
                renderRow({ ...props, index: props.index - 1 })
            );
        }, []);

        const stickyHeaderIndices = useMemo(
            () =>
                stickyRowIndices
                    ? Array.from(new Set([0, ...stickyRowIndices.map(x => x + 1)]))
                    : [0],
            [stickyRowIndices],
        );

        return (
            <ScrollViewComponent
                {...restScrollViewProps}
                {...horizontalScrollProps}
                horizontal={true}
                ref={ref}
                style={hStyle}>
                <FlatListComponent
                    {...vProps}
                    data={normalizedData}
                    windowSize={windowSize}
                    style={vStyle}
                    maxToRenderPerBatch={maxToRenderPerBatch}
                    keyExtractor={keyExtractorProp}
                    renderItem={renderItem}
                    stickyHeaderIndices={stickyHeaderIndices}
                />
            </ScrollViewComponent>
        );
    }),
);

const DataTableComponent = memo(
    forwardRef((props: DataTableComponentProps, ref: ForwardedRef<ScrollView>) => {
        const { records = [], tableWidth } = useDataTable() || {};
        const { FlatListComponent, ScrollViewComponent } = useDataTableComponent<TDataTableRow>();

        return (
            <DataTablePresentationComponent
                {...props}
                ref={ref}
                records={records}
                tableWidth={tableWidth}
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
            };

            return (
                <DataTableContextProvider {...context}>
                    <Component {...rest} ref={ref} />
                </DataTableContextProvider>
            );
        }),
    );

export const DataTable = withDataTableContext(DataTableComponent);
