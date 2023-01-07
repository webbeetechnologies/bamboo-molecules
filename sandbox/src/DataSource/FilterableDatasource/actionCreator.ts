import {
    EFilterActions,
    FilterableDataSource,
    FilterableDataSourceProps,
    FilterableDataSourceResult,
    OnFilterAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';

const notFilterable = { isFilterable: false } as FilterableDataSourceResult;

export const useFilterableActionCreator = <T extends {}>(
    props: FilterableDataSourceProps,
    dataSource: Omit<FilterableDataSource<T>, 'onFilter'>,
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

            // @ts-ignore
            dispatch({
                type: 'UPDATE_PAYLOAD',
                payload: {
                    ...onFilter({ ...dataSourceRef.current, records }, args),
                    lastAction: args.type,
                },
            });
        },
        [isFilterable, dispatch, onFilter, records],
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
