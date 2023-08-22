import { memo, useCallback, useMemo } from 'react';
import { IconButtonProps, useMolecules, TDataTableRow } from '@bambooapp/bamboo-molecules';
import { useRecordById } from '@bambooapp/bamboo-molecules/datagrid';
import {
    EXPAND_COLLAPSE_GROUPS_KEY,
    useExpandCollapseGroupsMethods,
    withPluginExistenceCheck,
} from '../../plugins';

export type Props = Partial<IconButtonProps> & {
    rowId: TDataTableRow;
};

const GroupExpandCollapseToggle = ({ rowId, style, ...rest }: Props) => {
    const { IconButton } = useMolecules();

    const { groupId } = useRecordById(rowId);
    const { useIsGroupCollapsed, useOnToggleGroupExpandAndCollapse } =
        useExpandCollapseGroupsMethods();

    const isCollapsed = useIsGroupCollapsed(groupId);
    const toggleGroupExpandAndCollapse = useOnToggleGroupExpandAndCollapse();

    const onPressIconButton = useCallback(() => {
        toggleGroupExpandAndCollapse(groupId);
    }, [groupId, toggleGroupExpandAndCollapse]);

    const { iconButtonStyle } = useMemo(
        () => ({
            iconButtonStyle: [{ marginRight: 'spacings.1' }, style],
        }),
        [style],
    );

    return (
        <IconButton
            style={iconButtonStyle}
            name={!isCollapsed ? 'chevron-down' : 'chevron-right'}
            size="sm"
            {...rest}
            onPress={onPressIconButton}
        />
    );
};

export default memo(
    withPluginExistenceCheck(GroupExpandCollapseToggle, EXPAND_COLLAPSE_GROUPS_KEY),
);
