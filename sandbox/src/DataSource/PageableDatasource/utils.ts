type Args<T> = {
    isPaginated?: boolean;
    pagination: Pagination;
    records: T[];
    shouldResolveRecords?: boolean;
};
import chunk from 'lodash/chunk';
import { Pagination, PaginationInfo } from './types';

export const getPages = <T>({ pagination, records }: Args<T>) => {
    const { perPage = 10 } = pagination;
    return chunk(records, perPage);
};

export const getPage = <T>({ pagination, records }: Args<T>) => {
    const { pageNumber = 1 } = pagination;
    return getPages({ pagination, records })[pageNumber - 1];
};

export const getPaginatedValue = <T extends {}>({
    isPaginated,
    pagination,
    records,
    shouldResolveRecords = true,
}: Args<T>) => {
    if (!isPaginated) {
        return { isPaginated: false };
    }

    const page = getPage({ pagination, records });
    const resolvedWithRecords = shouldResolveRecords ? { records: page } : {};
    return {
        ...resolvedWithRecords,
        isPaginated,
        pagination: {
            ...pagination,
            count: page.length || 0,
            totalRecords: records.length,
        } as Pagination & PaginationInfo<T>,
    };
};
