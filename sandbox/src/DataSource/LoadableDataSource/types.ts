import { DataSourceInternalState } from '../types';

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
    payload?: Loading;
};

export type OnLoadableAction = ApplyFilterAction;

export type OnLoad = <T extends {}>(
    dataSource: Omit<LoadableDataSourceState<T>, 'onLoad'>,
    args: OnLoadableAction,
) => Loading;

export interface LoadableDataSourceProps {
    isLoadable: boolean;
    loading: Loading;
    onLoad: OnLoad;
}

export interface LoadableDataSourceState<T extends {}>
    extends DataSourceInternalState<T>,
        Pick<HasLoading, 'isLoading' | 'hasLoaded' | 'hasStarted' | 'hasErrored' | 'isLoadable'> {}

type HasLoading = {
    isLoadable: true;
    isLoading: boolean;
    hasLoaded: boolean;
    hasErrored: boolean;
    hasStarted: boolean;
    fetchRecords: () => void;
};

type NotLoadable = Partial<HasLoading> & {
    isLoadable: false;
};

export type LoadableDataSourceResult = HasLoading | NotLoadable;

export type LoaderReducer = <T extends {}>(
    dataSource: LoadableDataSourceState<T> & DataSourceInternalState<T>,
    args: OnLoadableAction,
) => LoadableDataSourceState<T> & DataSourceInternalState<T>;
