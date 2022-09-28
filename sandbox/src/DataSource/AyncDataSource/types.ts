import DataSource from "../DataSource";
import type { DataSourceResultProps, IAsyncProps } from "../types";



export type AsyncDataSourceProps<T> = IAsyncProps & DataSourceResultProps<T>;


export interface IAsyncDataSource<RecordType> extends DataSource<RecordType> {
    cancel(cancelToken: string): void;

    read(): Promise<RecordType[]>;
}