import { FilterableDataSource } from './types';

export const presentFilteredDataSourceRecords = <T extends {}>({
    isFilterable,
    records,
    filterConfig,
}: FilterableDataSource<T>) => {
    if (!isFilterable) {
        return records;
    }
    if (filterConfig?.hasNestedFilter) {
        // TODO: Apply nested filters.
        console.warn('TODO: Implement custom logic nested filters to resolve nested filters');
        return records;
    }

    // TODO: Apply filters.
    console.warn('TODO: Implement custom logic nested filters to resolve filters');
    return records;
};
