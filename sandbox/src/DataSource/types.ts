type MaybePromise<T> = T | Promise<T>;

export interface DataSourceReturns<T extends {}> {
    records: T[];
}

export interface DataSourceType<T extends {}> extends DataSourceReturns<T> {
    recordsPresenter?: DataSourcePresenterType<T>;
}

export interface DataSourceInternalState<T extends {}> extends DataSourceType<T> {
    totalRecordsCount: number;
    lastAction: string;
}

export type DataSourcePresenterType<
    T extends {},
    DS extends DataSourceInternalState<T> = DataSourceInternalState<T>,
> = (
    state: DS,
    func?: DataSourcePresenterType<T, DS>,
) => MaybePromise<
    {
        records: T[];
    } & Partial<DataSourceInternalState<T>>
>;
