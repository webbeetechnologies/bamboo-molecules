import { StyleSheet } from 'react-native';
import type { DataTableRowProps } from '../types';
import { ComponentType, RefAttributes, forwardRef, memo, useMemo } from 'react';
import { useMolecules } from '../../../hooks';
import { useDataTable } from '../DataTableContext';

export const withRowLoadingPlaceholder = (
    Component: ComponentType<DataTableRowProps & RefAttributes<any>>,
) => {
    const RowRenderer = forwardRef<any, DataTableRowProps>((props, ref: any) => {
        const { View } = useMolecules();
        const isLoaded = useDataTable(store => !!store.hasRowLoaded(props.index));

        const placeHolderRowStyle = useMemo(
            () => [styles.placeHolderRow, props.style],
            [props.style],
        );

        if (!isLoaded) return <View style={placeHolderRowStyle} ref={ref} />;

        return <Component {...props} ref={ref} />;
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
