import * as React from 'react';
import {
    AsyncDataSourceProvider as DataSourceProvider,
    presentPaginatedDataSourceRecords,
    presentFilteredDataSourceRecords,
    presentSortedDataSourceRecords,
    combinePresenters,
    paginatedDataSourceReducer,
    sortableDataSourceReducer,
    filterableDatasourceReducer,
} from './DataSource';

import { RecordType } from './types';
import RenderRecords from './components/RenderRecords';
import { DataSourceType } from './DataSource/types';
import { getMockData } from './mockData';

const presentDataSource = combinePresenters([
    presentFilteredDataSourceRecords,
    presentSortedDataSourceRecords,
    presentPaginatedDataSourceRecords,
]);

// generate a random between a provided range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function findAllCustomerData(dataSource) {
    const [result, _promise] = await Promise.all([
        presentDataSource({
            sort: dataSource.sort,
            pagination: dataSource.pagination,
            filters: dataSource.filters,
            isPaginated: dataSource.isPaginated,
            isSortable: dataSource.isSortable,
            isFilterable: dataSource.isFilterable,
            records: getMockData(),
        }),
        new Promise((resolve, reject) =>
            setTimeout(!getRandomInt(0, 5) ? reject : resolve, getRandomInt(1000, 3000)),
        ),
    ]).catch(e => {
        console.error('findAllCustomerData', e);
        throw e;
    });

    return result;
}

const sort = {
    isNestedSort: true,
    order: [],
};

const pagination = { pageNumber: 1, perPage: 10 };

const filters = [];

export default function UsingAsyncSource({}) {
    const [workers, setWorkers] = React.useState([]);
    const [loading, setLoading] = React.useState({ startedAt: 0, finishedAt: 0, erroredAt: 0 });

    const recordsPresenter = React.useCallback(
        async (dataSource: DataSourceType<RecordType>) => {
            setLoading(loading => ({ ...loading, startedAt: Date.now() }));
            return findAllCustomerData(dataSource)
                .then(records => {
                    setLoading(loading => ({ ...loading, finishedAt: Date.now() }));
                    return records;
                })
                .catch(e => {
                    console.error(e);
                    setLoading(loading => ({ ...loading, erroredAt: Date.now() }));
                });
        },
        [setLoading],
    );

    return (
        <DataSourceProvider
            records={workers}
            isSortable={true}
            isPaginated={true}
            isFilterable={true}
            isLoadable={true}
            filters={filters}
            pagination={pagination}
            loading={loading}
            onPaginate={paginatedDataSourceReducer}
            onSort={sortableDataSourceReducer}
            onFilter={filterableDatasourceReducer}
            recordsPresenter={recordsPresenter}
            sort={sort}>
            <RenderRecords />
        </DataSourceProvider>
    );
}
