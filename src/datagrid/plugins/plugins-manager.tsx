import { ComponentType, memo, ReactNode, useEffect, useMemo } from 'react';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { Plugin } from '../types/plugins';
import { PluginManagerEvents, PluginEvents } from './types';
import type { Methods } from './createPlugin';

export type PluginsManagerContextType = {
    plugins: Plugin[];
    pluginsMap: Record<string, Plugin>;

    events: PluginManagerEvents;
    methods: Record<string, Methods>;

    [key: string]: any;
};

export const {
    Provider: PluginsManagerContextProvider,
    useContext: usePluginsManagerSelector,
    useContextValue: usePluginsManagerValueSelector,
    useStoreRef,
} = createFastContext<PluginsManagerContextType>();

export const {
    Provider: PluginsDataContextProvider,
    useContext: usePluginsDataSelector,
    useContextValue: usePluginsDataValueSelectorValue,
    useStoreRef: usePluginsDataStoreRef,
} = createFastContext<Record<string, any>>();

export type Props = {
    plugins?: PluginsManagerContextType['plugins'];
    children: ReactNode;
};

const defaultPlugins = [] as PluginsManagerContextType['plugins'];

const defaultContextValue = {};

const withPluginsData =
    <P,>(Component: ComponentType<P>) =>
    (props: P) => {
        return (
            <PluginsDataContextProvider value={defaultContextValue}>
                <Component {...(props as P)} />
            </PluginsDataContextProvider>
        );
    };

const _PluginsManager = ({ plugins = defaultPlugins, children }: Props) => {
    const { pluginRefs, pluginsMap } = useMemo(() => {
        // to create a unique set of plugins
        const _pluginsMap = plugins.reduce((acc, pluginRef) => {
            acc[pluginRef?.current?.key as PluginEvents] = pluginRef;

            return acc;
        }, {} as Record<PluginEvents, Plugin>);

        return {
            pluginsMap: _pluginsMap,
            pluginRefs: Object.values(_pluginsMap),
        };
    }, [plugins]);

    const events = useMemo(
        () =>
            Object.values(PluginEvents).reduce((acc, eventKey) => {
                acc[eventKey] = (...args: any) => {
                    pluginRefs.map(pluginRef => pluginRef?.current?.events?.[eventKey]?.(...args));
                };

                return acc;
            }, {} as Record<PluginEvents, (...args: any) => any>),
        [pluginRefs],
    );

    const methods = useMemo(() => {
        return pluginRefs.reduce((acc, pluginRef) => {
            if (!pluginRef.current) return acc;
            acc[pluginRef.current.key] = pluginRef.current.methods || {};

            return acc;
        }, {} as Record<string, Methods>);
    }, [pluginRefs]);

    const contextValue = useMemo(() => {
        return {
            plugins: pluginRefs,
            pluginsMap,
            events,
            methods,
        };
    }, [pluginRefs, pluginsMap, events, methods]);

    useEffect(() => {
        pluginRefs.map(pluginRef => {
            pluginRef?.current?.init?.();
        });

        return () => {
            pluginRefs.map(pluginRef => {
                pluginRef?.current?.destroy?.();
            });
        };
    }, [pluginRefs]);

    return (
        <PluginsManagerContextProvider value={contextValue}>
            {children}
        </PluginsManagerContextProvider>
    );
};

export const PluginsManager = memo(withPluginsData(_PluginsManager));

export const usePluginsManagerStoreRef = useStoreRef;

export default PluginsManager;
