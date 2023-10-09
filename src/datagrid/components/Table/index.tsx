import type { ComponentType } from 'react';
import { registerMolecule } from '@bambooapp/bamboo-molecules';

import { GroupHeaderRenderer } from './GroupHeaderRenderer';
import { GroupFooterRenderer } from './GroupFooterRenderer';
import type { GroupMetaRowProps } from '../../types';

export { default as ContextMenu, Props as ContextMenuProps } from './ContextMenu';
export { default as CellRenderer, Props as CellRendererProps } from './CellRenderer';
export { default as ColumnHeaderCell, ColumnHeaderCellProps } from './ColumnHeaderCell';
export { TableRow, Props as TableRowProps } from './RowRenderer';
export { TableHeaderRow } from './HeaderRowRenderer';
export { GroupHeaderRow, GroupHeaderRenderer } from './GroupHeaderRenderer';
export { GroupFooterRow, GroupFooterRenderer } from './GroupFooterRenderer';
export { default as CellWrapperComponent } from './CellWrapper';
export { default as RowWrapperComponent } from './RowWrapper';

registerMolecule('GroupHeaderRenderer', {
    Component: GroupHeaderRenderer,
});

registerMolecule('GroupFooterRenderer', {
    Component: GroupFooterRenderer,
});

declare global {
    namespace BambooMolecules {
        interface Components {
            GroupHeaderRenderer: ComponentType<GroupMetaRowProps>;
            GroupFooterRenderer: ComponentType<GroupMetaRowProps>;
        }
    }
}
