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

    const handleFetchData = useCallback(
        (args: OnLoadableAction) => {
            if (!isLoadable) {
                throw new Error('Cannot load when isLoadable is false');
            }

            if (!onLoad) {
                throw new Error('onLoad function not provided');
            }

            const loadingResult = onLoad(dataSourceRef.current, args);

            const { isLoadable: _isLoadable, ...loadedResult } = getLoadingStatus({
                loading: loadingResult,
            });

            if (
                loadedResult.hasStarted === dataSourceRef.current.hasStarted &&
                loadedResult.isLoading === dataSourceRef.current.isLoading &&
                loadedResult.hasLoaded === dataSourceRef.current.hasLoaded &&
                loadedResult.hasErrored === dataSourceRef.current.hasErrored
            ) {
                return;
            }

            dataSourceRef.current = {
                ...dataSourceRef.current,
                ...loadedResult,
            };

            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...loadedResult,
                    lastAction: args.type,
                },
            });
        },
        [config.hasReducer, isLoadable, dispatch, onLoad],
    );

    return useMemo(() => {
        return !isLoadable
            ? notLoadable
            : {
                  ...getLoadingStatus({ loading }),
                  fetchRecords: () =>
                      handleFetchData({
                          type: ELoadableActions.FETCH_RECORDS,
                      }),
              };
    }, [isLoadable, loading, handleFetchData]) as LoadableDataSourceResult;
};

export const useLoadableDataSource = <T>(): LoadableDataSourceResult<T> => {
    const { isLoadable, hasStarted, isLoading, hasLoaded, hasErrored, fetchRecords, records } =
        useDataSource();

    return useMemo(
        () =>
            (!isLoadable
                ? notLoadable
                : {
                      isLoadable,
                      hasStarted,
                      isLoading,
                      hasLoaded,
                      hasErrored,
                      fetchRecords,
                      records,
                  }) as LoadableDataSourceResult<T>,
        [isLoadable, hasStarted, isLoading, hasLoaded, hasErrored, fetchRecords, records],
    );
};
