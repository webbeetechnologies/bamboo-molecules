import { createDataSource } from '../createDataSource';
import { useSortableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const sortableDataSource = {
    actionCreator: useSortableActionCreator,
    extractInitialState,
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    sortableDataSource,
]);

export default sortableDataSource;
export const SortableDataSourceProvider = DataSourceProvider;
export const useSortableDataSource = useDataSourceHook;
export const useSortableDispatch = useDataSourceDispatch;
