import { memo } from 'react';
import { useGroupMeta, useShowGroupFooter } from '../../contexts';

import { ViewProps, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataGridRowRendererProps, GroupMetaRowProps } from '../../types';
import { useComponentStyles } from '@bambooapp/bamboo-atoms';

const EmptyFooter = memo(({ isLastLevel, ...props }: ViewProps & { isLastLevel: boolean }) => {
    const { View } = useMolecules();
    const emptyFooterStyles = useComponentStyles('DataGrid_EmptyFooterRow');

    const style = isLastLevel ? emptyFooterStyles : props.style;

    return <View {...props} style={style} />;
});

/**
 *
 * Can be replaced by the component consumer.
 *
 */
export const GroupFooterRenderer = memo(({ meta, rowProps }: GroupMetaRowProps) => {
    const { View, Text } = useMolecules();
    const shouldShowFooter = useShowGroupFooter(meta);

    if (!shouldShowFooter) {
        return <EmptyFooter {...rowProps} isLastLevel={!meta.isAbsolute && meta.isLastLevel} />;
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
    const { GroupFooterRenderer: RowRenderer } = useMolecules();

    const rendererProps = {
        meta,
        rowProps: props.rowProps,
        rowId: props.rowId,
        index: props.index,
    };

    return <RowRenderer {...rendererProps} />;
});

GroupFooterRow.displayName = 'GroupFooterRow';
