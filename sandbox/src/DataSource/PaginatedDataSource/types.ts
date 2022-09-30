import DataSource from "../DataSource";
import type { DataSourceResultProps, IPaginationProps } from "../types";

export type PaginatedDataSourceProps<T> = DataSourceResultProps<T> & Required<IPaginationProps> ;


export interface IPaginatedDataSource<RecordType> extends DataSource<RecordType> {
    setPage(args: {page: number}): void;

    setPageSize(args: {pageSize: number}): void;
}