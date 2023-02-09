import {
    EFilterActions,
    FilterableDataSourceState,
    FilterableDataSourceProps,
    FilterableDataSourceResult,
    OnFilterAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';
import { useDataSource } from '../DataSourceContext';

const notFilterable = { isFilterable: false };

export const useFilterableActionCreator = <T extends {}>(
    props: FilterableDataSourceProps,
    dataSource: FilterableDataSourceState<T>,
    dispatch: (action: OnFilterAction) => void,
    config: { hasReducer: boolean },
): FilterableDataSourceResult => {
    const { onFilter = null } = props;
    const { isFilterable, filters, records } = dataSource;

    const dataSourceRef = useRef(dataSource);
    dataSourceRef.current = dataSource;

    const handleFilter = useCallback(
        (args: OnFilterAction) => {
            if (!isFilterable) {
                throw new Error('Cannot filter when isFilterable is false');
            }

            if (config.hasReducer) {
                dispatch(args);
                return;
            }

            if (!onFilter) {
                throw new Error('onFilter function not provided');
            }

            const ds = onFilter({ ...dataSourceRef.current, records }, args);

            if (ds === dataSourceRef.current) {
                return;
            }

            dataSourceRef.current = {
                ...dataSourceRef.current,
                ...ds,
            };

            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...ds,
                    lastAction: args.type,
                },
            });
        },
        [config.hasReducer, isFilterable, dispatch, onFilter, records],
    );

    return useMemo(
        () =>
            ({
                isFilterable,
                filters,
                notFilterable,
                applyFilter: payload => {
                    handleFilter({ type: EFilterActions.APPLY_FILTER, payload });
                },
                removeFilter: payload => {
                    handleFilter({ type: EFilterActions.REMOVE_FILTER, payload });
                },
                updateFilter: payload => {
                    handleFilter({ type: EFilterActions.UPDATE_FILTER, payload });
                },
                moveFilter: payload => {
                    handleFilter({ type: EFilterActions.MOVE_FILTER, payload });
                },
                addFilterGroup: payload => {
                    handleFilter({ type: EFilterActions.ADD_GROUP, payload });
                },
                updateFilterGroup: payload => {
                    handleFilter({ type: EFilterActions.UPDATE_GROUP, payload });
                },
            } as FilterableDataSourceResult),
        [isFilterable, filters, handleFilter],
    );
};

type UseFilterableDataSourceResult<T> = FilterableDataSourceResult & Record<'records', T[]>;

export const useFilterableDataSource = <T>(): UseFilterableDataSourceResult<T> => {
    const {
        isFilterable,
        filters,
        applyFilter,
        removeFilter,
        updateFilter,
        moveFilter,
        addFilterGroup,
        updateFilterGroup,
        records,
    } = useDataSource();

    return useMemo(
        () =>
            !isFilterable
                ? ({ isFilterable, records } as UseFilterableDataSourceResult<T>)
                : {
                      records,
                      isFilterable,
                      filters,
                      applyFilter,
                      removeFilter,
                      updateFilter,
                      moveFilter,
                      addFilterGroup,
                      updateFilterGroup,
                  },
        [
            records,
            isFilterable,
            filters,
            applyFilter,
            removeFilter,
            updateFilter,
            moveFilter,
            addFilterGroup,
            updateFilterGroup,
        ],
    );
};
