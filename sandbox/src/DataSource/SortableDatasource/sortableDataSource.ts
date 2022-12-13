import { useCallback, useMemo } from 'react';
import omitBy from 'lodash.omitby';

import { createDataSource } from '../createDataSource';
import {
    SortableReducer,
    ESortableActions,
    ESortDirection,
    ColumnSort,
    SortableDataSource,
    OnSortAction,
    ApplySortAction,
    RemoveSortAction,
    ReorderSortAction,
    UpdateSortAction,
} from './types';
import { getSortedRecords, getSortedValue } from './utils';

const sortableReducer: SortableReducer = (dataSource, args) => {
    let { order } = dataSource.sort;
    const { isNestedSort } = dataSource.sort;

    switch (args.type) {
        case ESortableActions.ApplySort:
            const sortItem = {
                column: args.payload.column,
                direction: args.payload.direction ?? ESortDirection.Asc,
            };
            order = !isNestedSort ? [sortItem] : [...order, sortItem];
            break;
        case ESortableActions.RemoveSort:
            order = order.filter(({ column }) => column !== args.payload.column);
            break;
        case ESortableActions.ReorderSort:
            if (args.payload.prevIndex > order.length - 1)
                throw new Error(`Item doesn't exist at position ${args.payload.prevIndex}`);
            order = [...order];
            const oldItem = order.at(args.payload.prevIndex) as ColumnSort;
            order.splice(args.payload.prevIndex, 1);
            order.splice(args.payload.newIndex, 0, oldItem);
            break;
        case ESortableActions.UpdateSort:
            const { index, column = order[index].column, direction = order[index].direction } = args.payload;
            if (index > order.length - 1)
                throw new Error(`Sort doesn't exist at position ${index}`);

            order = [...order];
            order[index] = {
                ...order[index],
                column, direction
            };
            break;
        default:
            return dataSource;
    }

    dataSource = {
        ...dataSource,
        sort: {
            order,
            isNestedSort,
        },
    };

    return dataSource;
};

const notSortable = { isSortable: false };

const useSortableActionCreator = <
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

            if (onSort === null) {
                // @ts-ignore
                dispatch(args);
                return;
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: onSort(dataSource, args),
            });
        },
        [isSortable, dispatch, onSort, dataSource],
    );

    return useMemo(
        () =>
            !isSortable
                ? notSortable
                : {
                      ...getSortedValue({ isSortable, sort, records }),

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

const sortableDataSource = {
    reducer: sortableReducer,
    actionCreator: useSortableActionCreator,
    extractInitialState: (props: any) =>
        omitBy(
            {
                isSortable: props.isSortable ?? false,
                sort: props.sort ?? null,
            },
            value => value === null,
        ),
    defaultResolver: <T extends {}>({ isSortable, records, sort }: SortableDataSource<T>) => {
        if (!isSortable) return records;
        return getSortedRecords({ records, sort });
    },
    initialState: {
        isSortable: true,
        sort: {
            isNestedSort: false,
            order: [],
        },
    },
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    sortableDataSource,
]);

export default sortableDataSource;
export const SortableDataSourceProvider = DataSourceProvider;
export const useSortableDataSource = useDataSourceHook;
export const useSortableDispatch = useDataSourceDispatch;
