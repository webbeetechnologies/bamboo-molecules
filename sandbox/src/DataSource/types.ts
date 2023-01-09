import { DataSourcePresenterType } from './utils';

export interface DataSourceReturns<T extends {}> {
    records: T[];
}

export interface DataSourceType<T extends {}> extends DataSourceReturns<T> {}

export interface DataSourceInternalState<T extends {}> extends DataSourceType<T> {
    totalRecordsCount: number;
    lastAction: string;
}
