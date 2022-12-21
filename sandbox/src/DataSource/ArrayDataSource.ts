import { createDataSource } from './createDataSource';

import { getDefaultFilterableDataSource } from './FilterableDatasource';
import { getDefaultPageableDataSource } from './PageableDatasource';
import { getDefaultSortableDataSource } from './SortableDatasource';

const { DataSourceProvider, useDataSourceDispatch, useDataSourceHook } = createDataSource(
    'arrayDataSource',
    [
        getDefaultFilterableDataSource(),
        getDefaultSortableDataSource(),
        getDefaultPageableDataSource(),
    ],
);

export {
    DataSourceProvider as ArrayDataSourceProvider,
    useDataSourceDispatch as useArrayDataSourceDispatch,
    useDataSourceHook as useArrayDataSourceHook,
};
