import type { DataTableRowProps, TDataTableColumn } from '@bambooapp/bamboo-molecules';

export type GroupConstantValues = { field: string; value: any };

export type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
    isRealGroup: boolean;
    rowType: `${RowType}`;
};

export enum RowType {
    HEADER = 'header',
    FOOTER = 'footer',
    DATA = 'data',
}

export type GroupMeta = GroupMetaStates & {
    groupId: string;
    fieldId?: TDataTableColumn;
    recordCount: number;
    level: number;
    groupConstants: GroupConstantValues[];
};

export type DataGridRowRendererProps = DataTableRowProps;

export type GroupMetaRowProps = Pick<DataTableRowProps, 'rowProps' | 'rowId' | 'index'> & {
    meta: GroupMeta;
};
