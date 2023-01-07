import {
    ApplySortAction,
    ESortableActions,
    OnSortAction,
    RemoveSortAction,
    ReorderSortAction,
    SortableDataSource,
    SortableDataSourceProps,
    SortableDataSourceResult,
    UpdateSortAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { getSortedValue } from './utils';

const notSortable = { isSortable: false };

export const useSortableActionCreator = <T extends {}>(
    props: SortableDataSourceProps,
    dataSource: SortableDataSource<T>,
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

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...onSort(dataSourceRef.current, args),
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
                  } as SortableDataSourceResult<T>),
        [isSortable, sort, handleSortAction],
    );
};
