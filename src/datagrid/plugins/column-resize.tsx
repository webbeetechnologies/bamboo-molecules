import type { TDataTableColumn } from '@bambooapp/bamboo-molecules';

import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';
import { usePluginsDataValueSelectorValue } from './plugins-manager';

export const COLUMN_RESIZE_PLUGIN_KEY = 'column-resize';

const useIsColumnResizing = (column: TDataTableColumn) => {
    return usePluginsDataValueSelectorValue(store => {
        return store[COLUMN_RESIZE_PLUGIN_KEY]?.resizingColumn === column;
    });
};

export const [useColumnResizePlugin, useColumnResizeEvents, useColumnResizeMethods] = createPlugin({
    key: COLUMN_RESIZE_PLUGIN_KEY,
    eventKeys: [
        PluginEvents.BEFORE_COLUMN_RESIZE,
        PluginEvents.ON_COLUMN_RESIZE,
        PluginEvents.AFTER_COLUMN_RESIZE,
    ],
    methods: {
        useIsColumnResizing,
    },
});

// export const useColumnResize = (
//     selector: (columnResize: Record<string, number | undefined>) => any,
// ) => {
//     const [value, setStore] = usePluginsManagerSelector(store =>
//         selector(store['column-resize'] || {}),
//     );
//     const setColumnWidth = useCallback(
//         ({ columnId, width }: { columnId: string; width: number }) => {
//             console.log({ columnId, width });
//             setStore(prev => ({
//                 'column-resize': {
//                     ...prev['column-resize'],
//                     [columnId]: width,
//                 },
//             }));
//         },
//         [setStore],
//     );
//
//     return [value, setColumnWidth];
// };
