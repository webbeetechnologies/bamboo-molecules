import {
    DataTableProps,
    RenderCellProps,
    RenderHeaderCellProps,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { useMemo, useRef } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { StyleSheet } from 'react-native';
import ColumnHeaderRenderer from './ColumnHeaderRenderer';
import CellRenderer from './CellRenderer';
import { FieldTypes as DefaultFieldTypes } from '../../field-types';

import { FieldsProvider, FieldTypesProvider, RecordsProvider, FieldConfigs } from '../../contexts';
import type { FieldTypes } from '../../types';
import { typedMemo } from '../../hocs';
// import { ADD_FIELD_COL_ID, SELECTION_COL_ID } from './utils';

// optimize table rendering
const getItemLayout = (_: any, index: number) => ({
    length: 40,
    offset: 40 * index,
    index,
});

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderRenderer {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type Props<F, R> = Omit<
    DataTableProps,
    'title' | 'records' | 'renderHeader' | 'renderCell' | 'columns'
> &
    ViewProps & {
        onEndReached?: () => void;
        fields: F[];
        fieldsConfigs?: FieldConfigs;
        fieldTypes?: FieldTypes;
        records: R[];
        extractColumnId?: (field: F) => string;
        extractRecordId?: (record: R) => string;
    };

const defaultExtractColumnId = <F,>(field: F) => String(field);
const defaultExtractRecordId = <R,>(record: R) => String(record);

const Table = <F, R>({
    onEndReached,
    fields,
    fieldsConfigs,
    fieldTypes = DefaultFieldTypes as FieldTypes,
    records,
    rowSize: rowHeight = 'sm',
    extractColumnId = defaultExtractColumnId,
    extractRecordId = defaultExtractRecordId,
}: Props<F, R>) => {
    const { DataTable } = useMolecules();

    const ref = useRef(null);

    const verticalScrollProps = useMemo(
        () =>
            ({
                onEndReached,
                onEndReachedThreshold: 2,
                maxToRenderPerBatch: 25,
                updateCellsBatchingPeriod: 20,
                removeClippedSubviews: true,
                getItemLayout,
                windowSize: 11,
                // style: { width: '100%' },
                // ListFooterComponent: TableFooter,
            } as DataTableProps['verticalScrollProps']),
        [onEndReached],
    );

    const columnIds = useMemo(() => fields.map(extractColumnId), [extractColumnId, fields]);

    const recordIds = useMemo(() => records.map(extractRecordId), [extractRecordId, records]);

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

    // const cells = columnIds.map(cell => <View key={cell}>{cell}</View>);

    // const batched = useState([]);

    // useEffect(() => {
    //   setTimeout
    // }, []);

    return (
        <FieldTypesProvider value={fieldTypes}>
            <FieldsProvider fields={fields as any} fieldsConfigs={fieldsConfigs}>
                <RecordsProvider records={records}>
                    <DataTable
                        ref={ref}
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

                    {/*<ScrollView horizontal>*/}
                    {/*    <ScrollView>*/}
                    {/*        {recordIds.map(record => (*/}
                    {/*            <View key={record} style={{ flexDirection: 'row' }}>*/}
                    {/*                <Text>{record}</Text>*/}
                    {/*                {cells}*/}
                    {/*            </View>*/}
                    {/*        ))}*/}
                    {/*    </ScrollView>*/}
                    {/*</ScrollView>*/}
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

export default typedMemo(Table);
