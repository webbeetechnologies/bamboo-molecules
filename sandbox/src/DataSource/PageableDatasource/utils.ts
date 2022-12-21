type Args<T> = {
    isPaginated?: boolean;
    pagination: Pagination;
    debug?: boolean;
};
type WithTotalRecordsCount<T> = Args<T> & {
    totalRecordsCount: number;
};

type WithRecords<T> = Args<T> & { records: T[] };

import chunk from 'lodash/chunk';
import { EPageableActions, Pagination, PaginationInfo } from './types';

export const getPages = <T>({ pagination, records }: WithRecords<T>) => {
    const { perPage = 10 } = pagination;
    return chunk(records, perPage);
};

const emptyPage = [] as any[];
export const getPage = <T>({ pagination, records }: WithRecords<T>) => {
    const { pageNumber = 1 } = pagination;
    return getPages({ pagination, records })[pageNumber - 1] ?? (emptyPage as T[]);
};

export const getPaginatedValue = <T extends {}>({
    isPaginated,
    pagination,
    totalRecordsCount: length,
}: WithTotalRecordsCount<T>) => {
    if (!isPaginated) {
        return { isPaginated: false };
    }

    const page = getPage({
        pagination,
        records: Array.from({ length }, () => null),
    });

    return {
        isPaginated,
        pagination: {
            ...pagination,
            count: page.length || 0,
            totalRecords: length,
        } as Pagination & PaginationInfo<T>,
    };
};

export const isPaginationAction = (action: any) => action in EPageableActions;
