import { createDataSource, EDataSourcePhase } from '../createDataSource';
import { useFilterableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const filterableDataSource = {
    actionCreator: useFilterableActionCreator,
    extractInitialState,
    phase: EDataSourcePhase.BEFORE_DATA,
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    filterableDataSource,
]);

export default filterableDataSource;
export const FilterableDataSourceProvider = DataSourceProvider;
export const useFilterableDataSource = useDataSourceHook;
export const useFilterableDispatch = useDataSourceDispatch;
