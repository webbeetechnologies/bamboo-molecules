import { registerComponent } from '@bambooapp/bamboo-atoms';
import type { ComponentType } from 'react';
import DataGrid, { Props as DataGridProps } from './DataGrid';

export * from './types';
export { default as DataGrid, Props as DataGridProps, ContextMenuProps } from './DataGrid';
export * from './components';
export { FieldTypes } from './field-types';
export * from './contexts';
export * as dataGridStyles from './components/styles';

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
