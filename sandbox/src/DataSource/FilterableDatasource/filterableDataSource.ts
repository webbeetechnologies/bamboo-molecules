import { EDataSourcePhase } from '../createDataSource';
import { useFilterableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const filterableDataSource = {
    actionCreator: useFilterableActionCreator,
    extractInitialState,
    phase: EDataSourcePhase.BEFORE_DATA,
};

export default filterableDataSource;
