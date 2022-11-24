import * as React from 'react';
import {
    PaginatedDataSourceProvider,
    usePaginatedDataSource,
} from './DataSource/PageableDatasource/paginatedDatasource';
// import { usePageableDatasource } from './DataSource';
// import { PageableReturnProps } from './DataSource/PageableDatasource/types';
// import { useSortableDataSource } from './DataSource/SortableDatasource';
// import { SortableReturnProps } from './DataSource/SortableDatasource/types';
import RenderRecords from './RenderRecords';
import { RecordType } from './types';

function findAllCustomerData() {
    const records = [
        {
            first_name: 'Makenna',
            last_name: 'Bradtke',
            id: '1',
        },
        {
            first_name: 'Berry',
            last_name: 'Jerde',
            id: '2',
        },
        {
            first_name: 'Kiara',
            last_name: 'Heaney',
            id: '3',
        },
        {
            first_name: 'Kylee',
            last_name: 'Turcotte',
            id: '4',
        },
        {
            first_name: 'Shemar',
            last_name: 'Botsford',
            id: '5',
        },
        {
            first_name: 'Houston',
            last_name: 'Cormier',
            id: '6',
        },
        {
            first_name: 'Matilda',
            last_name: 'Thiel',
            id: '7',
        },
        {
            first_name: 'Cristina',
            last_name: 'Larkin',
            id: '8',
        },
        {
            first_name: 'Tina',
            last_name: 'Durgan',
            id: '9',
        },
        {
            first_name: 'Green',
            last_name: 'Kohler',
            id: '10',
        },
    ];
    return [
        ...records,
        ...records.map(x => ({ ...x, last_name: x.last_name + ' DEF', id: x.id + 2000 })),
        ...records.map(x => ({ ...x, id: x.id + 1000 })),
        ...records.map(x => ({ ...x, first_name: x.first_name + ' ABC', id: x.id + 3000 })),
    ] as RecordType[];
}

const WrappedComponent = () => {
    const pageable = usePaginatedDataSource();

    return (
        <RenderRecords
            {...{
                ...pageable,
            }}
        />
    );
};

const pagination = {
    pageNumber: 1,
    perPage: 10,
};

export default function UsingArraySource() {
    const [workers] = React.useState(findAllCustomerData);

    // const sortable = useSortableDataSource({
    //     records: workers,
    //     sorting: { sort: [] },
    //     isSortable: true,
    // }) as SortableReturnProps<RecordType>;

    // const pageable = usePageableDatasource({
    //     ...sortable,
    //     pagination: { pageNumber: 1, perPage: 10 },
    //     isPaginated: true,
    // }) as PageableReturnProps<RecordType> & SortableReturnProps<RecordType>;

    return (
        <PaginatedDataSourceProvider records={workers} isPaginated={true} pagination={pagination}>
            <WrappedComponent />
        </PaginatedDataSourceProvider>
    );
}
