import { FilterableDataSourceState, SingleFilter } from './types';

const presentRecordsWithNestedFilters = <T extends {}>({
    records,
}: FilterableDataSourceState<T>) => {
    console.warn('TODO: Implement custom logic nested filters to resolve nested filters');

    return {
        records,
        totalRecordsCount: records.length,
    };
};

const presentRecordsWithFilters = <T extends {}>({
    records,
    filters,
}: FilterableDataSourceState<T>) => {
    const filteredRecords = (filters as SingleFilter[]).reduce(
        (r: T[], { columnName, value }: SingleFilter) => {
            return records.filter((x: any) => x[columnName].includes(value));
        },
        records as T[],
    );

    return {
        records: filteredRecords,
        totalRecordsCount: filteredRecords.length,
    };
};

export const presentFilteredDataSourceRecords = <T extends {}>(
    ds: FilterableDataSourceState<T>,
) => {
    if (!ds.isFilterable) {
        return { records: ds.records };
    }

    if (ds.filterConfig?.hasNestedFilter) {
        return presentRecordsWithNestedFilters(ds);
    }

    // TODO: Apply filters.
    return presentRecordsWithFilters(ds);
};
