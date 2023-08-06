import { memo } from 'react';
import { useField, useGroupMeta, useShowGroupFooter } from '../../contexts';

import { useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataGridRowRendererProps, GroupMetaRowProps } from '../../types';

/**
 *
 * Can be replaced by the component consumer.
 *
 */
export const GroupFooterRenderer = memo(({ meta, rowProps }: GroupMetaRowProps) => {
    const { View, Text } = useMolecules();
    const shouldShowFooter = useShowGroupFooter(meta);

    if (!shouldShowFooter) {
        return <View {...rowProps} />;
    }

    return (
        <View {...rowProps}>
            <Text>A footer doesn't exist. Inject a custom footer to make this work!!</Text>
        </View>
    );
});

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupFooterRow = memo((props: DataGridRowRendererProps) => {
    const meta = useGroupMeta(props.rowId);
    const field = useField(meta.fieldId);
    const { GroupFooterRenderer: RowRenderer } = useMolecules();

    const rendererProps = {
        ...field,
        meta,
        rowProps: props.rowProps,
        rowId: props.rowId,
    };

    return <RowRenderer {...rendererProps} />;
});

GroupFooterRow.displayName = 'GroupFooterRow';
