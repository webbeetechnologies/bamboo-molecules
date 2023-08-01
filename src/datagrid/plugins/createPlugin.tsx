import { useMemo, useRef } from 'react';
import { usePluginsManagerStoreRef } from './plugins-manager';
import type { PluginManagerEvents } from './types';

type PluginMangerEventsKeys = keyof PluginManagerEvents;

export type PluginHandle<E extends PluginMangerEventsKeys> = {
    key: string;
    init?: (...args: any) => any;
    events: Record<E, ((...args: any) => any) | null>;
    destroy?: (...args: any) => any;
};

const useVoid = () => () => {};

export const createPlugin = <K extends PluginMangerEventsKeys>({
    key,
    useInit = useVoid,
    eventKeys,
    useDestroy = useVoid,
}: {
    key: string;
    useInit?: () => (...args: any) => any;
    eventKeys: K[];
    useDestroy?: () => (...args: any) => any;
}) => {
    const usePlugin = <E extends Record<K, ((...args: any) => any) | null>>(args: Partial<E>) => {
        const init = useInit();

        const events = useMemo(
            () =>
                eventKeys.reduce((acc, event) => {
                    // @ts-ignore
                    acc[event] = args?.[event as K] || null;

                    return acc;
                }, {} as E),
            [args],
        );

        const destroy = useDestroy();

        const ref = useRef<PluginHandle<K>>({
            key,
            init,
            events,
            destroy,
        });

        return ref as { current: PluginHandle<K> };
    };

    const usePluginEvents = () => {
        const { store } = usePluginsManagerStoreRef();

        return eventKeys.reduce((acc, eventKey) => {
            acc[eventKey] = store.current.events[eventKey];

            return acc;
        }, {} as Record<K, (...args: any) => any>);
    };

    return [usePlugin, usePluginEvents] as [typeof usePlugin, typeof usePluginEvents];
};
