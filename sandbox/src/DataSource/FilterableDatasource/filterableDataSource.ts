import {useCallback, useMemo, useRef} from 'react';
import omitBy from 'lodash.omitby';

import {createDataSource} from '../createDataSource';
import {
    ApplyFilterAction,
    EFilterActions, EFilterOperators,
    FilterableDataSource,
    FilterReducer, GroupedFilter,
    MoveFilterAction,
    OnFilterAction,
    RemoveFilterAction,
    SingleFilter,
    UpdateFilterAction,
} from './types';
import {getOrFail, modify} from "../../utils/objects";
import {move} from "./utils";

const nestedFiltersReducer: FilterReducer = (dataSource, action) => {
    let filters = dataSource.filters;

    const position = action.payload.position as string;
    const path = position.split(".");
    const atIndex = Number(path.pop());
    const time = Date.now();

    switch (action.type) {
        case EFilterActions.ADD_GROUP:
            filters = modify(filters, position, (currentGroup: GroupedFilter) => {
                const currentType = currentGroup.type;
                return {
                    ...currentGroup,
                    filters: currentGroup.filters.concat({
                        type: currentType === EFilterOperators.OR ? EFilterOperators.AND : EFilterOperators.OR,
                        filters: [],
                    })
                };
            });
            break;
        case EFilterActions.UPDATE_GROUP:
            filters = modify(filters, position, (currentGroup: GroupedFilter) => ({
                ...currentGroup,
                type: action.payload.type,
                createdAt: time,
                updatedAt: time,
            }));
            break;
        case EFilterActions.REMOVE_FILTER:
            filters = modify(filters, path.join("."), (currentGroup: GroupedFilter) => {
                return {
                    ...currentGroup,
                    filters: currentGroup.filters.filter((_x, i) => i !== atIndex),
                }
            });
            break;
        case EFilterActions.APPLY_FILTER:
            filters = modify(filters, position, (currentFilter: GroupedFilter) => ({
                ...currentFilter,
                columnName: action.payload.columnName,
                value: action.payload.value,
                updatedAt: time,
            }));
            break;
        case EFilterActions.UPDATE_FILTER:
            filters = modify(filters, position, (currentFilter: GroupedFilter) => ({
                ...currentFilter,
                columnName: action.payload.columnName,
                value: action.payload.value,
                updatedAt: time,
            }));
            break;
        case EFilterActions.MOVE_FILTER: {
            const from = action.payload.from as string;
            const to = action.payload.to as string;

            const fromPath = from.split(".");
            const fromIndex = Number(fromPath.pop());
            const fromPathString = fromPath.join(".");

            const toPath = to.split(".");
            const toIndex = Number(toPath.pop());
            const toPathString = toPath.join(".");

            const fromArray = getOrFail(filters, fromPathString);
            const toArray = getOrFail(filters, toPathString);
            const isSameObject = fromArray === toArray;
            const {fromArray: fResult, toArray: tResult} = move({
                fromArray,
                toArray: isSameObject ? undefined : fromArray,
                from: fromIndex,
                to: toIndex,
            });
            filters = modify(filters, fromPathString, fResult);
            filters = modify(filters, toPathString, tResult ?? fResult);
            break;
        }
        default:
            return dataSource;
    }

    return {
        ...dataSource,
        filters
    };
}


const filteredReducer: FilterReducer = (dataSource, action: OnFilterAction) => {
    if (dataSource.filterConfig?.hasNestedFilter) {
        return nestedFiltersReducer(dataSource, action)
    }

    const time = Date.now();
    let filters = dataSource.filters as SingleFilter[];
    switch (action.type) {
        case EFilterActions.APPLY_FILTER:
            filters = filters.concat({
                columnName: action.payload.columnName,
                value: action.payload.value,
                createdAt: time,
                updatedAt: time,
            });
            break;
        case EFilterActions.REMOVE_FILTER: {
            const position = (action.payload.position as number)
            filters = filters.filter((_x, index) => index !== position);
            break;
        }
        case EFilterActions.UPDATE_FILTER:
            filters = filters.map((filter, index) => {
                if (index !== (action.payload.position as number)) return filter;
                return {
                    ...filter,
                    columnName: action.payload.columnName,
                    value: action.payload.value,
                    updatedAt: time,
                };
            });
            break;
        case EFilterActions.MOVE_FILTER: {
            const from = (action.payload.from as number)
            const to = (action.payload.to as number)

            const { fromArray } = move({ fromArray: filters as SingleFilter[], from, to })
            filters = fromArray;
            break;
        }
        default:
            return dataSource;
    }

    return {
        ...dataSource,
        filters,
    };
};

const notFilterable = { isFilterable: false };

const usePaginatedActionCreator = <
    T extends {},
    S extends Omit<FilterableDataSource<T>, 'onFilter'> = Omit<
        FilterableDataSource<T>,
        'onFilter'
    >,
    A extends OnFilterAction = OnFilterAction,
    P extends FilterableDataSource<T> = FilterableDataSource<T>,
>(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
) => {
    const { onFilter = null } = props;
    const { isFilterable, records, filters, filterConfig } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handleFilter = useCallback(
        (args: OnFilterAction) => {
            if (!isFilterable) {
                throw new Error('Cannot filter when isFilterable is false');
            }

            if (onFilter === null) {
                // @ts-ignore
                dispatch(args);
                return;
            }

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: onFilter(dataSourceRef.current, args),
            });
        },
        [isFilterable, dispatch, onFilter, records],
    );

    return useMemo(
        () =>
            !isFilterable
                ? notFilterable
                : {
                    filters,
                    applyFilter: (payload: ApplyFilterAction['payload']) => {
                        handleFilter({ type: EFilterActions.APPLY_FILTER, payload });
                    },
                    removeFilter: (payload: RemoveFilterAction['payload']) => {
                        handleFilter({ type: EFilterActions.REMOVE_FILTER, payload });
                    },
                    updateFilter: (payload: UpdateFilterAction['payload']) => {
                        handleFilter({ type: EFilterActions.UPDATE_FILTER, payload });
                    },
                    moveFilter: (payload: MoveFilterAction['payload']) => {
                        handleFilter({ type: EFilterActions.MOVE_FILTER, payload });
                    },
                  },
        [isFilterable, filters, records, filterConfig, handleFilter],
    );
};

const FilterableDataSource = {
    reducer: filteredReducer,
    actionCreator: usePaginatedActionCreator,
    extractInitialState: <T extends {}>(props: FilterableDataSource<T>) =>
        omitBy(
            {
                isFilterable: props.isFilterable ?? false,
                filters: props.filters ?? null,
                filterConfig: props.filterConfig ?? { hasNestedFilter: false }
            },
            value => value === null,
        ),
    defaultResolver: <T extends {}>({ isFilterable, records, filterConfig, filters }: FilterableDataSource<T>) => {
        if (!isFilterable) { return records; }
        if (filterConfig?.hasNestedFilter) {
            // TODO: Apply nested filters.
            console.warn("TODO: Nested Filters");
            return records;
        }

        // TODO: Apply filters.
        console.warn("TODO: Filters");
        return records;
    },
    initialState: {
        isFilterable: true,
        filterConfig: { hasNestedFilter: false },
        filters: [],
    },
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    FilterableDataSource,
]);

export default FilterableDataSource;
export const FilterableDataSourceProvider = DataSourceProvider;
export const useFilterableDataSource = useDataSourceHook;
export const useFilterableDispatch = useDataSourceDispatch;
