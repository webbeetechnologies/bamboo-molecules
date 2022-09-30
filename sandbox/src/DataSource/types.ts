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

export type TSort = { direction: ESortDirection; order: number }

export interface ISort {
  [key: string]: TSort
}

export interface ISortProps {
  sort: ISort;
}


export interface PaginationInfo {
  count: number;
}

export interface LoadingState {
  started_at: Date;
  finished_at: Date;
  errored_at: Date;
}

export type Records<ResultType> = ResultType[];

export type TSetRecordArg<ResultType> = Records<ResultType> | ((records: Records<ResultType>) => Records<ResultType>)
export type TSetRecords<ResultType> = (records: TSetRecordArg<ResultType>) => void;



export type TFetchRecords = <ResultType>(...args : any[]) => Promise<ResultType[]>
export interface IAsyncProps {
  fetchRecords: TFetchRecords
}

export type DataSourceResultProps<ResultType> = { setRecords: TSetRecords<ResultType> }
      & Partial<IFilterProps>
      & Partial<ISortProps>
      & Partial<IPaginationProps>
      & Partial<IAsyncProps>
      & { loading?: LoadingState }
      & { records: Records<ResultType>
}


export interface IDataSource<ResultType> {
  records: Records<ResultType>;

  filters?: TFilters;
  sort?: ISort;
  pagination?: TPagination;
  loading?: LoadingState;
}




export interface IDataSourceClass<ResultType> extends IDataSource<ResultType> {

  isPaginated(): boolean;
  isFilterable(): boolean;
  isSortable(): boolean;
  isLoadable(): boolean;
  fetchRecords?: TFetchRecords;
  setRecords: TSetRecords<ResultType>

  // loadResults(props: DataSourceResultProps): any[];
}



export enum EStoreActions {
  SET_RECORDS,
  LOAD_RESULTS_START,
  LOAD_RESULTS_DONE,
  LOAD_RESULTS_ERROR,
  FILTER,
  SORT,
  REMOVE_SORT,
  PAGINATE,
  MOVE,
}


export enum EStoreSupport {
  LOADING,
  FILTER,
  SORT,
  REMOVE_SORT,
  PAGINATE,
  MOVE,
}