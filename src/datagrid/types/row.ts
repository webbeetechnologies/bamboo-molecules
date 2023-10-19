import type { DataTableRowProps } from '@bambooapp/bamboo-molecules';
import type { GroupMeta } from '../utils';

export type DataGridRowRendererProps = DataTableRowProps;

export type GroupMetaRowProps = Pick<
    DataTableRowProps,
    'rowProps' | 'rowId' | 'index' | 'style'
> & {
    meta: GroupMeta;
};
