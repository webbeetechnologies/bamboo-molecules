import {ActionInterface, EStoreActions} from "./reducers/types";
import {TApplySortFunc} from "./SortableDataSource";
import {TApplyFilterFunc} from "./FilterableDataSource";

export type TPagination = {
    page: number;
    pageSize: number;
}

export interface IPaginationProps {
  pagination: TPagination
}

export type TFilters = {
  [key: string]: any
}

export interface IFilterProps {
  filters: TFilters;
}

export enum ESortDirection {
    ASC,
    DESC,
}

export type TSort = { column: "", direction: ESortDirection; }


export interface ISortProps {
  sort: TSort[];
}


export interface PaginationInfo {
  count: number;
}

export interface LoadingState {
  started_at: number | null;
  finished_at: number | null;
  errored_at: number | null;
}

export type Records<ResultType> = ResultType[];


export type TSetRecords = <T extends any>(records:  Records<T>) => void;



export type TFetchRecords = <ResultType>(...args : any[]) => Promise<ResultType[]>
export interface IAsyncProps {
  fetchRecords: TFetchRecords
}

export type DataSourceResultProps<ResultType> = { setRecords: TSetRecords }
      & Partial<IFilterProps>
      & Partial<ISortProps>
      & Partial<IPaginationProps>
      & Partial<IAsyncProps>
      & { loading?: LoadingState }
      & { records: Records<ResultType>
}


export interface IDataSourceState {
  records: Records<any>;

  filters?: TFilters;
  sort?: TSort[];
  pagination?: TPagination;
  loading?: LoadingState;

  pages?: Records<any>[],
  action?: EStoreActions,
  originalRecords?: Records<any>
}


export interface ITypedDataSourceState<T> extends IDataSourceState{
  records: Records<T>
  pages?: Records<T>[],
  originalRecords?: Records<T>
}




export interface IDataSource extends IDataSourceState {
  dispatch: Function;
  setRecords: TSetRecords,
}


export interface ISortableDataSource extends IDataSource {
  applySort: TApplySortFunc,
  removeSort: TApplySortFunc,
}


export interface IOrderableDataSource extends IDataSource {
  move: TApplySortFunc,
}


export interface IFilterableDataSource extends IDataSource {
  applyFilter: TApplyFilterFunc,
}


export interface IPaginatedDataSource extends IDataSource {
  goTo: Function,
  goToStart: Function,
  goToEnd: Function,
  goToNext: Function,
  goToPrev: Function,
}

export interface ILoadableDataSource extends IDataSource {
  loadResults: () => void,
  hasInitialized: Boolean,
  hasLoaded: Boolean,
  hasErrored: Boolean,
  isLoading: Boolean,
}


export interface TStoreConfig {
  loadable?: boolean,
  filterable?: boolean,
  sortable?: boolean,
  pageable?: boolean,
  orderable?: boolean,
}