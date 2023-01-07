import { DataSourceActions, EDataSourceActions } from '../createDataSource';
import { DataSourceInternalState, DataSourceType } from '../types';

// Paginate methods.
export enum EPageableActions {
    Page = 'GOTO_PAGE',
    Start = 'GOTO_START',
    End = 'GOTO_END',
    Next = 'GOTO_NEXT',
    Prev = 'GOTO_PREV',
    SetPerPage = 'SET_PER_PAGE',
}

export interface Pagination {
    pageNumber: number;
    perPage: number;
    disabled?: boolean;
}

type OnPaginate = <T extends {}>(
    dataSource: PaginationDataSource<T>,
    args: OnPaginateAction,
) => PaginationDataSource<T>;

export interface PageableDataSourceProps {
    isPaginated: boolean;
    pagination: Pagination;
    onPaginate?: OnPaginate;
}

export interface PaginationDataSource<T extends {}>
    extends DataSourceInternalState<T>,
        Omit<PageableDataSourceProps, 'onPaginate'> {}

export interface PaginationInfo<T extends {}> {
    // count of records on current page
    count: number;

    // count of all records
    totalRecords: number;

    page: T[];
}

export interface PaginationDataSourceResult<T extends {}> {
    isPaginated: boolean;
    pagination?: Pagination & PaginationInfo<T>;
    setPerPage: (payload: SetPerPage['payload']) => void;
    goTo: (payload: GoToArbitrary['payload']) => void;
    goToStart: () => void;
    goToEnd: () => void;
    goToPrev: () => void;
    goToNext: () => void;
}

// Define type of arguments for GoToMethods
export type PaginateAction = { type: `${EPageableActions}` | `${EDataSourceActions}` };
export type GoToArbitrary = { type: EPageableActions.Page; payload: { pageNumber: number } };
export type SetPerPage = { type: EPageableActions.SetPerPage; payload: { perPage: number } };
export type OnPaginateAction = PaginateAction | GoToArbitrary | SetPerPage | DataSourceActions;

export type PaginationReducer = <T extends {}>(
    dataSource: PaginationDataSource<T> & DataSourceInternalState<T>,
    args: OnPaginateAction,
) => PaginationDataSource<T>;
