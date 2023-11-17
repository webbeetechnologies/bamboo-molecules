import { ComponentType, FC, RefAttributes, memo } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules } from '../../../hooks';
import { useDataTable } from '../DataTableContext';
import type { DataTableRowProps } from '../types';

export const withRowLoadingPlaceholder = (
    Component: ComponentType<DataTableRowProps & RefAttributes<any>>,
) => {
    const RowRenderer: FC<DataTableRowProps & { rowId: DataTableRowProps['rowId'] | undefined }> =
        memo(props => {
            const { View } = useMolecules();
            const isLoaded = useDataTable(store => !!store.hasRowLoaded(props.index));

            if (!isLoaded) return <View style={styles.placeHolderRow} />;

            return <Component {...props} />;
        });

    RowRenderer.displayName = (Component.displayName ?? '') + 'WithPlaceholder';
    return memo(RowRenderer);
};

const styles = StyleSheet.create({
    placeHolderRow: {
        borderBottomWidth: 1,
        borderBottomColor: 'colors.outlineVariant',
    },
});
