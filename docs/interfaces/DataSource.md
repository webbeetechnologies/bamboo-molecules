# Data source

## Personas

-   Component developer
-   Component consumer

### Component Developer

-   As a component developer I want a standardized way on how to get data
-   As a component developer I want to implement infinite scrolling so I need pagination support on my data
-   As a component developer I want to offer my component users a way to filter down data so the data source needs to support filtering
-   As a component developer I want to offer my component users the possibility to sort the data so I need the data source to support sorting

### Component Consumer

-   As a component consumer, I want to use a type safe datasource.
    -   DataSource infers the type of Record passed.
    -   Typescript suggests/warns about the methods that can/cannot be accessed on the datasource depending on the configuration.
-   As a component consumer, I want to provide data to a component.
-   As a component consumer, I expect the records to be updated when I update the data.
-   As a component consumer, I expect my component to be still performant when the records are updated.
    -   Ensure that the component doesn't render unnecessarily.
-   As a component consumer, I want the data source to update when the filters, pagination, sorting and/or loading state is updated.
-   As a component consumer, I might not always be able to provide sorting, filter, loading and/or pagination support
-   As a component consumer, I expect the datasource to implement pagination, filter and sorting, loading state.
-   As a component consumer, I expect the datasource to expose pagination methods like goToNext, goToPrevious etc.
-   As a component consumer, I expect the datasource to methods to apply/remove filters.
-   As a component consumer, I expect the datasource to return methods for sorting.
-   As a component consumer, I want the datasource to handle loading state.
-   As a component consumer, I expect the datasource to return isLoading, isReady, isErrored, isLoaded properties.
-   As a component consumer, I want to apply custom pagination.
-   As a component consumer, I want to apply custom filter.
-   As a component consumer, I want to apply custom sorting.
-   As a component consumer, I want to compose my own dataSource.
-   As a component consumer, I want to build a new data source feature.

```typescript
/**
 *
 * Paginated DataSource
 *
 */
type PaginatedDataSource = { isPaginated?: false } | PaginationProps;
type OnPaginate = (
    dataSource: DataSource,
    onPaginate: OnPaginate,
) => Omit<PaginatedDataSource, 'onPaginate'>;

interface PaginationProps {
    isPaginated: true;
    pagination: {
        pageNumber: number;
        perPage: number;
    } & PaginationInfo;
    onPaginate?: OnPaginate;
}

interface PaginationInfo {
    // count of records on current page
    count: number;

    // count of all records
    totalRecords: number;
}

/**
 *
 * Filterable DataSource
 *
 */
type FilterableDataSource = { isFilterable?: false } | FilterPropsTrue;

type OnFilter = (
    dataSource: DataSource,
    onFilter: OnFilter,
) => Omit<FilterableDataSource, 'onFilter'>;
interface FilterPropsTrue {
    isFilterable: true;
    filters: Record<string, any>;
    onFilter?: OnFilter;
}

/**
 *
 * Sortable DataSource
 *
 */
type SortableDataSource = { isSortable?: false } | SortPropsTrue;
type OnSort = (dataSource: DataSource, onSort: OnSort) => Omit<SortableDataSource, 'onSort'>;
interface SortPropsTrue {
    isSortable: true;
    sort: Record<string, { direction: 'asc' | 'desc'; order: number }>;
    onSort?: OnSort;
}
interface DataSourceGetStateReturnOmits {
    onSort: true;
}

/**
 *
 * Loadable DataSource
 *
 */
type LoadableDataSource = { isLoadable?: false } | LoadblePropsTrue;
interface LoadblePropsTrue {
    isLoadable: true;
    loading: LoadingState;
    hasStarted: boolean;
    hasLoaded: boolean;
    isLoading: boolean;
    hasErrored: boolean;
}

interface LoadingState {
    started_at: Date | null;
    finished_at: Date | null;
    errorored_at: Date | null;
}

/**
 *
 * Datasource Base
 *
 */
interface DataSourceType<T> {
    records: T[];
    setRecords: <DS extends DataSourceType<T>>(dataSource: DS) => T[];
}

interface DataSourceSupports {
    isFilterable: boolean;
    isSortable: boolean;
    isPaginated: boolean;
    isLoadable: boolean;
}

interface DataSourceGetStateReturnOmits {}

type DataSource<T extends {} = {}> = DataSourceType<T> &
    LoadableDataSource &
    SortableDataSource &
    PaginatedDataSource &
    FilterableDataSource & {
        getState(): Omit<
            DataSource<T>,
            'getState' | keyof DataSourceSupports | keyof DataSourceGetStateReturnOmits
        >;
    };

const dataSource: DataSource<{ label: string; value: string }> = {
    records: [{ label: 'One', value: '1' }],
    setRecords: props => props.records,
    getState: function () {
        const { isFilterable, isLoadable, isPaginated, isSortable, getState, ...rest } = this;
        return rest;
    },

    // isLoadable: false,
    // loading: {
    //   started_at: null,
    //   finished_at: null,
    //   errorored_at: null,
    // },

    // isPaginated: true,
    // pagination: {
    //     pageNumber: 10,
    //     perPage: 20,
    //     count: 100,
    //     totalRecords: 100,
    // }

    // isSortable: false,
    // sort: { key: { direction: "asc",  order: 1 } },

    // isFilterable: false,
    // filters: {},
};
```
