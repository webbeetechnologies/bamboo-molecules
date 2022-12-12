import { PageableDataSource, PaginatedDataSourceProps } from './PageableDatasource/types';

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
    PaginatedDataSourceProps<T> &
    FilterableDataSource & {
        getState(): Omit<
            DataSource<T>,
            'getState' | keyof DataSourceSupports | keyof DataSourceGetStateReturnOmits
        >;
    };

export type DataSourceReturnType<T extends {} = {}> = DataSourceType<T> & PageableDataSource<T>;
