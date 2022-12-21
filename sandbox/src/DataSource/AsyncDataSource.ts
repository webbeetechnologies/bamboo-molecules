import { createDataSource } from './createDataSource';

import filterableDatasource from './FilterableDatasource';
import pageableDatasource from './PageableDatasource';
import sortableDataSource from './SortableDatasource';
import { getDefaultLoadableDataSource } from './LoadableDataSource';

const { DataSourceProvider, useDataSourceDispatch, useDataSourceHook } = createDataSource(
    'asyncDataSource',
    [getDefaultLoadableDataSource(), filterableDatasource, sortableDataSource, pageableDatasource],
);

export {
    DataSourceProvider as AsyncDataSourceProvider,
    useDataSourceDispatch as useAsyncDataSourceDispatch,
    useDataSourceHook as useAsyncDataSourceHook,
};
