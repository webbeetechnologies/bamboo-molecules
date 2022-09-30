import DataSource, { createDataSource } from "../DataSource";
import { ISort } from "../types";
import { IOrderableDataSource, OrderableDataSourceProps } from "./types";



class OrderableDataSource<RecordType> extends DataSource<RecordType> implements IOrderableDataSource<RecordType> {
  sort!: ISort;

  move(args: { oldIndex: number; newIndex: number; }): void {
    throw new Error("Move Method not implemented.");
  }
}

export const createOrderableDataSource = <RecordType>(props: OrderableDataSourceProps<RecordType>) =>
      createDataSource<RecordType>(props, OrderableDataSource) as OrderableDataSource<RecordType>;


type ChainableDSFunc = <RecordType>(props: OrderableDataSourceProps<RecordType>) => OrderableDataSource<RecordType>;
export const createSortOrderableSourceHook = <RecordType>(useDataSource: ChainableDSFunc = createOrderableDataSource) =>
  (props: OrderableDataSourceProps<RecordType>) => useDataSource(createOrderableDataSource(props))



export const useSortableDataSource = createSortOrderableSourceHook();
