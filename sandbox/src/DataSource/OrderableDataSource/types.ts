import DataSource from "../DataSource";
import type { DataSourceResultProps, ISortProps } from "../types";


export type OrderableDataSourceProps<T> = ISortProps & DataSourceResultProps<T>;



export interface IOrderableDataSource<RecordType> extends DataSource<RecordType> {
    move(args: { oldIndex: number, newIndex: number }): void;
}