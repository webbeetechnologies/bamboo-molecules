import { memo } from 'react';
import { useGroupMeta, useShowGroupFooter } from '../../contexts';

import { ViewProps, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataGridRowRendererProps, GroupMetaRowProps } from '../../types';
import { useComponentStyles } from '@bambooapp/bamboo-atoms';

/**
 *
 * Abstracts the logic to render footer.
 * Component consumer doesn't need to do anything other than add a GroupFooterRenderer
 *
 */
const GroupFooterRendererInternal = memo((props: GroupMetaRowProps) => {
    const { meta, rowProps } = props;
    const { GroupFooterRenderer: RowRenderer } = useMolecules();

    const shouldShowFooter = useShowGroupFooter(meta);

    if (!shouldShowFooter) {
        return (
            <GroupEmptyFooter
                {...rowProps}
                isRealGroup={!!meta.isRealGroup}
                isLastLevel={meta.isLastLevel}
            />
        );
    }

    return <RowRenderer {...props} />;
});
GroupFooterRendererInternal.displayName = 'GroupFooterRendererInternal';

/**
 *
 * Renders an empty row.
 * Fixes all design issues, component consumer doesn't have to worry about styling.
 *
 */
export const GroupEmptyFooter = memo(
    ({
        isLastLevel,
        isRealGroup = true,
        ...props
    }: ViewProps & { isLastLevel: boolean; isRealGroup: boolean }) => {
        const { View } = useMolecules();
        const emptyFooterStyles = useComponentStyles('DataGrid_EmptyFooterRow');

        const style = isRealGroup && isLastLevel ? emptyFooterStyles : props.style;

        return <View {...props} style={style} />;
    },
);
GroupEmptyFooter.displayName = 'GroupEmptyFooter';

/**
 *
 * Can be replaced by the component consumer.
 * A placeholder component, just incase the user forgets to add a custom GroupFooterRender. will be replaced
 *
 */
export const GroupFooterRenderer = memo(({ rowProps }: GroupMetaRowProps) => {
    const { View, Text } = useMolecules();
    return (
        <View {...rowProps}>
            <Text>A footer doesn't exist. Inject a custom footer to make this work!!</Text>
        </View>
    );
});
GroupEmptyFooter.displayName = 'GroupEmptyFooter';

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupFooterRow = memo((props: DataGridRowRendererProps) => {
    const meta = useGroupMeta(props.index);

    const rendererProps = {
        meta,
        rowProps: props.rowProps,
        rowId: props.rowId,
        index: props.index,
    };

    if (meta.isCollapsed) return null;

    return <GroupFooterRendererInternal {...rendererProps} />;
});
GroupFooterRow.displayName = 'GroupFooterRow';
