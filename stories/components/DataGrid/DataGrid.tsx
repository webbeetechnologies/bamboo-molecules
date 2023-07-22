import { memo, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useMolecules, useToggle } from '@bambooapp/bamboo-molecules';

import { DataGrid } from '../../../src/datagrid';
import {
    fields,
    records,
    virtaulizationMockRecords,
    virtualizationMockFields,
    useField,
    FieldsProvider,
    useCellValue,
    RecordsProvider,
} from './mocks';

export const Example = () => {
    const { View } = useMolecules();
    const dimensions = useWindowDimensions();

    const { state: isOpen, handleOpen, handleClose } = useToggle();

    const containerStyle = useMemo(() => ({ width: dimensions.width }), [dimensions.width]);

    const { rowIds, columnIds } = useMemo(
        () => ({
            rowIds: records.map(record => `${record.id}`),
            columnIds: fields.map(field => field.id),
        }),
        [],
    );

    const contextMenuProps = useMemo(
        () => ({
            isOpen,
            onClose: handleClose,
            handleContextMenuOpen: ({ type }: { type: string }) => {
                // preventing the context menu from opening if it's the columns
                if (type !== 'cell') return;

                handleOpen();
            },
            children: <ContextMenuItems onCloseMenu={handleClose} />,
        }),
        [handleClose, handleOpen, isOpen],
    );

    return (
        <FieldsProvider fields={fields}>
            <RecordsProvider records={records}>
                <View style={containerStyle}>
                    <DataGrid
                        rowIds={rowIds}
                        columnIds={columnIds}
                        contextMenuProps={contextMenuProps}
                        useField={useField}
                        useCellValue={useCellValue}
                    />
                </View>
            </RecordsProvider>
        </FieldsProvider>
    );
};

const ContextMenuItems = memo(({ onCloseMenu }: { onCloseMenu: () => void }) => {
    const { Menu } = useMolecules();

    return (
        <>
            <Menu.Item style={styles.menuItem} size="dense" onPress={onCloseMenu}>
                Item 1
            </Menu.Item>
            <Menu.Item style={styles.menuItem} size="dense" onPress={onCloseMenu}>
                Item 2
            </Menu.Item>
            <Menu.Item style={styles.menuItem} size="dense" onPress={onCloseMenu}>
                Item 3
            </Menu.Item>
        </>
    );
});

export const ExampleHorizontalVirtualization = () => {
    const { View } = useMolecules();

    const containerStyle = useMemo(() => ({ width: 500, height: 500 }), []);

    const { rowIds, columnIds } = useMemo(
        () => ({
            rowIds: virtaulizationMockRecords.map(record => `${record.id}`),
            columnIds: virtualizationMockFields.map(field => field.id),
        }),
        [],
    );

    return (
        <FieldsProvider fields={virtualizationMockFields}>
            <RecordsProvider records={virtaulizationMockRecords}>
                <View style={containerStyle}>
                    <DataGrid
                        rowIds={rowIds}
                        columnIds={columnIds}
                        useField={useField}
                        useCellValue={useCellValue}
                    />
                </View>
            </RecordsProvider>
        </FieldsProvider>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        width: 150,
    },
});
