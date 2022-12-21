import {
    ELoadableActions,
    LoadableDataSource,
    LoadableDataSourceResult,
    OnLoadableAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getLoadingStatus } from './utils';

const notLoadable = { isLoadable: false };

export const useLoadableActionCreator = <
    T extends {},
    S extends Omit<LoadableDataSource<T>, 'onLoad'> = Omit<LoadableDataSource<T>, 'onLoad'>,
    A extends OnLoadableAction = OnLoadableAction,
    P extends LoadableDataSource<T> = LoadableDataSource<T>,
>(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
    config: { hasReducer: boolean },
): { isLoadable: boolean } | LoadableDataSourceResult<T> => {
    const { onLoad = null } = props;
    const { isLoadable, loading } = dataSource;

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
                  fetchRecords: () => handlePaginate({ type: ELoadableActions.FETCH_RECORDS }),
              };
    }, [isLoadable, loading, handlePaginate]);
};
