import { ComponentType, forwardRef } from 'react';
import { usePluginsManagerStoreRef } from './plugins-manager';

const withPluginExistenceCheck = <P,>(Component: ComponentType<P>, pluginKey: string) =>
    forwardRef((props: P, ref: any) => {
        const { store } = usePluginsManagerStoreRef();

        if (!store?.current?.pluginsMap?.[pluginKey]) return null;

        return <Component {...(props as P)} ref={ref} />;
    });

export default withPluginExistenceCheck;
