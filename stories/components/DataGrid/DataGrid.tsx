import { memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Toast, useMolecules, useToggle } from '@bambooapp/bamboo-molecules';

import '../../../src/datagrid';
import {
    fields,
    records,
    virtaulizationMockRecords,
    virtualizationMockFields,
    useField,
    FieldsProvider,
    useCellValue,
    RecordsProvider,
    groups,
} from './mocks';
import { useColumnResizePlugin, useCopyPastePlugin } from '../../../src/datagrid/plugins';
import { useDragAndExtendPlugin } from '../../../src/datagrid/plugins/drag-and-extend';

const containerStyle = { width: '100%' };

export const Example = () => {
    const { View, DataGrid, ToastContainer } = useMolecules();

    const { state: isOpen, handleOpen, handleClose } = useToggle();

    const [columnWidth, setColumnWidth] = useState({});

    const { columnIds } = useMemo(
        () => ({
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

    const dragAndExtendPlugin = useDragAndExtendPlugin({
        onDragAndExtend: args => {
            // eslint-disable-next-line no-console
            console.log({ dragAndExtend: args });
        },
    });

    const plugins = useMemo(
        () => [columnResizePlugin, copyPastePlugin, dragAndExtendPlugin],
        [columnResizePlugin, copyPastePlugin, dragAndExtendPlugin],
    );

    return (
        <FieldsProvider fields={fields}>
            <RecordsProvider records={records}>
                <View style={containerStyle}>
                    <DataGrid
                        plugins={plugins}
                        columnWidths={columnWidth}
                        records={records}
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

export const ExampleHorizontalVirtualization = (props: { groups?: string[] }) => {
    const { View, DataGrid } = useMolecules();

    const virtualizedContainerStyle = useMemo(() => ({ ...containerStyle, height: 500 }), []);

    const { columnIds } = useMemo(
        () => ({
            columnIds: virtualizationMockFields.map(field => field.id),
        }),
        [],
    );

    return (
        <FieldsProvider fields={virtualizationMockFields}>
            <RecordsProvider records={virtaulizationMockRecords}>
                <View style={virtualizedContainerStyle}>
                    <DataGrid
                        groups={props.groups}
                        records={virtaulizationMockRecords}
                        columnIds={columnIds}
                        useField={useField}
                        useCellValue={useCellValue}
                    />
                </View>
            </RecordsProvider>
        </FieldsProvider>
    );
};

export const ExampleHorizontalVirtualizationWithGroups = () => (
    <ExampleHorizontalVirtualization groups={groups} />
);

const styles = StyleSheet.create({
    menuItem: {
        width: 150,
    },
});
