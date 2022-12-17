import { LoadableDataSource } from './types';

export const loadableDataSourcePresenter = async <T extends {}>({
    isLoadable,
    records,
}: LoadableDataSource<T>) => {
    if (!isLoadable) {
        return records;
    }

    console.warn('TODO: Implement custom logic nested filters to resolve filters');
    return records;
};