import { DataSourcePresenterType, DataSourceReturns } from './types';

type MaybePromise<T> = T | Promise<T>;

export const combinePresenters =
    <T extends {}, DataSourceState extends DataSourceReturns<T>>(
        presenters: DataSourcePresenterType<T, DataSourceState>[],
    ): DataSourcePresenterType<T, Partial<DataSourceState> & Pick<DataSourceState, 'records'>> =>
    async dataSource => {
        let ds = { records: dataSource.records };

        for (const presenter of presenters) {
            ds = {
                ...ds,
                ...(await presenter({
                    ...(dataSource as DataSourceState),
                    ...ds,
                })),
            };
        }
        return ds;
    };
