import { SortableDataSourceState } from './types';
import { getSortedRecords } from './utils';

export const presentSortedDataSourceRecords = <T extends {}>({
    isSortable,
    records,
    sort,
}: SortableDataSourceState<T>) => {
    if (!isSortable) return { records };
    return { records: getSortedRecords({ records, sort }) };
};
