import { ReactElement, ReactNode, memo } from 'react';

export type Props = {
    children: ReactElement | ReactNode;
};

const TooltipContent = memo(({ children }: Props) => {
    return <>{children}</>;
});

TooltipContent.displayName = 'Tooltip_Content';
export default TooltipContent;
