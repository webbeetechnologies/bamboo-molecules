export interface DataSourceType<T extends {}> {
    records: T[];
}

export interface DataSourceInternalState<T extends {}> extends DataSourceType<T> {
    shouldResolveRecords: boolean;
}
