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

export type SearchableProps = { search: Function } | { searchKey: string };

export type TSort = {
  [key: string]: { direction: ESortDirection; order: number }
}

export interface ISortProps {
  sort: TSort;
}


export interface PaginationInfo {
  count: number;
}

export interface LoadingState {
  started_at: Date;
  finished_at: Date;
  errored_at: Date;
}



export type SetRecords = <T>(records: T[]) => void;


export type MaybeSearchable = SearchableProps | {};

export type Records<T> = T[];

export type TFetchRecords = <T>(...args : any[]) => Promise<T[]>
export interface IAsyncProps {
  fetchRecords: TFetchRecords
}

export type DataSourceResultProps<T> = { setRecords: SetRecords }
      & Partial<IFilterProps>
      & Partial<MaybeSearchable>
      & Partial<ISortProps>
      & Partial<IPaginationProps>
      & Partial<IAsyncProps>
      & { loading?: LoadingState }
      & { records: Records<T> }



export interface IDataSource<T> {
  records: Records<T>;

  filters?: TFilters;
  search?: Function;
  searchKey?: string;
  sort?: TSort;
  pagination?: TPagination;
  loading?: LoadingState;
  fetchRecords?: TFetchRecords;

  isPaginated(): boolean;
  isSearchable(): boolean;
  isSortable(): boolean;
  isLoadable(): boolean;

  setRecords: SetRecords

  // loadResults(props: DataSourceResultProps): any[];
}
