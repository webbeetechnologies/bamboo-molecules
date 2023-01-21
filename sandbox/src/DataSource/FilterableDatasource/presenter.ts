import { FilterableDataSourceState, SingleFilter } from './types';

export const presentRecordsWithNestedFilters = <T extends {}>({
    records,
}: Pick<FilterableDataSourceState<T>, 'records' | 'filters'>) => {
    console.warn('TODO: Implement custom logic nested filters to resolve nested filters');

    return {
        records,
        totalRecordsCount: records.length,
    };
};

export const presentRecordsWithFilters = <T extends {}>({
    records,
    filters,
}: Pick<FilterableDataSourceState<T>, 'records' | 'filters'>) => {
    const filteredRecords = (filters as SingleFilter[]).reduce(
        (r: T[], { columnName, value }: SingleFilter) => {
            return records.filter((x: any) => x[columnName].includes(value));
        },
        records as T[],
    );

    if (filteredRecords.length === records.length)
        return {
            records,
            totalRecordsCount: records.length,
        };

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
