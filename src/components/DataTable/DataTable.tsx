import type { FC } from 'react';
import { memo, useMemo } from 'react';
import type { DataTableProps, ScrollProps, TDataTableRow } from './types';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { useDataTable, useDataTableComponent } from './DataTableContext/DataTableContext';
import { renderRow } from './DataTableRow';
import { keyExtractor } from './utils';

const DataTableComponent: FC<ScrollProps<TDataTableRow>> = memo(
    ({ verticalScrollProps = {}, horizontalScrollProps = {} }) => {
        const { FlatListComponent, ScrollViewComponent } = useDataTableComponent<TDataTableRow>();
        const { records = [], columns } = useDataTable() || {};

        const {
            style: vStyle,
            windowSize = 3,
            maxToRenderPerBatch = 10,
            snapToInterval = 3,
            keyExtractor: keyExtractorProp = keyExtractor,
            ...vProps
        } = verticalScrollProps;

        const width = columns.length * 200;
        const style = useMemo(() => [vStyle, { width }], [vStyle, width]);

        return (
            <ScrollViewComponent {...horizontalScrollProps} horizontal={true}>
                <FlatListComponent
                    {...vProps}
                    data={records}
                    windowSize={windowSize}
                    style={style}
                    maxToRenderPerBatch={maxToRenderPerBatch}
                    snapToInterval={snapToInterval}
                    keyExtractor={keyExtractorProp}
                    renderItem={renderRow}
                />
            </ScrollViewComponent>
        );
    },
);

const withDataTableContext = (Component: typeof DataTableComponent): FC<DataTableProps> =>
    memo(({ verticalScrollProps, horizontalScrollProps, ...props }) => (
        <DataTableContextProvider {...props}>
            <Component {...{ verticalScrollProps, horizontalScrollProps }} />
        </DataTableContextProvider>
    ));

export const DataTable = withDataTableContext(DataTableComponent);
