import type { ReactElement, ReactNode } from 'react';

export type Props = {
    children: ReactElement | ReactNode;
};

const TooltipContent = ({ children }: Props) => {
    return <>{children}</>;
};

TooltipContent.displayName = 'Tooltip.Content';
export default TooltipContent;
