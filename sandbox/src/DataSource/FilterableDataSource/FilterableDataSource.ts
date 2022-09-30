import DataSource, { createDataSource } from "../DataSource";
import type { IFilterableDataSource, FilterableDataSourceProps } from "./types";
import type { TFilters } from "../types";



class FilterableDataSource<RecordType> extends DataSource<RecordType> implements IFilterableDataSource<RecordType> {
  declare filters: TFilters

  declare applyFilter: IFilterableDataSource<RecordType>["applyFilter"]

  // applyFilter = () => {
  //   // const [s, setFilters] = useState();
  //   // return setFilters;


  //   // TODO: Implement setRecords
  //   // this.setRecords();
  //   // @ts-ignore
  //   console.log("applyFilter", super.applyFilter);
  //   throw new Error("Apply Filter Method is not implemented");
  // }
}

export type TFilterableDataSource<ResultType> = FilterableDataSource<ResultType>


export const createFilterableDataSource = <RecordType>(props: FilterableDataSourceProps<RecordType>) =>
    createDataSource<RecordType>(props, FilterableDataSource) as FilterableDataSource<RecordType>;



type ChainableDSFunc = <RecordType>(props: FilterableDataSourceProps<RecordType>) => FilterableDataSource<RecordType>;
export const createSearchableDataSourceHook = <RecordType>(useDataSource:ChainableDSFunc = createFilterableDataSource) =>
    (props: FilterableDataSourceProps<RecordType>) => useDataSource(createFilterableDataSource(props))



export const useFilterableDataSource = createSearchableDataSourceHook();
