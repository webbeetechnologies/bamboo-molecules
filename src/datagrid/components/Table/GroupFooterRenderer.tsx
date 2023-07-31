import { memo } from 'react';
import type { DataTableRowProps, TDataTableRow } from '@bambooapp/bamboo-molecules/components';
import { useField, useGroupMeta } from '../../contexts';
import type { Field } from '../../types';
import { withSpacers } from './Spacer';
import { useMolecules } from '@bambooapp/bamboo-molecules';

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
    const { GroupFooterRenderer: GroupFooterRendererInjected = GroupFooterRenderer } =
        useMolecules<{
            GroupFooterRenderer: typeof GroupFooterRenderer;
        }>();

    return <GroupFooterRendererInjected {...field} value={title} recordCount={count} />;
});
