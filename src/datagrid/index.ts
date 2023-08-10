import DataGrid, { Props as DataGridProps } from './DataGrid';
import { ViewRenderer, ViewRendererProps } from './components';
import type { ComponentType } from 'react';
import * as dataGridStyles from './components/styles';
import { registerMolecule } from '@bambooapp/bamboo-molecules';

export * from './types';
export { default as DataGrid, Props as DataGridProps, ContextMenuProps } from './DataGrid';
export * from './components';
export { FieldTypes } from './field-types';
export * from './contexts';

export {
    useCopyPastePlugin,
    useCellSelectionPlugin,
    useColumnResizePlugin,
    useDragAndExtendPlugin,
    DRAG_AND_EXTEND_PLUGIN_KEY,
    COLUMN_RESIZE_PLUGIN_KEY,
    CELL_SELECTION_PLUGIN_KEY,
    COPY_PASTE_PLUGIN_KEY,
    PluginEvents,
    SelectionIndexes,
    PluginHandle,
    usePluginsDataStoreRef,
    usePluginsManagerSelector,
    usePluginsManagerStoreRef,
    createPlugin,
    usePluginsDataSelector,
    usePluginsDataValueSelectorValue,
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
