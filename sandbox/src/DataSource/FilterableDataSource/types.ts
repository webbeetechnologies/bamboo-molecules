import DataSource from "../DataSource";
import type { DataSourceResultProps, IFilterProps } from "../types";

export type FilterableDataSourceProps<RecordType> =  IFilterProps & DataSourceResultProps<RecordType>;

export type TApplyFilterFunc = (args: {filterName: string, value: any, operator: EFilterOperator }) => void;
export interface IFilterableDataSource<RecordType> extends DataSource<RecordType> {
    applyFilter: TApplyFilterFunc;
}

export enum EFilterOperator {
    CONTAINS,
    MATCHES,
    EXCLUDES,
    STARTS_WITH,
    ENDS_WITH,
}