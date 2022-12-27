import { ReactElement, memo } from 'react';

export type Props = {
    children: ReactElement;
};

const TooltipTrigger = ({ children }: Props) => {
    return children;
};

TooltipTrigger.displayName = 'Tooltip.Trigger';
export default memo(TooltipTrigger);
