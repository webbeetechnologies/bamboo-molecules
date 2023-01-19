import {
    ApplySortAction,
    ESortableActions,
    OnSortAction,
    RemoveSortAction,
    ReorderSortAction,
    SortableDataSourceState,
    SortableDataSourceProps,
    SortableDataSourceResult,
    UpdateSortAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getSortedValue } from './utils';
import { useDataSource } from '../DataSourceContext';

const notSortable = { isSortable: false };

export const useSortableActionCreator = <T extends {}>(
    props: SortableDataSourceProps,
    dataSource: SortableDataSourceState<T>,
    dispatch: (action: OnSortAction) => void,
    config: { hasReducer: boolean },
) => {
    const { onSort = null } = props;
    const { isSortable, sort } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handleSortAction = useCallback(
        (args: OnSortAction) => {
            if (!isSortable) {
                throw new Error('Cannot paginate when isSortable is false');
            }

            if (config.hasReducer) {
                dispatch(args);
                return;
            }

            if (!onSort) {
                throw new Error('onSort function not provided');
            }

            dataSourceRef.current = onSort(dataSourceRef.current, args);
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...dataSourceRef.current,
                    lastAction: args.type,
                },
            });
        },
        [isSortable, dispatch, onSort, dataSourceRef],
    );

    return useMemo(
        () =>
            !isSortable
                ? notSortable
                : ({
                      ...getSortedValue({ isSortable, sort }),
                      applySort: args => {
                          handleSortAction({
                              type: ESortableActions.ApplySort,
                              payload: args,
                          });
                      },
                      removeSort: args => {
                          handleSortAction({
                              type: ESortableActions.RemoveSort,
                              payload: args,
                          });
                      },
                      reorderSort: args => {
                          handleSortAction({
                              type: ESortableActions.ReorderSort,
                              payload: args,
                          });
                      },
                      updateSort: args => {
                          handleSortAction({
                              type: ESortableActions.UpdateSort,
                              payload: args,
                          });
                      },
                  } as SortableDataSourceResult),
        [isSortable, sort, handleSortAction],
    );
};

export const useSortableDataSource = (): SortableDataSourceResult => {
    const { isSortable, sort, applySort, removeSort, reorderSort, updateSort } = useDataSource();

    return useMemo(
        () =>
            !isSortable
                ? (notSortable as SortableDataSourceResult)
                : {
                      isSortable,
                      sort,
                      applySort,
                      removeSort,
                      reorderSort,
                      updateSort,
                  },
        [isSortable, sort, applySort, removeSort, reorderSort, updateSort],
    );
};
