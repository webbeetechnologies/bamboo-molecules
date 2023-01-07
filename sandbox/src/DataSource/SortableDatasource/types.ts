import { DataSourceActions, EDataSourceActions } from '../createDataSource';
import { DataSourceInternalState, DataSourceType } from '../types';

// Sort methods.
export enum ESortableActions {
    ApplySort = 'APPLY_SORT',
    ReorderSort = 'REORDER_SORT',
    RemoveSort = 'REMOVE_SORT',
    UpdateSort = 'UPDATE_SORT',
}

// Sort Direction enums.
export enum ESortDirection {
    Asc,
    Desc,
}

// Sort type
export interface ColumnSort {
    column: string;
    direction: ESortDirection;
}

type OnSort = <T extends {}>(
    dataSource: SortableDataSource<T> & DataSourceType<T>,
    args: OnSortAction,
) => ColumnSort[];

export type Sort = {
    isNestedSort?: boolean;
    order: ColumnSort[];
};

export interface SortableDataSourceProps {
    isSortable: boolean;
    sort: Sort;
    onSort?: OnSort;
}

export interface SortableDataSource<T extends {}>
    extends DataSourceInternalState<T>,
        Omit<SortableDataSourceProps, 'onSort'> {}

export interface SortableDataSourceResult<T extends {}> {
    isSortable: boolean;
    sort?: Sort;
    applySort: (args: ApplySortAction['payload']) => void;
    removeSort: (args: RemoveSortAction['payload']) => void;
    reorderSort: (args: ReorderSortAction['payload']) => void;
    updateSort: (args: UpdateSortAction['payload']) => void;
}

// Sort Actions interfaces
export interface SortAction {
    type: `${EDataSourceActions}`;
    payload: unknown;
}

export interface ApplySortAction {
    type: ESortableActions.ApplySort;
    payload: { column: string; direction?: ESortDirection };
}

export interface ReorderSortAction {
    type: ESortableActions.ReorderSort;
    payload: { prevIndex: number; newIndex: number };
}

export interface RemoveSortAction {
    type: ESortableActions.RemoveSort;
    payload: { column: string };
}

export interface UpdateSortAction {
    type: ESortableActions.UpdateSort;
    payload: Partial<ColumnSort> & { index: number };
}

export type OnSortAction =
    | SortAction
    | ApplySortAction
    | ReorderSortAction
    | RemoveSortAction
    | UpdateSortAction
    | DataSourceActions;

export type SortableReducer = <T extends {}>(
    dataSource: SortableDataSource<T> & DataSourceInternalState<T>,
    args: OnSortAction,
) => SortableDataSource<T>;
