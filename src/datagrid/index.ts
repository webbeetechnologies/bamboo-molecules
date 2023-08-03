import { registerComponent } from '@bambooapp/bamboo-atoms';
import type { ComponentType } from 'react';
import DataGrid, { Props as DataGridProps } from './DataGrid';

export * from './types';
export { default as DataGrid, Props as DataGridProps, ContextMenuProps } from './DataGrid';
export * from './components';
export { FieldTypes } from './field-types';
export * from './contexts';
export * as dataGridStyles from './components/styles';

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
    Selection,
    PluginHandle,
    usePluginsDataStoreRef,
    usePluginsManagerSelector,
    usePluginsManagerStoreRef,
    createPlugin,
    usePluginsDataSelector,
    usePluginsDataValueSelectorValue,
    usePluginsManagerValueSelector,
} from './plugins';

registerComponent('DataGrid', {
    Component: DataGrid,
    defaultStyles: {
        DataGrid: {},
    },
});

declare global {
    namespace BambooMolecules {
        interface Components {
            DataGrid: ComponentType<DataGridProps>;
        }
    }
}
