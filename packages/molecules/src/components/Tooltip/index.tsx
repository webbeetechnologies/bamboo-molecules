import { default as TooltipComponent } from './Tooltip';
import { default as TooltipTrigger } from './TooltipTrigger';
import { default as TooltipContent } from './TooltipContent';

export const Tooltip = Object.assign(TooltipComponent, {
    Trigger: TooltipTrigger,
    Content: TooltipContent,
});

export { Props as TooltipProps } from './Tooltip';
export { Props as TooltipTriggerProps } from './TooltipTrigger';
export { Props as TooltipContentProps } from './TooltipContent';
export { tooltipStyles } from './utils';
