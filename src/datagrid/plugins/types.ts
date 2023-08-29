import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules';
import type { RefObject } from 'react';

import type { PluginHandle } from './createPlugin';

export type CellIndices = {
    rowIndex: number;
    columnIndex: number;
};

export type Cell = CellIndices & {
    rowId: TDataTableRow;
    columnId: TDataTableColumn;
};

export type SelectionIndices = {
    start: CellIndices;
    end: CellIndices;
};

export type Selection = {
    start: Cell;
    end: Cell;
};

export type TableSelection = SelectionIndices & {
    recordIds: TDataTableRow[];
    columnIds: TDataTableColumn[];
};

export enum PluginEvents {
    BEFORE_COPY_CELL = 'beforeCopyCell',
    ON_COPY_CELL = 'onCopyCell',
    AFTER_COPY_CELL = 'afterCopyCell',

    BEFORE_PASTE_CELL = 'beforePasteCell',
    ON_PASTE_CELL = 'onPasteCell',
    AFTER_PASTE_CELL = 'afterPasteCell',

    BEFORE_CELL_SELECTION = 'beforeCellSelection',
    ON_CELL_SELECTION = 'onCellSelection',
    AFTER_CELL_SELECTION = 'afterCellSelection',

    BEFORE_COLUMN_RESIZE = 'beforeColumnResize',
    ON_COLUMN_RESIZE = 'onColumnResize',
    AFTER_COLUMN_RESIZE = 'afterColumnResize',

    BEFORE_DRAG_AND_EXTEND = 'beforeDragAndExtend',
    ON_DRAG_AND_EXTEND = 'onDragAndExtend',
    AFTER_DRAG_AND_EXTEND = 'afterDragAndExtend',

    BEFORE_GROUP_COLLAPSE = 'beforeGroupCollapse',
    ON_GROUP_COLLAPSE = 'onGroupCollapse',
    AFTER_GROUP_COLLAPSE = 'afterGroupCollapse',
    BEFORE_GROUP_EXPAND = 'beforeGroupExpand',
    ON_GROUP_EXPAND = 'onGroupExpand',
    AFTER_GROUP_EXPAND = 'afterGroupExpand',
}

export type PluginManagerEvents = {
    [PluginEvents.BEFORE_COLUMN_RESIZE]: (args: { columnId: string; columnIndex: number }) => void;
    [PluginEvents.ON_COLUMN_RESIZE]: (args: {
        columnId: string;
        columnIndex: number;
        width: number;
    }) => void;
    [PluginEvents.AFTER_COLUMN_RESIZE]: (args: {
        columnId: string;
        columnIndex: number;
        width: number;
    }) => void;

    [PluginEvents.BEFORE_COPY_CELL]: (args: { selection: Selection }) => void | boolean;
    [PluginEvents.ON_COPY_CELL]: (args: { selection: Selection }) => void;
    [PluginEvents.AFTER_COPY_CELL]: () => void;

    [PluginEvents.BEFORE_PASTE_CELL]: (args: {
        selection: Selection;
        target: Selection;
    }) => void | boolean;
    [PluginEvents.ON_PASTE_CELL]: (args: { selection: Selection }) => void;
    [PluginEvents.AFTER_PASTE_CELL]: () => void;

    [PluginEvents.BEFORE_CELL_SELECTION]: (args: { selection: Selection }) => void | boolean;
    [PluginEvents.ON_CELL_SELECTION]: (args: { selection: Selection }) => void;
    [PluginEvents.AFTER_CELL_SELECTION]: () => void;

    [PluginEvents.BEFORE_DRAG_AND_EXTEND]: (args: { selection: Selection }) => void | boolean;
    [PluginEvents.ON_DRAG_AND_EXTEND]: (args: { selection: Selection; target: Selection }) => void;
    [PluginEvents.AFTER_DRAG_AND_EXTEND]: () => void;

    [PluginEvents.BEFORE_GROUP_COLLAPSE]: (args: {
        groupId: string;
        collapsedGroupIds: string[];
    }) => void | boolean;
    [PluginEvents.ON_GROUP_COLLAPSE]: (args: { collapsedGroupIds: string[] }) => void;
    [PluginEvents.AFTER_GROUP_COLLAPSE]: () => void;
    [PluginEvents.BEFORE_GROUP_EXPAND]: (args: {
        groupId: string;
        collapsedGroupIds: string[];
    }) => void | boolean;
    [PluginEvents.ON_GROUP_EXPAND]: (args: { collapsedGroupIds: string[] }) => void;
    [PluginEvents.AFTER_GROUP_EXPAND]: () => void;
};

export type Plugin = RefObject<PluginHandle<any>>;
