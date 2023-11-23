import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules';
export declare type GroupConstantValues = {
    field: TDataTableColumn;
    value: any;
};
export declare enum RowType {
    HEADER = 'header',
    FOOTER = 'footer',
    DATA = 'data',
}
export declare type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
    isRealGroup: boolean;
    rowType: `${RowType}`;
};
export declare type GroupMeta = GroupMetaStates & {
    groupId: string;
    fieldId?: TDataTableColumn | null;
    count: number;
    level: number;
    groupConstants: GroupConstantValues[];
    isRealGroup?: boolean;
    isCollapsed: boolean;
};
export interface RecordWithId extends Record<string, any> {
    id: number | string;
}
export declare type PrimitiveTypes = string | boolean | number | null | undefined;
declare type GroupBase = {
    level: number;
    groupId: string;
    id: TDataTableColumn;
    index: number;
    groupConstants: GroupConstantValues[];
    realIndex: number;
    groupIndex: number;
    nextGroupIndex: number;
};
export declare type NormalizedAggregateRecordBase = GroupBase &
    GroupMeta & {
        title: any;
        count: number;
        value: unknown;
        field: TDataTableColumn;
    };
export declare type GroupHeader = NormalizedAggregateRecordBase & {
    rowType: 'header';
};
export declare type GroupFooter = NormalizedAggregateRecordBase & {
    rowType: 'footer';
};
export declare type GroupRecord = Omit<GroupBase, 'id' | 'nextGroupIndex'> & {
    rowType: 'data';
    indexInGroup: number;
    id: TDataTableRow;
    isPlaceholder?: boolean;
};
export declare type GroupMetaRow = GroupFooter | GroupHeader;
export declare type GroupedDataTruthy = GroupMetaRow | GroupRecord;
export declare type GroupedData = GroupedDataTruthy | undefined;
export {};
