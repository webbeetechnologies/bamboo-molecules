import DataSource, { createDataSource } from "../DataSource";
import { TSort } from "../types";
import { ISortableDataSource, SortableDataSourceProps } from "./types";



class SortableDataSource<RecordType> extends DataSource<RecordType> implements ISortableDataSource<RecordType> {
  declare sort: TSort[];

  remove(args: { index: number; }): void {
    throw new Error("Remove Method not implemented.");
  }

  declare applySort: ISortableDataSource<RecordType>["applySort"]
}

export type TSortableDataSource<ResultType> = SortableDataSource<ResultType>

export const createSortableDataSource = <RecordType>(props: SortableDataSourceProps<RecordType>) =>
      createDataSource<RecordType>(props, SortableDataSource) as SortableDataSource<RecordType>;


type ChainableDSFunc = <RecordType>(props: SortableDataSourceProps<RecordType>) => SortableDataSource<RecordType>;
export const createSortableDataSourceHook = <RecordType>(useDataSource: ChainableDSFunc = createSortableDataSource) =>
  (props: SortableDataSourceProps<RecordType>) => useDataSource(createSortableDataSource(props))



export const useSortableDataSource = createSortableDataSourceHook();
