type Args<T> = { isPaginated?: boolean; pagination: Pagination; records: T[] };
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

export const getPaginatedValue = <T extends {}>({ isPaginated, pagination, records }: Args<T>) => {
    if (!isPaginated) {
        return { isPaginated: false };
    }

    const page = getPage({ pagination, records });
    return {
        isPaginated,
        pagination: {
            ...pagination,
            count: page.length || 0,
            totalRecords: records.length,
        } as Pagination & PaginationInfo<T>,
    };
};
