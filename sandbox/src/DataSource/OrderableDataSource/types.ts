import DataSource from "../DataSource";
import type { DataSourceResultProps, ISortProps, ESortDirection } from "../types";


export type SortableDataSourceProps<T> = ISortProps & DataSourceResultProps<T>;



export interface ISortableDataSource<RecordType> extends DataSource<RecordType> {
    applySort(args: { column: string, direction: ESortDirection }): void;

    move(args: { oldIndex: number, newIndex: number }): void;

    remove(args: { index: number }): void;
}