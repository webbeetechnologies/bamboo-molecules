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
  // TODO: Define filter types
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

export type Records<ResultType extends {} = {}> = ResultType[];


export type TSetRecords = <ResultType extends {} = {}>(records:  Records<ResultType>) => void;


export type TFetchRecords = <ResultType extends {} = {}>(...args : ResultType[]) => Promise<ResultType[]>

export interface IAsyncProps {
  fetchRecords: TFetchRecords
}

export type DataSourceResultProps<ResultType extends {} = {}> = { setRecords: TSetRecords }
      & Partial<IFilterProps>
      & Partial<ISortProps>
      & Partial<IPaginationProps>
      & Partial<IAsyncProps>
      & { loading?: LoadingState }
      & { records: Records<ResultType>
}


export interface IDataSourceState<ResultType extends {} = {}> {
  records: Records<ResultType>;

  filters?: TFilters;
  sort?: TSort[];
  pagination?: TPagination;
  loading?: LoadingState;
  error?: Error;

  pages?: Records<ResultType>[],
  action?: EStoreActions,
  originalRecords?: Records<ResultType>
}

export interface ITypedDataSourceState<ResultType extends {}> extends IDataSourceState<ResultType>{
}


export interface IDataSource<ResultType extends {} = {}> extends IDataSourceState<ResultType> {
  dispatch: Function;
  setRecords: TSetRecords,
}


export interface ITypedDataSource<ResultType extends {}> extends IDataSource<ResultType>{
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