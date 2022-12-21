import { useSortableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const sortableDataSource = {
    name: 'sortableDataSource',
    actionCreator: useSortableActionCreator,
    extractInitialState,
};

export default sortableDataSource;
