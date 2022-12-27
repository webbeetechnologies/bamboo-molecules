import type { ReactElement } from 'react';

export type Props = {
    children: ReactElement;
};

const TooltipTrigger = ({ children }: Props) => {
    return children;
};

TooltipTrigger.displayName = 'Tooltip.Trigger';
export default TooltipTrigger;
