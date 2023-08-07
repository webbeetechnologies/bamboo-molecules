import type { DataTableRowProps, TDataTableColumn } from '@bambooapp/bamboo-molecules';
import type { Field } from './field';

export type GroupConstantValues = { field: string; value: any };

export type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
};

export type GroupMeta = GroupMetaStates & {
    fieldId: TDataTableColumn;
    recordCount: number;
    level: number;
    groupConstants: GroupConstantValues[];
};

export type DataGridRowRendererProps = DataTableRowProps;

export type GroupMetaRowProps = Field &
    Pick<DataTableRowProps, 'rowProps' | 'rowId'> & {
        meta: GroupMeta;
    };
