import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';

export const COPY_PASTE_PLUGIN_KEY = 'copy-paste';

export const [useCopyPastePlugin, useCopyPasteEvents] = createPlugin({
    key: COPY_PASTE_PLUGIN_KEY,
    eventKeys: [
        PluginEvents.BEFORE_COPY_CELL,
        PluginEvents.ON_COPY_CELL,
        PluginEvents.AFTER_COPY_CELL,
        PluginEvents.BEFORE_PASTE_CELL,
        PluginEvents.ON_PASTE_CELL,
        PluginEvents.AFTER_PASTE_CELL,
    ],
});
