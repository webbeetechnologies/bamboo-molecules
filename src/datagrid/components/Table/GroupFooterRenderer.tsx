import { memo } from 'react';
// import type { RenderCellProps } from '../../../components';
import type { DataTableRowProps, TDataTableRow } from 'src/components/DataTable/types';
import { useField, useGroupMeta } from '../../contexts';
import type { Field } from '../../types';
import { withSpacers } from './Spacer';

export type Props = {
    rowId: TDataTableRow;
};

export type GroupFooterRendererProps = Field & {
    value: any;
    recordCount: number;
};
/**
 *
 * Can be replaced by the component consumer.
 *
 */
export const GroupFooterRenderer = memo((_: GroupFooterRendererProps) => {
    return null;
});

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupFooterRow = withSpacers((props: DataTableRowProps) => {
    const { fieldId, title, count } = useGroupMeta(props.rowId);
    const field = useField(fieldId);

    return <GroupFooterRenderer {...field} value={title} recordCount={count} />;
});
