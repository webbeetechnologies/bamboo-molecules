import { DataSourceType } from "../types";

// Pagination Base type
export interface Pagination {
    pageNumber: number;
    perPage: number;
    disabled?: boolean;
}


// Define type of arguments for GoToMethods
export type GoToRelative = { type: EPageableActions }
export type GoToArbitrary = { type: EPageableActions.Page, pageNumber: number }
export type SetPerPage = { type: EPageableActions.SetPerPage, perPage: number }

// Data Source Supported/ NotSupported
export type NotPageable = { isPaginated: false };
export type Pageable = { isPaginated: true, pagination: Pagination } ;


// Added Props for Pagination.
export interface PaginationInfo<T extends {}> {
    // count of records on current page
    count: number;

    // count of all records
    totalRecords: number;

    page: T[];
}



// Add Support for custom pagination handler.
export type OnPaginate = <T extends {}>(
    dataSource: PaginatedDataSourcePropsWithoutOnPaginate<T>,
    args: GoToArbitrary | GoToRelative | SetPerPage,

    // In case, the developer wants to extend the default behavior.
    onPaginate?: OnPaginate,
) => Pagination;

type PaginatedDataSourcePropsWithoutOnPaginate<T extends {}> = Omit<PaginatedDataSourcePropsEnabled<T>, keyof DataSourceGetStateReturnOmits>



// DataSource InputProps
export interface PaginatedDataSourcePropsEnabled<T extends {}> extends DataSourceType<T>, Pageable {
    onPaginate?: OnPaginate;
}

export type PaginatedDataSourceProps<T extends {}> = PaginatedDataSourcePropsEnabled<T> | NotPageableReturnProps<T>;



// Return for a paginated dataSource with pagination switched off.
export type NotPageableReturnProps<T> = (Required<NotPageable> & DataSourceType<T>);

// Return type for a paginated datasource when pagination is turned on.
export type PageableReturnProps<T extends {}> = PaginatedDataSourcePropsWithoutOnPaginate<T> & {
    pagination: Pagination & PaginationInfo<T>;
    setPerPage(perPage: number): void;
    goTo(pageNumber: number): void,
    goToPrev(): void,
    goToNext(): void,
    goToStart(): void,
    goToEnd(): void,
}


// Paginated DataSource
export type PageableDataSource<T extends {}>  = NotPageableReturnProps<T> | PageableReturnProps<T>


// Extends Omitted Props
export interface DataSourceGetStateReturnOmits {
    onPaginate: true;
}

// Paginate methods.
export enum EPageableActions {
    Page,
    Start,
    End,
    Next,
    Prev,
    SetPerPage
}