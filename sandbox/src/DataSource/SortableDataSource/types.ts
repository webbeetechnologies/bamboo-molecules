import DataSource from "../DataSource";
import type { DataSourceResultProps, ISortProps, ESortDirection } from "../types";


export type SortableDataSourceProps<T> = ISortProps & DataSourceResultProps<T>;



export type TApplySortFunc = (args: { column: string, direction: ESortDirection }) => void;

export interface ISortableDataSource<RecordType> extends DataSource<RecordType> {
    applySort: TApplySortFunc;

    remove(args: { index: number }): void;
}