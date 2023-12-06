import type { ComponentType } from 'react';
import { registerMolecule } from '@bambooapp/bamboo-molecules';
import DataGrid, { Props as DataGridProps } from './DataGrid';
import { ViewRenderer, ViewRendererProps } from './components';
import * as dataGridStyles from './components/styles';

export * from './types';
export { default as DataGrid, Props as DataGridProps, ContextMenuProps } from './DataGrid';
export * from './components';
export { FieldTypes } from './field-types';
export * from './contexts';

export {
    handleEmitKeyboardEvent,
    GroupRecord,
    GroupFooter,
    GroupHeader,
    GroupMetaRow,
    GroupMeta,
    GroupConstantValues,
    getRecordByIndex,
    RowType,
    GroupedData,
    GroupedDataTruthy,
    RecordWithId,
    isDataRow,
    isGroupHeader,
    isNestedGroupHeader,
    isGroupFooter,
    DATAGRID_DEFAULT_GROUP,
} from './utils';

export {
    useCopyPastePlugin,
    useCellSelectionPlugin,
    useColumnResizePlugin,
    useDragAndExtendPlugin,
    useExpandCollapseGroupsPlugin,
    useCellFocusPlugin,
    useCellFocusMethods,
    useCellSelectionMethods,
    useColumnResizeMethods,
    useDragAndExtendMethods,
    useExpandCollapseGroupsMethods,
    DRAG_AND_EXTEND_PLUGIN_KEY,
    COLUMN_RESIZE_PLUGIN_KEY,
    CELL_SELECTION_PLUGIN_KEY,
    COPY_PASTE_PLUGIN_KEY,
    EXPAND_COLLAPSE_GROUPS_KEY,
    CELL_FOCUS_PLUGIN_KEY,
    PluginEvents,
    SelectionIndices,
    PluginHandle,
    usePluginsDataStoreRef,
    usePluginsManagerSelector,
    usePluginsManagerStoreRef,
    createPlugin,
    usePluginsDataSelector,
    usePluginsDataValueSelector,
    usePluginsManagerValueSelector,
} from './plugins';

registerMolecule('DataGrid', {
    Component: DataGrid,
    defaultStyles: dataGridStyles,
});

registerMolecule('DataGrid_ViewRenderer', {
    Component: ViewRenderer,
});

declare global {
    namespace BambooMolecules {
        interface Components {
            DataGrid: ComponentType<DataGridProps>;
            DataGrid_ViewRenderer: ComponentType<ViewRendererProps>;
        }
    }
}
