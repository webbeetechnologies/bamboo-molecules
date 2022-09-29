import { IDataSource } from "./types";
import {createDataSource} from "./DataSource";
import {createSortableDataSource} from "./SortableDataSource";
import {createSearchableDataSource} from "./SearchableDataSource";
import {createAsyncDataSource} from "./AyncDataSource";
import { createPaginatedDataSource } from "./PaginatedDataSource";

export const useDataSource = <T>(props: IDataSource<T>) => {
    let dataSource = createDataSource(props);

    if (dataSource.isPaginated()) {
        dataSource = createPaginatedDataSource<T>(dataSource);
    }

    if (dataSource.isSearchable()) {
        dataSource = createSearchableDataSource<T>(dataSource);
    }

    if (dataSource.isSortable()) {
        dataSource = createSortableDataSource<T>(dataSource);
    }

    if (dataSource.isLoadable()) {
        dataSource = createAsyncDataSource<T>(dataSource);
    }

    return dataSource;
}