import * as React from 'react';
import { ArrayDataSourceProvider as DataSourceProvider } from './DataSource';
import RenderRecords from './components/RenderRecords';
import { getMockData } from './mockData';

const sort = {
    isNestedSort: true,
    order: [],
};

const pagination = { pageNumber: 1, perPage: 10 };

const filters = [];

export default function UsingArraySource() {
    const [workers] = React.useState(getMockData);

    return (
        <DataSourceProvider
            records={workers}
            isSortable={true}
            isPaginated={true}
            isFilterable={true}
            filters={filters}
            pagination={pagination}
            sort={sort}>
            <RenderRecords />
        </DataSourceProvider>
    );
}