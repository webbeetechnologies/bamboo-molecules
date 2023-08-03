import type { DataTableRowProps, TDataTableColumn } from '@bambooapp/bamboo-molecules';
import type { Field } from './field';

export type GroupMetaStates = {
    isFirstLevel: boolean;
    isLastLevel: boolean;
    isFirst: boolean;
    isLast: boolean;
    isOnly: boolean;
};

export type GroupMeta = GroupMetaStates & {
    value: any;
    fieldId: TDataTableColumn;
    recordCount: number;
    level: number;
};

export type DataGridRowRendererProps = DataTableRowProps;

export type GroupMetaRowProps = Field &
    Pick<DataTableRowProps, 'rowProps' | 'rowId'> & {
        meta: GroupMeta;
    };
