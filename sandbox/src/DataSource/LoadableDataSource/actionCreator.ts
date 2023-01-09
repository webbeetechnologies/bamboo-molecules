import {
    ELoadableActions,
    LoadableDataSourceState,
    LoadableDataSourceProps,
    LoadableDataSourceResult,
    OnLoadableAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getLoadingStatus } from './utils';
import { useDataSource } from '../DataSourceContext';

const notLoadable = { isLoadable: false };

export const useLoadableActionCreator = <T extends {}>(
    props: LoadableDataSourceProps,
    dataSource: LoadableDataSourceState<T>,
    dispatch: (action: OnLoadableAction) => void,
    config: { hasReducer: boolean },
) => {
    const { onLoad = null, loading } = props;
    const { isLoadable } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handlePaginate = useCallback(
        (args: OnLoadableAction) => {
            if (!isLoadable) {
                throw new Error('Cannot load when isLoadable is false');
            }

            if (config.hasReducer) {
                dispatch(args);
                return;
            }

            if (!onLoad) {
                throw new Error('onLoad function not provided');
            }

            dispatch({
                type: args.type,
                payload: onLoad(dataSourceRef.current, args),
            });
        },
        [isLoadable, dispatch, onLoad],
    );

    return useMemo(() => {
        return !isLoadable
            ? notLoadable
            : {
                  ...getLoadingStatus({ loading }),
                  fetchRecords: () =>
                      handlePaginate({
                          type: ELoadableActions.FETCH_RECORDS,
                      }),
              };
    }, [isLoadable, loading, handlePaginate]) as LoadableDataSourceResult;
};

export const useLoadableDataSource = (): LoadableDataSourceResult => {
    const { isLoadable, hasStarted, isLoading, hasLoaded, hasErrored, fetchRecords } =
        useDataSource();

    if (!isLoadable) {
        return notLoadable as LoadableDataSourceResult;
    }

    return useMemo(
        () => ({
            isLoadable,
            hasStarted,
            isLoading,
            hasLoaded,
            hasErrored,
            fetchRecords,
        }),
        [isLoadable, hasStarted, isLoading, hasLoaded, hasErrored],
    );
};
