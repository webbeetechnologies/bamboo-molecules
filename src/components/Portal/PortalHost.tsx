import { memo, ReactNode, useCallback, useEffect, useMemo, useRef, createContext } from 'react';

import PortalManager, { PortalManagerHandle } from './PortalManager';

export type Props = {
    children: ReactNode;
};

type Operation =
    | { type: 'mount'; key: number; children: ReactNode }
    | { type: 'update'; key: number; children: ReactNode }
    | { type: 'unmount'; key: number };

export type PortalMethods = {
    mount: (children: ReactNode) => number;
    update: (key: number, children: ReactNode) => void;
    unmount: (key: number) => void;
};

export const PortalContext = createContext<PortalMethods>(null as any);

const PortalHost = memo((props: Props) => {
    const nextKeyRef = useRef<number>(0);
    const queueRef = useRef<Operation[]>([]);
    const managerRef = useRef<PortalManagerHandle | null | undefined>();

    const mount = useCallback((children: ReactNode) => {
        const key = nextKeyRef.current++;
        const manager = managerRef.current;
        const queue = queueRef.current;

        if (manager) {
            manager.mount(key, children);
        } else {
            queue.push({ type: 'mount', key, children });
        }

        return key;
    }, []);

    const update = useCallback((key: number, children: ReactNode) => {
        const manager = managerRef.current;
        const queue = queueRef.current;

        if (manager) {
            manager.update(key, children);

            return;
        }

        const op: Operation = { type: 'mount', key, children };

        const index = queue.findIndex(
            o => o.type === 'mount' || (o.type === 'update' && o.key === key),
        );

        if (index > -1) {
            queue[index] = op;

            return;
        }

        queue.push(op as Operation);
    }, []);

    const unmount = useCallback((key: number) => {
        const manager = managerRef.current;
        const queue = queueRef.current;

        if (manager) {
            manager.unmount(key);

            return;
        }

        queue.push({ type: 'unmount', key });
    }, []);

    useEffect(() => {
        const manager = managerRef.current;
        const queue = queueRef.current;

        while (queue.length && manager) {
            const action = queue.pop();

            if (action) {
                switch (action.type) {
                    case 'mount':
                        manager.mount(action.key, action.children);
                        break;
                    case 'update':
                        manager.update(action.key, action.children);
                        break;
                    case 'unmount':
                        manager.unmount(action.key);
                        break;
                }
            }
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            mount,
            update,
            unmount,
        }),
        [mount, unmount, update],
    );

    return (
        <PortalContext.Provider value={contextValue}>
            {/* Need collapsable=false here to clip the elevations, otherwise they appear above Portal components */}
            {props.children}
            <PortalManager ref={managerRef} />
        </PortalContext.Provider>
    );
});

PortalHost.displayName = 'Portal.Host';

export default PortalHost;
