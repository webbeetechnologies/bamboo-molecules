import { DataSourceResultProps } from "./types";
import {createDataSource} from "./DataSource";
import {createSortableDataSource, TSortableDataSource} from "./SortableDataSource";
import {createFilterableDataSource, TFilterableDataSource} from "./FilterableDataSource";
import {createAsyncDataSource, TAsyncDataSource} from "./AyncDataSource";
import { createPaginatedDataSource, TPaginatedDataSource } from "./PaginatedDataSource";

export const useDataSource = <ResultType>(props: DataSourceResultProps<ResultType>) => {
    let dataSource = createDataSource(props);

    if (dataSource.isPaginated()) {
        dataSource = createPaginatedDataSource<ResultType>(dataSource as TPaginatedDataSource<ResultType>);
    }

    if (dataSource.isFilterable()) {
        dataSource = createFilterableDataSource<ResultType>(dataSource as TFilterableDataSource<ResultType>);
    }

    if (dataSource.isSortable()) {
        dataSource = createSortableDataSource<ResultType>(dataSource as TSortableDataSource<ResultType>);
    }

    if (dataSource.isLoadable()) {
        dataSource = createAsyncDataSource<ResultType>(dataSource as TAsyncDataSource<ResultType>);
    }

    return dataSource;
}

// useDataSource({ records: [],  })
//
// const createDataStoreHook = <T>(func: Promise<T>) => (props) => func(useDataSource(props));
//
// const source  = createDataStoreHook(async (props) => {
//     return axios.get('https://' + queryparams.serialize(filters) );
// })