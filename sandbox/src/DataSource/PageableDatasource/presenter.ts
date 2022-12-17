import { PaginationDataSource } from './types';
import { getPage } from './utils';

export const presentPaginatedDataSourceRecords = <T extends {}>({
    isPaginated,
    records,
    pagination,
}: PaginationDataSource<T>) => {
    if (!isPaginated) return records;
    return getPage({ records, pagination });
};
