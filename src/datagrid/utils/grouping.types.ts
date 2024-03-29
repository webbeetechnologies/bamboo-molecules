import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules';

export type GroupConstantValues = { field: TDataTableColumn; value: any };

export enum RowType {
    HEADER = 'header',
    FOOTER = 'footer',
    DATA = 'data',
}

export type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
    isRealGroup: boolean;
    rowType: `${RowType}`;
};

export type GroupMeta = GroupMetaStates & {
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

export type PrimitiveTypes = string | boolean | number | null | undefined;

type GroupBase = {
    level: number;
    groupId: string;
    id: TDataTableColumn;
    index: number;
    groupConstants: GroupConstantValues[];
    realIndex: number;
    groupIndex: number;
    nextGroupIndex: number;
};

export type NormalizedAggregateRecordBase = GroupBase &
    GroupMeta & {
        title: any;
        count: number;
        value: unknown;
        field: TDataTableColumn;
    };

export type GroupHeader = NormalizedAggregateRecordBase & {
    rowType: 'header';
};

export type GroupFooter = Omit<NormalizedAggregateRecordBase, 'recordIds'> & {
    rowType: 'footer';
};

export type GroupRecord = Omit<GroupBase, 'id' | 'nextGroupIndex'> & {
    rowType: 'data';
    indexInGroup: number;
    id: TDataTableRow;
    isPlaceholder?: boolean;
};

export type GroupMetaRow = GroupFooter | GroupHeader;

export type GroupedDataTruthy = GroupMetaRow | GroupRecord;
export type GroupedData = GroupedDataTruthy | undefined;
