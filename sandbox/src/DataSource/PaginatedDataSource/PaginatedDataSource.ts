import DataSource, { createDataSource } from "../DataSource";
import { IPaginatedDataSource, PaginatedDataSourceProps } from "./types";
import {TPagination} from "../types";




class PaginatedDataSource<RecordType> extends DataSource<RecordType> implements IPaginatedDataSource<RecordType> {
  declare pagination: TPagination;

  setPage(props: {page: number}): void {
    throw new Error("setPage not implemented.");
  }

  setPageSize(props: { pageSize: number }): void {
    throw new Error("setPageSize not implemented.");
  }
}

export type TPaginatedDataSource<ResultType> = PaginatedDataSource<ResultType>


export const createPaginatedDataSource = <RecordType>(props: PaginatedDataSourceProps<RecordType>) =>
    createDataSource<RecordType>(props, PaginatedDataSource) as PaginatedDataSource<RecordType>;


type ChainableDSFunc = <RecordType>(props: PaginatedDataSourceProps<RecordType>) => PaginatedDataSource<RecordType>;
export const createPaginatedDataSourceHook = <RecordType>(useDataSource: ChainableDSFunc = createPaginatedDataSource) =>
    (props: PaginatedDataSourceProps<RecordType>) => useDataSource(createPaginatedDataSource(props))



export const usePaginatedDataSource = createPaginatedDataSourceHook();