import { getRegisteredComponentWithFallback } from '../../core';
import TooltipComponent from './Tooltip';
import TooltipContent from './TooltipContent';
import TooltipTrigger from './TooltipTrigger';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Tooltip = Object.assign(
    getRegisteredComponentWithFallback('Tooltip', TooltipComponent),
    {
        Trigger: TooltipTrigger,
        Content: TooltipContent,
    },
);

export type { TooltipContextValue, Props as TooltipProps } from './Tooltip';
export type { Props as TooltipContentProps } from './TooltipContent';
export type { Props as TooltipTriggerProps } from './TooltipTrigger';
export type { TooltipDefaultProps } from './utils';
export { tooltipStyles } from './utils';
