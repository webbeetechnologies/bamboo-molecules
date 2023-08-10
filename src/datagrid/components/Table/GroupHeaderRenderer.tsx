import { memo } from 'react';
import { useMolecules } from '@bambooapp/bamboo-molecules';
// import type { RenderCellProps } from '../../../components';
import { useField, useGroupMeta } from '../../contexts';
import { ViewRenderer } from '../FieldRenderers';

import type { DataGridRowRendererProps, GroupMetaRowProps } from '../../types';

/**
 *
 * Can be replaced by the component consumer.
 *
 */
export const GroupHeaderRenderer = memo(
    ({ meta, rowId: _r, rowProps, columns: _c, ...field }: GroupMetaRowProps) => {
        const { View, Text } = useMolecules();

        return (
            <View {...rowProps}>
                <Text>{field.title}</Text>
                <ViewRenderer value={meta.groupConstants.at(-1)?.value} {...field} />
            </View>
        );
    },
);

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupHeaderRow = memo((props: DataGridRowRendererProps) => {
    const meta = useGroupMeta(props.rowId);
    const field = useField(meta.fieldId);
    const { GroupHeaderRenderer: RowRenderer } = useMolecules();

    const rendererProps = {
        ...field,
        meta,
        rowProps: props.rowProps,
        rowId: props.rowId,
    };

    return <RowRenderer {...rendererProps} />;
});

GroupHeaderRow.displayName = 'GroupHeaderRow';
