import DataSource, { createDataSource } from "../DataSource";
import {TFetchRecords} from "../types";
import { IAsyncDataSource, AsyncDataSourceProps } from "./types";



class AsyncDataSource<RecordType> extends DataSource<RecordType> implements IAsyncDataSource<RecordType> {
  declare fetchRecords: TFetchRecords;

  cancel(cancelToken: string): void {
    throw new Error("Cancel Method is not implemented");
  }

  read(): Promise<RecordType[]> {
    throw new Error("Read Method is not implemented");
  }
}

const createAsyncDataSource = <RecordType>(props: AsyncDataSourceProps<RecordType>) => createDataSource<RecordType>(props, AsyncDataSource) as AsyncDataSource<RecordType>;


type ChainableDSFunc = <RecordType>(props: AsyncDataSourceProps<RecordType>) => AsyncDataSource<RecordType>;
export const createAsyncDataSourceHook = <RecordType>(useDataSource: ChainableDSFunc = createAsyncDataSource) =>
  (props: AsyncDataSourceProps<RecordType>) => useDataSource(createAsyncDataSource(props))



export const useAsyncDataSource = createAsyncDataSourceHook();
