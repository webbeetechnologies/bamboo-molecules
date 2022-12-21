import {
    AddGroupAction,
    ApplyFilterAction,
    EFilterActions,
    FilterableDataSource,
    GroupedFilter,
    MoveFilterAction,
    OnFilterAction,
    RemoveFilterAction,
    SingleFilter,
    UpdateFilterAction,
    UpdateGroupAction,
} from './types';
import { useCallback, useMemo, useRef } from 'react';

const notFilterable = { isFilterable: false };

export const useFilterableActionCreator = <
    T extends {},
    S extends Omit<FilterableDataSource<T>, 'onFilter'> = Omit<FilterableDataSource<T>, 'onFilter'>,
    A extends OnFilterAction = OnFilterAction,
    P extends FilterableDataSource<T> = FilterableDataSource<T>,
>(
    props: P,
    dataSource: S,
    dispatch: (action: A) => void,
    config: { hasReducer: boolean },
):
    | { isFilterable: boolean }
    | {
          addFilterGroup: (payload: AddGroupAction['payload']) => void;
          moveFilter: (payload: MoveFilterAction['payload']) => void;
          removeFilter: (payload: RemoveFilterAction['payload']) => void;
          updateFilter: (payload: UpdateFilterAction['payload']) => void;
          filters: GroupedFilter | SingleFilter[];
          updateFilterGroup: (payload: UpdateGroupAction['payload']) => void;
          applyFilter: (payload: ApplyFilterAction['payload']) => void;
      } => {
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
                      addFilterGroup: (payload: AddGroupAction['payload']) => {
                          handleFilter({ type: EFilterActions.ADD_GROUP, payload });
                      },
                      updateFilterGroup: (payload: UpdateGroupAction['payload']) => {
                          handleFilter({ type: EFilterActions.UPDATE_GROUP, payload });
                      },
                  },
        [isFilterable, filters, handleFilter],
    );
};
