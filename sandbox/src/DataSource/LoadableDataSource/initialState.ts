import { LoadableDataSourceState } from './types';
import omitBy from 'lodash/omitBy';

export const initialState = {
    isLoadable: true,
    loading: { startedAt: null, finishedAt: null, erroredAt: null },
};
export const extractInitialState = <T extends {}>(props: LoadableDataSourceState<T>) =>
    omitBy(
        {
            isLoadable: props.isLoadable ?? false,
            loading: props.loading ?? null,
        },
        value => value === null,
    );
