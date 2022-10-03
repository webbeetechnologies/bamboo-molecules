export type TApplyFilterFunc = (args: {filterName: string, value: any, operator: EFilterOperator }) => void;


export enum EFilterOperator {
    CONTAINS,
    MATCHES,
    EXCLUDES,
    STARTS_WITH,
    ENDS_WITH,
}