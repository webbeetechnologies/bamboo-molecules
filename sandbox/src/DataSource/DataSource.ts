import {
  IDataSourceClass,
  DataSourceResultProps,
  LoadingState,
  TFilters,
  TSort,
  TSetRecords,
  Records,
  TPagination, TFetchRecords
} from "./types";

export default class DataSource<RecordType> implements IDataSourceClass<RecordType> {
  constructor({setRecords, ...props}: DataSourceResultProps<RecordType>) {
      Object.assign(this, props);
      this._setRecords = setRecords;
  }

  records: Records<any> = [];

  _setRecords!: TSetRecords<RecordType>;
  setRecords(records: any) {
    this._setRecords(records);
  };

  #supports(key: string): boolean {
    return !!(this as any)[key];
  }
  
  isLoadable(): boolean {
    return this.#supports("loadingState");
  }
  
  isPaginated(): boolean {
    return this.#supports("pagination");
  }

  isFilterable(): boolean {
    return this.#supports("filters");
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