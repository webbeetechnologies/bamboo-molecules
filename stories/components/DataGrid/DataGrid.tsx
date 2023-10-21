import { FC, memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Toast, useLatest, useMolecules, useToggle } from '@bambooapp/bamboo-molecules';

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
    useCellFocusPlugin,
} from '../../../src/datagrid/plugins';
import type { DataGridProps, GroupedDataTruthy, RecordWithId } from '../../../src/datagrid';

const containerStyle = { width: '100%' };

const prepareGroupedData = (data: RecordWithId[]) =>
    data.map((record, i) => ({
        groupConstants: [],
        level: 0,
        groupId: '',
        id: record.id,
        isCollapsed: false,
        index: i,
        indexInGroup: i,
        realIndex: i,
        rowType: 'data' as const,
    }));

const useDataGridProps = (
    data: RecordWithId[],
): Pick<DataGridProps, 'records' | 'getRowId' | 'hasRowLoaded' | 'useGetRowId'> => {
    const latestRecordsRef = useLatest(prepareGroupedData(data));
    return {
        records: latestRecordsRef.current,
        getRowId: useCallback<DataGridProps['getRowId']>(
            (row: Omit<GroupedDataTruthy, 'id'>) => latestRecordsRef.current[row.index]!.id,
            [latestRecordsRef],
        ),
        hasRowLoaded: useCallback(() => true, []),
        useGetRowId: record => record.id ?? null,
    };
};

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

    const cellFocusPlugin = useCellFocusPlugin({
        onFocusCell: args => {
            // eslint-disable-next-line no-console
            console.log({ cellFocus: args });
        },
        onUnFocusCell: args => {
            // eslint-disable-next-line no-console
            console.log({ unFocusCell: args });
        },
    });

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
        () => [
            columnResizePlugin,
            copyPastePlugin,
            dragAndExtendPlugin,
            expandCollapsePlugin,
            cellFocusPlugin,
        ],
        [
            columnResizePlugin,
            copyPastePlugin,
            dragAndExtendPlugin,
            expandCollapsePlugin,
            cellFocusPlugin,
        ],
    );

    return (
        <FieldsProvider fields={fields}>
            <RecordsProvider records={records}>
                <View style={containerStyle}>
                    <DataGrid
                        plugins={plugins}
                        columnWidths={columnWidth}
                        columnIds={columnIds}
                        contextMenuProps={contextMenuProps}
                        useField={useField}
                        useCellValue={useCellValue}
                        getRowSize={() => 40}
                        {...useDataGridProps(records)}
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
                        columnIds={columnIds}
                        useField={useField}
                        useCellValue={useCellValue}
                        getRowSize={() => 40}
                        {...useDataGridProps(records)}
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
