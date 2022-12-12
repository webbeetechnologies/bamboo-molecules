import PaginatedDataSource from './PageableDatasource';
import SortableDataSource from './SortableDatasource';
import { createDataSource } from './createDataSource';
export * from './createDataSource';
export * from './PageableDatasource';
export * from './SortableDatasource';

const DataSource = createDataSource([SortableDataSource, PaginatedDataSource]);
export const DataSourceProvider = DataSource.DataSourceProvider;
export const useDataSource = DataSource.useDataSourceHook;
export const useDataSourceDispatch = DataSource.useDataSourceDispatch;
