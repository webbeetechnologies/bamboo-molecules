import { registerMolecule } from '@bambooapp/bamboo-molecules';
import { GroupHeaderRenderer } from './GroupHeaderRenderer';
import { GroupFooterRenderer } from './GroupFooterRenderer';
import type { GroupMetaRowProps } from '../../types';
import type { ComponentType } from 'react';

export { default as ContextMenu, Props as ContextMenuProps } from './ContextMenu';
export { default as CellRenderer, Props as CellRendererProps } from './CellRenderer';
export { default as ColumnHeaderCell, ColumnHeaderCellProps } from './ColumnHeaderCell';
export { GroupHeaderRow, GroupHeaderRenderer } from './GroupHeaderRenderer';
export { GroupFooterRow, GroupFooterRenderer } from './GroupFooterRenderer';

registerMolecule('GroupHeaderRenderer', {
    Component: GroupHeaderRenderer,
    defaultStyles: {},
});

registerMolecule('GroupFooterRenderer', {
    Component: GroupFooterRenderer,
    defaultStyles: {},
});

declare global {
    namespace BambooMolecules {
        interface Components {
            GroupHeaderRenderer: ComponentType<GroupMetaRowProps>;
            GroupFooterRenderer: ComponentType<GroupMetaRowProps>;
        }
    }
}
