import {
  IDataSource,
  DataSourceResultProps,
  LoadingState,
  TFilters,
  TSort,
  SetRecords,
  Records,
  TPagination, TFetchRecords
} from "./types";

export default class DataSource<RecordType> implements IDataSource<RecordType> {
  constructor({setRecords, ...props}: DataSourceResultProps<RecordType>) {
      Object.assign(this, props);
      this._setRecords = setRecords;
  }

  records: Records<any> = [];
  filters!: TFilters;
  search!: Function;
  searchKey!: string;
  sort!: TSort;
  pagination!: TPagination;
  loading!: LoadingState;
  fetchRecords!: TFetchRecords;

  _setRecords!: SetRecords;
  setRecords(records: any) {
    this._setRecords(records);
  };

  #supports(key: string): boolean {
    return !!(this as any)[key];
  }
  
  isLoadable(): boolean {
    return this.#supports("fetchRecords");
  }
  
  isPaginated(): boolean {
    return this.#supports("pagination");
  }

  isSearchable(): boolean {
    return this.#supports("searchKey") || this.#supports("search");
  }

  isSortable(): boolean {
    return this.#supports("sort");
  }

}

interface ExtendsDS<RecordType> extends DataSource<RecordType> {
  new () : ExtendsDS<RecordType>
};

type TDataSource<RecordType> = typeof DataSource<RecordType>;
type ClassType<RecordType> =  ExtendsDS<RecordType> | TDataSource<RecordType>;

export const createDataSource = <RecordType>(props: DataSourceResultProps<RecordType>, DataSourceClass: ClassType<RecordType> = DataSource): InstanceType<typeof DataSourceClass> => (new DataSourceClass(props));