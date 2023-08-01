import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';

export const dragAndExtendKey = 'drag-and-extend';

export const [useDragAndExtendPlugin, useDragAndExtendEvents] = createPlugin({
    key: dragAndExtendKey,
    eventKeys: [
        PluginEvents.BEFORE_DRAG_AND_EXTEND,
        PluginEvents.ON_DRAG_AND_EXTEND,
        PluginEvents.AFTER_DRAG_AND_EXTEND,
    ],
});
