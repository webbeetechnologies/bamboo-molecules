import { extractInitialState, initialState } from './initialState';
import { useLoadableActionCreator } from './actionCreator';
import { EDataSourcePhase } from '../createDataSource';

const loadableDatasource = {
    name: 'loadableDatasource',
    actionCreator: useLoadableActionCreator,
    extractInitialState,
    initialState,
    phase: EDataSourcePhase.BEFORE_DATA,
};

export default loadableDatasource;
