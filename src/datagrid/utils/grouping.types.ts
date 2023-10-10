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
    fieldId?: TDataTableColumn;
    count: number;
    level: number;
    groupConstants: GroupConstantValues[];
};

export interface RecordWithId extends Record<string, any> {
    id: number | string;
}

export type PrimitiveTypes = string | boolean | number | null | undefined;

type AggregateBase = {
    count: number;
    value: any;
    field: TDataTableColumn;
    recordIds: TDataTableRow[];
};

type GroupBase = {
    groupConstants: GroupConstantValues[];
    level: number;
    groupId: string;
    id: TDataTableColumn;
    isRealGroup?: boolean;
    isCollapsed: boolean;
    uniqueId: string;
};

export type AggregateRecord = AggregateBase & {
    children: AggregateRecord[];
};

export type NormalizedAggregateRecordBase = AggregateBase &
    GroupBase &
    GroupMeta & {
        title: any;
    };

export type GroupHeader = NormalizedAggregateRecordBase & {
    rowType: 'header';
};

export type GroupFooter = Omit<NormalizedAggregateRecordBase, 'value' | 'recordIds'> & {
    rowType: 'footer';
};

export type GroupRecord = GroupBase & {
    rowType: 'data';
    index: number;
    indexInGroup: number;
};

export type GroupMetaRow = GroupFooter | GroupHeader;

export type GroupedData = GroupMetaRow | GroupRecord;

export type NormalizeAggregatesFunc = (
    arg: AggregateRecord,
    groupConstants: GroupConstantValues[],
    index: number,
    totalItems: number,
) => GroupMetaRow[];