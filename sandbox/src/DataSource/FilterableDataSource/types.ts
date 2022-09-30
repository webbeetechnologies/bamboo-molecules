import DataSource from "../DataSource";
import type { DataSourceResultProps, SearchableProps } from "../types";

export type SearchableDataSourceProps<RecordType> =  SearchableProps & DataSourceResultProps<RecordType>;

export interface ISearchableDataSource<RecordType> extends DataSource<RecordType> {
    applySearch(searchTerm: string): void;
}