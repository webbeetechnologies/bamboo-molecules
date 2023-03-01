import type { FC, ForwardedRef } from 'react';
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

const DataTableComponent = memo(
    forwardRef(
        (
            {
                verticalScrollProps = {},
                horizontalScrollProps = {},
                style: hStyleProp,
                stickyRowIndices,
                ...restScrollViewProps
            }: DataTableBase & ScrollViewProps,
            ref: ForwardedRef<ScrollView>,
        ) => {
            const { FlatListComponent, ScrollViewComponent } =
                useDataTableComponent<TDataTableRow>();
            const { records = [], tableWidth } = useDataTable() || {};
            const hStyle = useComponentStyles('DataTable', [hStyleProp]);

            const {
                style: vStyleProp,
                windowSize = defaultProps.windowSize,
                maxToRenderPerBatch = defaultProps.maxToRenderPerBatch,
                keyExtractor: keyExtractorProp = defaultProps.keyExtractor,
                ...vProps
            } = { ...defaultProps, ...verticalScrollProps };

            const vStyle = useMemo(
                () => [vStyleProp, { width: tableWidth }],
                [vStyleProp, tableWidth],
            );
            const normalizedData = useMemo(() => [{ id: '__header__' }, ...records], [records]);

            const renderItem: typeof renderRow = useCallback(props => {
                return props.index === 0 ? (
                    <DataTableHeaderRow key={props.item.id} />
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
        },
    ),
);

const withDataTableContext = (Component: typeof DataTableComponent): FC<DataTableProps> =>
    memo(
        forwardRef((props, ref: ForwardedRef<ScrollView>) => {
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
            };

            return (
                <DataTableContextProvider {...context}>
                    <Component {...rest} ref={ref} />
                </DataTableContextProvider>
            );
        }),
    );

export const DataTable = withDataTableContext(DataTableComponent);
