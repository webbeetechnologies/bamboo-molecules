import type { TDataTableColumn } from '@bambooapp/bamboo-molecules';

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

type AggregateBase = {
    count: number;
    value: any;
    field: TDataTableColumn;
};

type GroupBase = {
    level: number;
    groupId: string;
    id: TDataTableColumn;
    index: number;
    groupConstants: GroupConstantValues[];
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

export type GroupFooter = Omit<NormalizedAggregateRecordBase, 'recordIds'> & {
    rowType: 'footer';
};

export type GroupRecord = GroupBase & {
    rowType: 'data';
    indexInGroup: number;
};

export type GroupMetaRow = GroupFooter | GroupHeader;

export type GroupedData = GroupMetaRow | GroupRecord | undefined;

export type NormalizeAggregatesFunc = (
    arg: AggregateRecord,
    groupConstants: GroupConstantValues[],
    index: number,
    normalizedIndex: number,
    totalItems: number,
    groupIdRoot?: string,
) => GroupMetaRow[];
