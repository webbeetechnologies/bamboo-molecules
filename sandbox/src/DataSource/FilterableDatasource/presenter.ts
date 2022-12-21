import { FilterableDataSource, SingleFilter } from './types';

const presentRecordsWithNestedFilters = <T extends {}>({ records }: FilterableDataSource<T>) => {
    console.warn('TODO: Implement custom logic nested filters to resolve nested filters');

    return {
        records,
        totalRecordsCount: records.length,
    };
};

const presentRecordsWithFilters = <T extends {}>({ records, filters }: FilterableDataSource<T>) => {
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

export const presentFilteredDataSourceRecords = <T extends {}>(ds: FilterableDataSource<T>) => {
    if (!ds.isFilterable) {
        return ds.records;
    }

    if (ds.filterConfig?.hasNestedFilter) {
        return presentRecordsWithNestedFilters(ds);
    }

    // TODO: Apply filters.
    return presentRecordsWithFilters(ds);
};
