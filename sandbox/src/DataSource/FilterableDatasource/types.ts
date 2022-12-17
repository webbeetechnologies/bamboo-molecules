import { DataSourceActions, EDataSourceActions } from '../createDataSource';
import { DataSourceInternalState, DataSourceType } from '../types';

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
    OR= "or",
    AND= "and",
}

export type SingleFilter = Record<string, any>;
export type GroupedFilter = {
    type: `${EFilterOperators}`,
    filters: (GroupedFilter | SingleFilter)[]
};
export type Filters = GroupedFilter | SingleFilter[]



// Define type of arguments for GoToMethods
export type ApplyFilterAction = {
    type: EFilterActions.APPLY_FILTER;
    payload: {
        columnName: string,
        value: string,
        position?: string | number,
    }
};
export type RemoveFilterAction = {
    type: EFilterActions.REMOVE_FILTER;
    payload: {
        position: string | number,
    }
};

export type UpdateFilterAction = {
    type: EFilterActions.UPDATE_FILTER;
    payload: {
        position: string | number,
        columnName: string,
        value: string,
    }
};

export type MoveFilterAction = {
    type: EFilterActions.MOVE_FILTER;
    payload: {
        from: string | number,
        to: string | number,
    }
};

export type UpdateGroupAction = {
    type: EFilterActions.UPDATE_GROUP;
    payload: {
        position: string,
        type: `${EFilterOperators}`
    }
};

export type AddGroupAction = {
    type: EFilterActions.ADD_GROUP;
    payload: {
        position: string,
    }
};

export type OnFilterAction = ApplyFilterAction | RemoveFilterAction | UpdateFilterAction | MoveFilterAction | AddGroupAction | UpdateGroupAction | DataSourceActions;

export type OnFilter = <T extends {}>(
    dataSource: FilterableDataSource<T> & DataSourceType<T>,
    args: OnFilterAction,
) => Filters;

export interface FilterableDataSource<T extends {}> extends DataSourceInternalState<T> {
    isFilterable: boolean;
    filterConfig?: {
        hasNestedFilter: boolean,
    }
    filters: Filters;
    onFilter?: OnFilter;
}

export interface FilterableDataSourceResult<T extends {}> {
    isFilterable: boolean;
    filters: Filters;
    applyFilter: (payload: ApplyFilterAction["payload"]) => void,
    removeFilter: (payload: RemoveFilterAction["payload"]) => void,
    updateFilter: (payload: UpdateFilterAction["payload"]) => void,
    moveFilter: (payload: MoveFilterAction["payload"]) => void,
    addFilterGroup: (payload: AddGroupAction["payload"]) => void,
    updateFilterGroup: (payload: UpdateGroupAction["payload"]) => void,
}

export type FilterReducer = <T extends {}>(
    dataSource: FilterableDataSource<T> & DataSourceInternalState<T>,
    args: OnFilterAction,
) => FilterableDataSource<T> & DataSourceInternalState<T>;