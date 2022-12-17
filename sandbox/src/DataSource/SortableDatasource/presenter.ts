import { SortableDataSource } from './types';
import { getSortedRecords } from './utils';

export const sortableDataSourcePresenter = <T extends {}>({
    isSortable,
    records,
    sort,
}: SortableDataSource<T>) => {
    if (!isSortable) return records;
    return getSortedRecords({ records, sort });
};
