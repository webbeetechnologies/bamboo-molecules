import { SortableDataSource } from './types';
import { getSortedRecords } from './utils';

export const presentSortedDataSourceRecords = <T extends {}>({
    isSortable,
    records,
    sort,
}: SortableDataSource<T>) => {
    if (!isSortable) return { records };
    return { records: getSortedRecords({ records, sort }) };
};
