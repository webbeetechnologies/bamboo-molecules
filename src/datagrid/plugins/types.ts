export type Selection = {
    rowId: string;
    columnId: string;
    rowIndex: number;
    columnIndex: number;
}[];

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
}

export type PluginManagerEvents = {
    [PluginEvents.BEFORE_COLUMN_RESIZE]: () => void;
    [PluginEvents.ON_COLUMN_RESIZE]: (args: {
        columnId: string;
        columnIndex: number;
        width: number;
    }) => void;
    [PluginEvents.AFTER_COLUMN_RESIZE]: () => void;

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

    [PluginEvents.BEFORE_DRAG_AND_EXTEND]: (args: { target: Selection }) => void | boolean;
    [PluginEvents.ON_DRAG_AND_EXTEND]: (args: { target: Selection; selection: Selection }) => void;
    [PluginEvents.AFTER_DRAG_AND_EXTEND]: () => void;
};
