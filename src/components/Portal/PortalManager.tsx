import { View, StyleSheet } from 'react-native';
import { ReactNode, useCallback, useState, forwardRef, useImperativeHandle, memo } from 'react';

export type Portal = {
    key: number;
    children: ReactNode;
};

/**
 * Portal host is the component which actually renders all Portals.
 */

export type PortalManagerHandle = {
    mount: (key: number, children: ReactNode) => number;
    update: (key: number, children: ReactNode) => void;
    unmount: (key: number) => void;
};

const PortalManager = (_props: unknown, ref: any) => {
    const [portals, setPortals] = useState<Portal[]>([]);

    const mount = useCallback((key: number, children: ReactNode) => {
        setPortals(prev => [...prev, { key, children }]);
    }, []);

    const update = useCallback((key: number, children: ReactNode) => {
        setPortals(prev =>
            prev.map(item => {
                if (item.key === key) {
                    return { ...item, children };
                }
                return item;
            }),
        );
    }, []);

    const unmount = useCallback((key: number) => {
        setPortals(prev => prev.filter(item => item.key !== key));
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            mount,
            unmount,
            update,
        }),
        [mount, unmount, update],
    );

    return (
        <>
            {portals.map(({ key, children }) => (
                <View
                    key={key}
                    collapsable={
                        false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
                    }
                    pointerEvents="box-none"
                    style={StyleSheet.absoluteFill}>
                    {children}
                </View>
            ))}
        </>
    );
};

export default memo(forwardRef(PortalManager));
