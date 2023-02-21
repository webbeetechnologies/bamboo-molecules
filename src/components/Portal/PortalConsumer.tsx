import { ReactNode, memo } from 'react';

import type { PortalMethods } from './PortalHost';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
    manager: PortalMethods;
    children: ReactNode;
};

const PortalConsumer = ({ manager, children }: Props) => {
    const keyRef = useRef<number>();

    const checkManager = useCallback(() => {
        if (!manager) {
            throw new Error(
                'Looks like you forgot to wrap your root component with `ProvideMolecules` component from `@bambooapp/bamboo-molecules`.',
            );
        }
    }, [manager]);

    useEffect(() => {
        checkManager();

        keyRef.current = manager.mount(children);

        return () => {
            checkManager();

            manager.unmount(keyRef.current as number);
        };
    }, [checkManager, children, manager]);

    return null;
};

export default memo(PortalConsumer);
