import { PaginationDataSourceState } from './types';
import { getPage } from './utils';

export const presentPaginatedDataSourceRecords = <T extends {}>({
    isPaginated,
    records,
    pagination,
}: PaginationDataSourceState<T>) => {
    if (!isPaginated) return { records };
    return {
        records: getPage({ records, pagination }),
    };
};
