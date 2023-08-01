import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';

export const [useSelectionPlugin, useSelectionEvents] = createPlugin({
    key: 'selection',
    eventKeys: [
        PluginEvents.BEFORE_CELL_SELECTION,
        PluginEvents.ON_CELL_SELECTION,
        PluginEvents.AFTER_CELL_SELECTION,
    ],
});
