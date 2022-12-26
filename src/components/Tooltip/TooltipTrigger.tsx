import type { ReactElement } from 'react';
import { useContext, useEffect } from 'react';
import { TooltipContext } from './Tooltip';

export type Props = {
    children: ReactElement;
};

const TooltipTrigger = ({ children }: Props) => {
    const { renderTrigger } = useContext(TooltipContext);

    useEffect(() => {
        renderTrigger(children);
    }, [children, renderTrigger]);

    return null;
};

TooltipTrigger.displayName = 'Tooltip.Trigger';
export default TooltipTrigger;
