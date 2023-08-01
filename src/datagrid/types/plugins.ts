import type { PluginHandle } from '../plugins/createPlugin';
import type { RefObject } from 'react';

export type Plugin = RefObject<PluginHandle<any>>;
