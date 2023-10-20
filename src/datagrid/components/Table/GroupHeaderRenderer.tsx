import { memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { areEqual } from '@bambooapp/virtualized-list';
// import type { RenderCellProps } from '../../../components';
import { useField, useGroupMeta } from '../../contexts';
import { ViewRenderer } from '../FieldRenderers';

import type { DataGridRowRendererProps, GroupMetaRowProps } from '../../types';
import { GroupExpandCollapseToggle } from '../GroupExpandCollapseToggle';

/**
 *
 * Can be replaced by the component consumer.
 *
 */
export const GroupHeaderRenderer = memo(({ meta, index, rowProps }: GroupMetaRowProps) => {
    const { View, Text } = useMolecules();
    const field = useField(meta.fieldId!);

    const { rowStyle } = useMemo(
        () => ({
            rowStyle: [
                { flexDirection: 'row', alignItems: 'center', padding: 'spacings.1' },
                rowProps?.style,
            ] as ViewStyle,
        }),
        [rowProps?.style],
    );

    return (
        <View {...rowProps} style={rowStyle}>
            <GroupExpandCollapseToggle rowIndex={index} />

            <View>
                <Text>{field.title}</Text>
                <ViewRenderer value={meta.groupConstants.at(-1)?.value} {...field} />
            </View>
        </View>
    );
}, areEqual);

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupHeaderRow = memo((props: DataGridRowRendererProps) => {
    const meta = useGroupMeta(props.index);
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
