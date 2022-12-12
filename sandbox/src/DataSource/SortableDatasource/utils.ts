import { Sort } from './types';
import { ESortDirection } from './types';
import zip from 'lodash.zip';
import orderBy from 'lodash.orderBy';

export const getSortedValue = <T extends {}>(arg: {
    isSortable?: boolean;
    sort: Sort;
    shouldResolveRecords?: boolean;
    records: T[];
}) => {
    const { isSortable, sort, shouldResolveRecords = true, records } = arg;
    return {
        isSortable,
        sort,
        ...(shouldResolveRecords ? { records: getSortedRecords({ sort, records }) } : {}),
    };
};

export const getSortedRecords = <T extends {}>(arg: { sort: Sort; records: T[] }) => {
    const {
        sort: { order: sort },
        records,
    } = arg;
    const predicate = zip(
        ...sort?.map(({ column, direction }) => [
            column,
            direction === ESortDirection.Desc ? 'desc' : 'asc',
        ]),
    );

    return orderBy(records, ...predicate) as T[];
};
