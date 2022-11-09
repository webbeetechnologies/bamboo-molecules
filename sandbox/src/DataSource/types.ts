import { PaginatedDataSourceProps } from "./PageableDatasource/types";

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
export interface DataSourceType<T> {
    records: T[];
}

interface DataSourceSupports {
    isFilterable: boolean;
    isSortable: boolean;
    isPaginated: boolean;
    isLoadable: boolean;
}

interface DataSourceGetStateReturnOmits {}

export type DataSource<T extends {} = {}> = DataSourceType<T> &
    LoadableDataSource &
    SortableDataSource &
    PaginatedDataSourceProps<T> &
    FilterableDataSource & {
        getState(): Omit<
            DataSource<T>,
            'getState' | keyof DataSourceSupports | keyof DataSourceGetStateReturnOmits
        >;
    };