import { useMemo, useRef } from 'react';
import { useControlledValue } from 'bamboo-molecules';
import {
    Sortable,
    ESortableActions,
    ESortDirection,
    NotSortableReturnProps,
    OnSort,
    OnSortAction,
    Sort,
    SortableDataSource,
    SortableDataSourceProps,
    SortableDataSourcePropsEnabled,
} from './__types';
import zip from 'lodash/zip';
import orderBy from 'lodash/orderBy';

type Args<T> = { isSortable?: boolean; sorting: Sortable['sorting'] };

const defaultOnSort: OnSort = (dataSource, args) => {
    let { sort, isNestedSort, disabled } = dataSource.sorting;

    if (!sort) {
        throw new Error('Sort cannot be undefined');
    }

    switch (args.type) {
        case ESortableActions.ApplySort:
            const sortItem = {
                column: args.payload.column,
                direction: args.payload.direction ?? ESortDirection.Asc,
            };
            sort = !isNestedSort ? [sortItem] : [...sort, sortItem];
            break;
        case ESortableActions.RemoveSort:
            sort = sort.filter(({ column }) => column !== args.payload.column);
            break;
        case ESortableActions.ReorderSort:
            if (args.payload.prevIndex > sort.length - 1)
                throw new Error(`Item doesn't exist at position ${args.payload.prevIndex}`);
            sort = [...sort];
            const oldItem = sort.at(args.payload.prevIndex) as Sort;
            sort.splice(args.payload.prevIndex, 1);
            sort.splice(args.payload.newIndex, 0, oldItem);
            break;
        case ESortableActions.UpdateSort:
            const { index, ...patch } = args.payload;
            if (index > sort.length - 1) throw new Error(`Item doesn't exist at position ${index}`);
            sort = [...sort];
            sort[index] = {
                ...sort[index],
                ...patch,
            };
            break;
    }

    return sort;
};

const getSortableValue = <T extends {}>({ isSortable, sorting }: Args<T>) => {
    if (!isSortable) {
        return { isSortable: false } as NotSortableReturnProps<T>;
    }

    return {
        isSortable,
        sorting,
    };
};

const applySortOnRecords = <T extends {}>(datasource: SortableDataSourcePropsEnabled<T>) => {
    const sort = datasource.sorting.sort;
    let predicate = zip(
        ...sort?.map(({ column, direction }) => [
            column,
            direction === ESortDirection.Desc ? 'desc' : 'asc',
        ]),
    );

    let sorted = orderBy(datasource.records, ...predicate) as T[];

    return sorted;
};

export const useSortableDataSource = <T extends {}>(
    props: SortableDataSourceProps<T>,
): SortableDataSource<T> => {
    const sortableDatasourceProps = props as SortableDataSourcePropsEnabled<T>;
    const {
        records,
        isSortable,
        onSort = defaultOnSort,
        sorting: { isNestedSort, disabled, sort },
        ...rest
    } = sortableDatasourceProps;
    const memoizedKeys = useMemo(() => Object.keys(rest), []);
    const isControlled = useRef(onSort !== defaultOnSort).current;

    const [sortedSource, setSortedSource] = useControlledValue({
        onChange: isControlled ? () => {} : undefined,
        value: !isControlled
            ? undefined
            : useMemo(
                  () => getSortableValue({ isSortable, sorting: { sort, isNestedSort, disabled } }),
                  [isSortable, disabled, sort, isNestedSort],
              ),
        defaultValue: isControlled
            ? undefined
            : useMemo(
                  () => getSortableValue({ isSortable, sorting: { sort, isNestedSort, disabled } }),
                  [isSortable, disabled, sort, isNestedSort],
              ),
    });

    const handleSortAction = (args: OnSortAction) => {
        const { onSort: _, ...rest } = sortableDatasourceProps;
        if (rest.sorting.disabled) {
            return;
        }

        const sorting = {
            sort: onSort(
                {
                    ...rest,
                    ...sortedSource,
                } as SortableDataSourcePropsEnabled<T>,
                args,
                defaultOnSort,
            ),
            isNestedSort: rest.sorting.isNestedSort,
            disabled: rest.sorting.disabled,
        };

        const value = getSortableValue({
            isSortable,
            sorting,
        });

        setSortedSource(value);
    };

    return useMemo(
        () =>
            !sortedSource.isSortable
                ? ({ ...rest, ...sortedSource, records } as NotSortableReturnProps<T>)
                : {
                      ...rest,
                      ...sortedSource,
                      records: applySortOnRecords({
                          ...rest,
                          ...sortedSource,
                          records,
                      }),
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
                  },
        [sortedSource, records].concat(memoizedKeys.map(key => (rest as any)[key])),
    );
};
