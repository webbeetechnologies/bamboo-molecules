import type { ReactNode } from 'react';
import { useContext, useEffect } from 'react';
import { TooltipContext } from './Tooltip';

export type Props = {
    children: ReactNode;
};

const TooltipTrigger = ({ children }: Props) => {
    const { renderContent } = useContext(TooltipContext);

    useEffect(() => {
        renderContent(children);
    }, [children, renderContent]);

    return null;
};

TooltipTrigger.displayName = 'Tooltip.Trigger';
export default TooltipTrigger;
