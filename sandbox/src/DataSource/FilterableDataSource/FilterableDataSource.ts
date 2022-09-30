import DataSource, { createDataSource } from "../DataSource";
import { ISearchableDataSource, SearchableDataSourceProps } from "./types";



class SearchableDataSource<RecordType> extends DataSource<RecordType> implements ISearchableDataSource<RecordType> {
  declare searchKey: string;
  declare search: Function;

  applySearch() {
    const [s, setFilters] = useState();
    return setFilters;


    // TODO: Implement setRecords
    // this.setRecords();
    throw new Error("Apply Search Method is not implemented");
  }
}


export const createSearchableDataSource = <RecordType>(props: SearchableDataSourceProps<RecordType>) =>
    createDataSource<RecordType>(props, SearchableDataSource) as SearchableDataSource<RecordType>;



type ChainableDSFunc = <RecordType>(props: SearchableDataSourceProps<RecordType>) => SearchableDataSource<RecordType>;
export const createSearchableDataSourceHook = <RecordType>(useDataSource:ChainableDSFunc = createSearchableDataSource) =>
    (props: SearchableDataSourceProps<RecordType>) => useDataSource(createSearchableDataSource(props))



export const useSearchableDataSource = createSearchableDataSourceHook();
