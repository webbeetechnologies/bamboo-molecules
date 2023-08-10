import type { DataTableRowProps, TDataTableColumn } from '@bambooapp/bamboo-molecules';

export type GroupConstantValues = { field: string; value: any };

export type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
};

export type GroupMeta = GroupMetaStates & {
    fieldId?: TDataTableColumn;
    recordCount: number;
    level: number;
    groupConstants: GroupConstantValues[];
};

export type DataGridRowRendererProps = DataTableRowProps;

export type GroupMetaRowProps = Pick<DataTableRowProps, 'rowProps' | 'rowId' | 'index'> & {
    meta: GroupMeta;
};
