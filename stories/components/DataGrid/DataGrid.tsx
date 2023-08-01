import { memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Toast, useMolecules, useToggle } from '@bambooapp/bamboo-molecules';

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
import { useColumnResizePlugin, useCopyPastePlugin } from '../../../src/datagrid/plugins';

export const Example = () => {
    const { View, ToastContainer } = useMolecules();

    const { state: isOpen, handleOpen, handleClose } = useToggle();

    const containerStyle = useMemo(() => ({ width: '100%' }), []);
    const [columnWidth, setColumnWidth] = useState({});

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

    const columnResizePlugin = useColumnResizePlugin({
        onColumnResize: ({ columnId, width }) => {
            setColumnWidth(prev => ({
                ...prev,
                [columnId]: width,
            }));
        },
    });

    const copyPastePlugin = useCopyPastePlugin({
        onCopyCell: args => {
            Toast.show({
                text1: 'Cell copied',
                position: 'bottom',
            });
            // eslint-disable-next-line no-console
            console.log({ copyArgs: args });
        },
        onPasteCell: args => {
            Toast.show({
                text1: 'Pasted cell',
                position: 'bottom',
            });
            // eslint-disable-next-line no-console
            console.log({ pasteArgs: args });
        },
    });

    const plugins = useMemo(
        () => [columnResizePlugin, copyPastePlugin],
        [columnResizePlugin, copyPastePlugin],
    );

    return (
        <FieldsProvider fields={fields}>
            <RecordsProvider records={records}>
                <View style={containerStyle}>
                    <DataGrid
                        plugins={plugins}
                        columnWidths={columnWidth}
                        rowIds={rowIds}
                        columnIds={columnIds}
                        contextMenuProps={contextMenuProps}
                        useField={useField}
                        useCellValue={useCellValue}
                    />
                </View>
                <ToastContainer />
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
