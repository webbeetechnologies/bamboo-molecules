import { DataSourceActions } from '../createDataSource';

import { DataSourceInternalState } from '../types';
// Paginate methods.
export enum EFilterActions {
    APPLY_FILTER = 'APPLY_FILTER',
    REMOVE_FILTER = 'REMOVE_FILTER',
    MOVE_FILTER = 'MOVE_FILTER',
    UPDATE_FILTER = 'UPDATE_FILTER',
    ADD_GROUP = 'ADD_GROUP',
    UPDATE_GROUP = 'UPDATE_GROUP',
}

export enum EFilterOperators {
    OR = 'or',
    AND = 'and',
}

export type SingleFilter = {
    columnName: string;
    value: any;
    createdAt?: number;
    updatedAt?: number;
};
export type GroupedFilter = {
    type: `${EFilterOperators}`;
    filters: (GroupedFilter | SingleFilter)[];
};
export type Filters = GroupedFilter | SingleFilter[];

// Define type of arguments for GoToMethods
export type ApplyFilterAction = {
    type: EFilterActions.APPLY_FILTER;
    payload: {
        columnName: string;
        value: string;
        position?: string | number;
    };
};
export type RemoveFilterAction = {
    type: EFilterActions.REMOVE_FILTER;
    payload: {
        position: string | number;
    };
};

export type UpdateFilterAction = {
    type: EFilterActions.UPDATE_FILTER;
    payload: {
        position: string | number;
        columnName?: string;
        value?: string;
    };
};

export type MoveFilterAction = {
    type: EFilterActions.MOVE_FILTER;
    payload: {
        from: string | number;
        to: string | number;
    };
};

export type UpdateGroupAction = {
    type: EFilterActions.UPDATE_GROUP;
    payload: {
        position: string;
        type: `${EFilterOperators}`;
    };
};

export type AddGroupAction = {
    type: EFilterActions.ADD_GROUP;
    payload: {
        position: string;
    };
};

export type OnFilterAction =
    | ApplyFilterAction
    | RemoveFilterAction
    | UpdateFilterAction
    | MoveFilterAction
    | AddGroupAction
    | UpdateGroupAction
    | DataSourceActions;

export type FilterReducer = <T extends {}>(
    dataSource: FilterableDataSourceState<T>,
    args: OnFilterAction,
) => FilterableDataSourceState<T>;

export interface FilterableDataSourceProps {
    isFilterable: boolean;
    filterConfig?: {
        hasNestedFilter: boolean;
    };
    filters: Filters;
    onFilter?: FilterReducer;
}

export interface FilterableDataSourceState<T extends {}>
    extends DataSourceInternalState<T>,
        Omit<FilterableDataSourceProps, 'onFilter'> {}

type HasFilters = {
    isFilterable: true;
    filters: Filters;
    applyFilter: (payload: ApplyFilterAction['payload']) => void;
    removeFilter: (payload: RemoveFilterAction['payload']) => void;
    updateFilter: (payload: UpdateFilterAction['payload']) => void;
    moveFilter: (payload: MoveFilterAction['payload']) => void;
    addFilterGroup: (payload: AddGroupAction['payload']) => void;
    updateFilterGroup: (payload: UpdateGroupAction['payload']) => void;
};

type NoFilters = Partial<HasFilters> & {
    isFilterable: false;
};

export type FilterableDataSourceResult = NoFilters | HasFilters;
