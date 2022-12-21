import { DataSourceInternalState } from './types';

type MaybePromise<T> = T | Promise<T>;

export type DataSourcePresenterType = <T extends {}>(
    state: any,
    func?: DataSourcePresenterType,
) => MaybePromise<
    {
        records: T[];
    } & Partial<DataSourceInternalState<T>>
>;

export const combinePresenters =
    (presenters: DataSourcePresenterType[]): DataSourcePresenterType =>
    async dataSource => {
        let ds = { records: dataSource.records };

        for (const presenter of presenters) {
            ds = {
                ...ds,
                ...(await presenter({
                    ...dataSource,
                    ...ds,
                })),
            };
        }
        return ds;
    };
