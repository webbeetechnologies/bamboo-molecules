import {
    DataTableProps,
    RenderCellProps,
    RenderHeaderCellProps,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { memo, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { StyleSheet } from 'react-native';
import ColumnHeaderRenderer from './ColumnHeaderRenderer';
import CellRenderer from './CellRenderer';
import { FieldTypes as DefaultFieldTypes } from '../../field-types';

import { FieldsProvider, FieldTypesProvider, RecordsProvider, FieldConfigs } from '../../contexts';
import type { Field, FieldTypes } from '../../types';
// import { ADD_FIELD_COL_ID, SELECTION_COL_ID } from './utils';

// optimize table rendering
const getItemLayout = (_: any, index: number) => ({
    length: 40,
    offset: 40 * index,
    index,
});

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderRenderer {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type Props = Omit<DataTableProps, 'title' | 'records' | 'renderHeader' | 'renderCell' | 'columns'> &
    ViewProps & {
        onEndReached?: () => void;
        fields: Field[];
        fieldsConfigs?: FieldConfigs;
        fieldTypes?: FieldTypes;
        records: Record<string, any>[];
    };

const Table = ({
    onEndReached,
    fields,
    fieldsConfigs,
    fieldTypes = DefaultFieldTypes as FieldTypes,
    records,
    rowSize: rowHeight,
}: Props) => {
    const { DataTable } = useMolecules();

    const verticalScrollProps = useMemo(
        () =>
            ({
                onEndReached,
                onEndReachedThreshold: 2,
                maxToRenderPerBatch: 25,
                updateCellsBatchingPeriod: 20,
                removeClippedSubviews: true,
                getItemLayout,
                windowSize: 21,
                style: { width: '100%' },
                // ListFooterComponent: TableFooter,
            } as DataTableProps['verticalScrollProps']),
        [onEndReached],
    );

    const columnIds = useMemo(() => fields.map(field => field.id), [fields]);

    const recordIds = useMemo(() => records.map(record => record.id), [records]);

    // Append selection column to the fields
    // const columns = useMemo(() => [...columnIds], [columnIds]);

    const cellProps = useMemo(
        () => ({
            style: styles.cell,
        }),
        [],
    );

    const rowProps = useMemo(
        () => ({
            style: styles.row,
        }),
        [],
    );

    return (
        <FieldTypesProvider value={fieldTypes}>
            <FieldsProvider fields={fields} fieldsConfigs={fieldsConfigs}>
                <RecordsProvider records={records}>
                    <DataTable
                        // defaultColumnWidth="unset"
                        testID="datagrid"
                        rowSize={rowHeight}
                        style={styles.table}
                        columns={columnIds}
                        records={recordIds}
                        renderHeader={renderHeader}
                        headerCellProps={cellProps}
                        headerRowProps={rowProps}
                        cellProps={cellProps}
                        rowProps={rowProps}
                        renderCell={renderCell}
                        verticalScrollProps={verticalScrollProps}
                        horizontalScrollProps={horizontalScrollProps}
                    />
                </RecordsProvider>
            </FieldsProvider>
        </FieldTypesProvider>
    );
};

const horizontalScrollProps = { contentContainerStyle: { flexGrow: 1 } };

const styles = StyleSheet.create({
    cell: {
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'colors.outlineVariant',
    },
    table: {},
    row: {
        padding: 0,
    },
});

export default memo(Table);
