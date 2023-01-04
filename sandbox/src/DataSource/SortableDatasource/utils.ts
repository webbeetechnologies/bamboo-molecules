import { ESortableActions, Sort } from './types';
import { ESortDirection } from './types';
import zip from 'lodash/zip';
import orderBy from 'lodash/orderBy';

export const getSortedValue = (arg: { isSortable?: boolean; sort: Sort }) => {
    const { isSortable, sort } = arg;
    return {
        isSortable,
        sort,
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

export const isSortAction = (action: any) => action in ESortableActions;
