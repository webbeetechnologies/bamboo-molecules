import { FC, memo, useMemo, useState } from 'react';
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
} from './mocks';
import {
    useColumnResizePlugin,
    useCopyPastePlugin,
    useExpandCollapseGroupsPlugin,
    useDragAndExtendPlugin,
} from '../../../src/datagrid/plugins';

const containerStyle = { width: '100%' };

export const Example: FC<{ groups?: string[] }> = () => {
    const { View, DataGrid, ToastContainer } = useMolecules();

    const { state: isOpen, handleOpen, handleClose } = useToggle();

    const { columnIds } = useMemo(
        () => ({
            columnIds: fields.map(field => field.id),
        }),
        [],
    );

    const [columnWidth, setColumnWidth] = useState({});

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
    const expandCollapsePlugin = useExpandCollapseGroupsPlugin({
        onGroupExpand: args => {
            // eslint-disable-next-line no-console
            console.log({ expandCollapse: args });
        },
        onGroupCollapse: args => {
            // eslint-disable-next-line no-console
            console.log({ expandCollapse: args });
        },
    });

    const plugins = useMemo(
        () => [columnResizePlugin, copyPastePlugin, dragAndExtendPlugin, expandCollapsePlugin],
        [columnResizePlugin, copyPastePlugin, dragAndExtendPlugin, expandCollapsePlugin],
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

    const expandCollapsePlugin = useExpandCollapseGroupsPlugin({
        onGroupExpand: args => {
            // eslint-disable-next-line no-console
            console.log({ expandCollapse: args });
        },
        onGroupCollapse: args => {
            // eslint-disable-next-line no-console
            console.log({ expandCollapse: args });
        },
    });

    const dragAndExtendPlugin = useDragAndExtendPlugin({
        onDragAndExtend: args => {
            // eslint-disable-next-line no-console
            console.log({ dragAndExtend: args });
        },
    });

    const plugins = useMemo(
        () => [expandCollapsePlugin, dragAndExtendPlugin],
        [dragAndExtendPlugin, expandCollapsePlugin],
    );

    return (
        <FieldsProvider fields={virtualizationMockFields}>
            <RecordsProvider records={virtaulizationMockRecords}>
                <View style={virtualizedContainerStyle}>
                    <DataGrid
                        plugins={plugins}
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

const styles = StyleSheet.create({
    menuItem: {
        width: 150,
    },
});
