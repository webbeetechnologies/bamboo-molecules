import {
    ApplySortAction,
    ESortableActions,
    OnSortAction,
    RemoveSortAction,
    ReorderSortAction,
    SortableDataSource,
    UpdateSortAction,
} from './types';
import { useCallback, useMemo } from 'react';
import { getSortedValue } from './utils';

const notSortable = { isSortable: false };

export const useSortableActionCreator = <
    T extends {},
    S extends Omit<SortableDataSource<T>, 'onSort'> = Omit<SortableDataSource<T>, 'onSort'>,
    A extends OnSortAction = OnSortAction,
    P extends SortableDataSource<T> = SortableDataSource<T>,
>(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
) => {
    const { onSort = null } = props;
    const { records, isSortable, sort } = dataSource;

    const handleSortAction = useCallback(
        (args: OnSortAction) => {
            if (!isSortable) {
                throw new Error('Cannot paginate when isSortable is false');
            }

            if (!onSort) {
                throw new Error('onSort function not provided');
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...onSort(dataSource, args),
                    lastAction: args.type,
                },
            });
        },
        [isSortable, dispatch, onSort, dataSource],
    );

    return useMemo(
        () =>
            !isSortable
                ? notSortable
                : {
                      ...getSortedValue({ isSortable, sort }),

                      applySort: (args: ApplySortAction['payload']) => {
                          handleSortAction({
                              type: ESortableActions.ApplySort,
                              payload: args,
                          });
                      },
                      removeSort: (args: RemoveSortAction['payload']) => {
                          handleSortAction({
                              type: ESortableActions.RemoveSort,
                              payload: args,
                          });
                      },
                      reorderSort: (args: ReorderSortAction['payload']) => {
                          handleSortAction({
                              type: ESortableActions.ReorderSort,
                              payload: args,
                          });
                      },
                      updateSort: (args: UpdateSortAction['payload']) => {
                          handleSortAction({
                              type: ESortableActions.UpdateSort,
                              payload: args,
                          });
                      },
                  },
        [isSortable, sort, records, handleSortAction],
    );
};
