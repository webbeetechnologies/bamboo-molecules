import { memo } from 'react';
import type { DataTableRowProps } from '@bambooapp/bamboo-molecules/components';
import { useField, useGroupMeta } from '../../contexts';
import type { Field } from '../../types';
import { withSpacers } from './Spacer';
import { useMolecules } from '@bambooapp/bamboo-molecules';

export type GroupFooterRendererProps = Field & {
    value: any;
    recordCount: number;
    level: number;
    isHighestLevel: boolean;
    isLowestLevel: boolean;
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
    const { fieldId, title, count, level, isHighestLevel, isLowestLevel } = useGroupMeta(
        props.rowId,
    );
    const field = useField(fieldId);
    const { GroupFooterRenderer: GroupFooterRendererInjected = GroupFooterRenderer } =
        useMolecules<{
            GroupFooterRenderer: typeof GroupFooterRenderer;
        }>();

    const metaProps = {
        value: title,
        recordCount: count,
        level,
        isHighestLevel,
        isLowestLevel,
    };

    return <GroupFooterRendererInjected {...field} {...metaProps} />;
});
