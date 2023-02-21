import { memo, ReactNode } from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './PortalHost';

export type Props = {
    /**
     * Content of the `Portal`.
     */
    children: ReactNode;
};

const PortalComponent = memo(({ children }: Props) => {
    return (
        <PortalContext.Consumer>
            {manager => (
                <PortalConsumer manager={manager as PortalMethods}>{children}</PortalConsumer>
            )}
        </PortalContext.Consumer>
    );
});

export const Portal = Object.assign(PortalComponent, {
    Host: PortalHost,
});
