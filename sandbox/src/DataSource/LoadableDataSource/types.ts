import { DataSourceActions, EDataSourceActions } from '../createDataSource';
import { DataSourceInternalState, DataSourceType } from '../types';

// Paginate methods.
export enum ELoadableActions {
    FETCH_RECORDS = 'FETCH_RECORDS',
}

export type Loading = {
    startedAt: null | number;
    finishedAt: null | number;
    erroredAt: null | number;
};

// Define type of arguments for GoToMethods
export type ApplyFilterAction = {
    type: ELoadableActions.FETCH_RECORDS;
};

export type OnLoadableAction = ApplyFilterAction;

export type OnLoad = <T extends {}>(
    dataSource: Omit<LoadableDataSource<T>, 'onLoad'> & DataSourceType<T>,
    args: OnLoadableAction,
) => Loading;

export interface LoadableDataSource<T extends {}> extends DataSourceInternalState<T> {
    isLoadable: boolean;
    loading: Loading;
    onLoad: OnLoad;
}

export interface LoadableDataSourceResult<T extends {}> {
    isLoadable: boolean;
    isLoading: boolean;
    hasLoaded: boolean;
    hasErrored: boolean;
    hasStarted: boolean;
}

export type LoaderReducer = <T extends {}>(
    dataSource: LoadableDataSource<T> & DataSourceInternalState<T>,
    args: OnLoadableAction,
) => LoadableDataSource<T> & DataSourceInternalState<T>;
