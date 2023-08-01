import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';

export const columnResizePluginKey = 'column-resize';

export const [useColumnResizePlugin, useColumnResizeEvents] = createPlugin({
    key: columnResizePluginKey,
    eventKeys: [
        PluginEvents.BEFORE_COLUMN_RESIZE,
        PluginEvents.ON_COLUMN_RESIZE,
        PluginEvents.AFTER_COLUMN_RESIZE,
    ],
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
