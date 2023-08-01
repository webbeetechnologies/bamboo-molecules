import { memo } from 'react';
// import type { RenderCellProps } from '../../../components';
import type { DataTableRowProps } from 'src/components/DataTable/types';
import { useField, useGroupMeta } from '../../contexts';
import { ViewRenderer } from '../FieldRenderers';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import type { Field } from '../../types';
import { StyleSheet } from 'react-native';
import { withSpacers } from './Spacer';

export type GroupHeaderRendererProps = Field & {
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
export const GroupHeaderRenderer = memo(
    ({ value, recordCount: _r, ...field }: GroupHeaderRendererProps) => {
        const { View, Text } = useMolecules();

        return (
            <View style={styles.groupHeaderContainer}>
                <Text>{field.title}</Text>
                <ViewRenderer value={value} {...field} />
            </View>
        );
    },
);

/**
 *
 * Renders the group header row.
 * Can be replaced with useRowRenderer prop on datagrid.
 */
export const GroupHeaderRow = withSpacers((props: DataTableRowProps) => {
    const { fieldId, title, count, level, isHighestLevel, isLowestLevel } = useGroupMeta(
        props.rowId,
    );
    const field = useField(fieldId);
    const { GroupHeaderRenderer: GroupHeaderRendererInjected = GroupHeaderRenderer } =
        useMolecules<{
            GroupHeaderRenderer: typeof GroupHeaderRenderer;
        }>();

    const metaProps = {
        value: title,
        recordCount: count,
        level,
        isHighestLevel,
        isLowestLevel,
    };

    return <GroupHeaderRendererInjected {...field} {...metaProps} />;
});

const styles = StyleSheet.create({
    groupHeaderContainer: {
        flex: 1,
        padding: 'spacings.2',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgb(202, 196, 208)',
    },
});
