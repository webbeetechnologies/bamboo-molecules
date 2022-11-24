import { DataSourceType } from '../__types';

// Sort type
export interface Sort {
    column: string;
    direction: ESortDirection;
}

// Data Source Supported/ NotSupported
export type NotSortable = { isSortable: false };
export type Sortable = {
    isSortable: true;
    sorting: { disabled?: boolean; isNestedSort?: boolean; sort: Sort[] };
};

// Sort Actions interfaces
interface SortAction {
    type: ESortableActions;
    payload: never;
}

interface ApplySortAction {
    type: ESortableActions.ApplySort;
    payload: { column: string; direction?: ESortDirection };
}

interface ReorderSortAction {
    type: ESortableActions.ReorderSort;
    payload: { prevIndex: number; newIndex: number };
}

interface RemoveSortAction {
    type: ESortableActions.RemoveSort;
    payload: { column: string };
}

interface UpdateSortAction {
    type: ESortableActions.UpdateSort;
    payload: Partial<Sort> & { index: number };
}

export type OnSortAction =
    | SortAction
    | ApplySortAction
    | ReorderSortAction
    | RemoveSortAction
    | UpdateSortAction;

// Add Support for custom sort handler.
export type OnSort = <T extends {}>(
    dataSource: SortableDataSourcePropsWithoutOnSort<T>,
    args: OnSortAction,

    // In case, the developer wants to extend the default behavior.
    OnSort?: OnSort,
) => Sort[];

type SortableDataSourcePropsWithoutOnSort<T extends {}> = Omit<
    SortableDataSourcePropsEnabled<T>,
    keyof DataSourceGetStateReturnOmits
>;

// DataSource InputProps
export interface SortableDataSourcePropsEnabled<T extends {}> extends DataSourceType<T>, Sortable {
    onSort?: OnSort;
}
export type SortableDataSourceProps<T extends {}> =
    | SortableDataSourcePropsEnabled<T>
    | NotSortableReturnProps<T>;

// Return for a sortable dataSource with sorting switched off.
export type NotSortableReturnProps<T> = Required<NotSortable> & DataSourceType<T>;

// Return type for a sortable datasource when sorting is turned on.
export type SortableReturnProps<T extends {}> = SortableDataSourcePropsWithoutOnSort<T> & {
    applySort(args: ApplySortAction['payload']): void;
    reorderSort(args: ReorderSortAction['payload']): void;
    removeSort(args: RemoveSortAction['payload']): void;
    updateSort(args: UpdateSortAction['payload']): void;
};

// Sortable DataSource
export type SortableDataSource<T extends {}> = NotSortableReturnProps<T> | SortableReturnProps<T>;

// Extends Omitted Props
export interface DataSourceGetStateReturnOmits {
    OnSort: true;
}

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
