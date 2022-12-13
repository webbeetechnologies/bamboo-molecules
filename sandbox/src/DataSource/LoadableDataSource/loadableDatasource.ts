import {useCallback, useMemo, useRef} from 'react';
import omitBy from 'lodash.omitby';

import {createDataSource} from '../createDataSource';
import {
    LoaderReducer,
    OnLoadableAction,
    LoadableDataSource,
    LoadableDataSourceResult, ELoadableActions,
} from './types';
import {getLoadingStatus} from "./utils";

const notLoadable = { isLoadable: false };


const loadableReducer: LoaderReducer = (dataSource, _action) => dataSource;


const usePaginatedActionCreator = <T extends {},
    S extends Omit<LoadableDataSource<T>, 'onLoad'> = Omit<LoadableDataSource<T>,
        'onLoad'>,
    A extends OnLoadableAction = OnLoadableAction,
    P extends LoadableDataSource<T> = LoadableDataSource<T>,
    >(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
): { isLoadable: boolean } | LoadableDataSourceResult<T> => {
    const {onLoad = null,} = props;
    const {isLoadable, loading} = dataSource;


    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handlePaginate = useCallback(
        (args: OnLoadableAction) => {
            if (!isLoadable) {
                throw new Error('Cannot load when isLoadable is false');
            }

            if (onLoad === null) {
                // @ts-ignore
                dispatch(args);
                return;
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: onLoad(dataSourceRef.current, args),
            });
        },
        [isLoadable, dispatch, onLoad],
    );

    return useMemo(() => {
        return !isLoadable
            ? notLoadable
            : {
                ...getLoadingStatus({loading}),
                fetchRecords: () => handlePaginate({type: ELoadableActions.FETCH_RECORDS})
            };
    }, [loading]);
};

const defaultResolver = async <T extends {}>({ isLoadable, records, }: LoadableDataSource<T>) => {
    if (!isLoadable) { return records; }

    console.warn("TODO: Implement custom logic nested filters to resolve filters");
    return records;
}

const loadableDatasource = {
    reducer: loadableReducer,
    actionCreator: usePaginatedActionCreator,
    extractInitialState: <T extends {}>(props: LoadableDataSource<T>) =>
        omitBy(
            {
                isLoadable: props.isLoadable ?? false,
                loading: props.loading ?? null,
            },
            value => value === null,
        ),
    defaultResolver,
    initialState: {
        isLoadable: true,
        loading: { startedAt: null, finishedAt: null, erroredAt: null },
    },
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    loadableDatasource,
]);

export default loadableDatasource;
export const LoadableDataSourceProvider = DataSourceProvider;
export const loadableDataSource = useDataSourceHook;
export const useLoadableDispatch = useDataSourceDispatch;
