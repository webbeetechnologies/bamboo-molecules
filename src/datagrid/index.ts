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

registerMolecule('DataGrid', {
    Component: DataGrid,
    defaultStyles: dataGridStyles,
});

registerMolecule('DataGrid_ViewRenderer', {
    Component: ViewRenderer,
    defaultStyles: {},
});

declare global {
    namespace BambooMolecules {
        interface Components {
            DataGrid: ComponentType<DataGridProps>;
            DataGrid_ViewRenderer: ComponentType<ViewRendererProps>;
        }
    }
}
