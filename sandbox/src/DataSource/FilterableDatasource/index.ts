import FilterableDataSource from './filterableDataSource';
import filterableDataSource from './filterableDataSource';
import { filterableDatasourceReducer } from './reducer';
import { presentFilteredDataSourceRecords } from './presenter';
import { extractInitialState, initialState } from './initialState';

export type { EFilterActions } from './types';
export * from './filterableDataSource';
export default FilterableDataSource;

export { useFilterableActionCreator } from './actionCreator';

export {
    filterableDatasourceReducer,
    presentFilteredDataSourceRecords,
    extractInitialState,
    initialState as initialFilterState,
};

export const getDefaultFilterableDataSource = () => ({
    ...filterableDataSource,
    reducer: filterableDatasourceReducer,
    presenter: presentFilteredDataSourceRecords,
    initialState,
});

export { isFilterAction } from './utils';