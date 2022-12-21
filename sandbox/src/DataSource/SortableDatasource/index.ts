import SortableDataSource from './sortableDataSource';
export * from './sortableDataSource';
export * from './types';
export default SortableDataSource;

import { sortableDataSourceReducer } from './reducer';
import { extractInitialState, initialState } from './initialState';
import { presentSortedDataSourceRecords } from './presenter';

export {
    initialState as initialSortableState,
    extractInitialState as extractInitialSortableState,
    sortableDataSourceReducer,
    presentSortedDataSourceRecords,
};

export const getDefaultSortableDataSource = () => ({
    ...SortableDataSource,
    initialState,
    reducer: sortableDataSourceReducer,
    presenter: presentSortedDataSourceRecords,
});

export { isSortAction } from './utils';
