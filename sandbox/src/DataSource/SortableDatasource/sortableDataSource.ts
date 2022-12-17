import { createDataSource } from '../createDataSource';
import { useSortableActionCreator } from './actionCreator';

const sortableDataSource = {
    actionCreator: useSortableActionCreator,
    extractInitialState: extractInitialState,
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    sortableDataSource,
]);

export default sortableDataSource;
export const SortableDataSourceProvider = DataSourceProvider;
export const useSortableDataSource = useDataSourceHook;
export const useSortableDispatch = useDataSourceDispatch;
