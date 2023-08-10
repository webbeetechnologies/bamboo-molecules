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
export const GroupHeaderRenderer = memo(({ meta, rowId: _r, rowProps }: GroupMetaRowProps) => {
    const { View, Text } = useMolecules();
    const field = useField(meta.fieldId!);

    return (
        <View {...rowProps}>
            <Text>{field.title}</Text>
            <ViewRenderer value={meta.groupConstants.at(-1)?.value} {...field} />
        </View>
    );
});

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupHeaderRow = memo((props: DataGridRowRendererProps) => {
    const meta = useGroupMeta(props.rowId);
    const { GroupHeaderRenderer: RowRenderer } = useMolecules();

    const rendererProps = {
        meta,
        rowProps: props.rowProps,
        rowId: props.rowId,
        index: props.index,
    };

    return <RowRenderer {...rendererProps} />;
});

GroupHeaderRow.displayName = 'GroupHeaderRow';
