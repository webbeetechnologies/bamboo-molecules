import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import TooltipComponent from './Tooltip';
import TooltipTrigger from './TooltipTrigger';
import TooltipContent from './TooltipContent';

export const TooltipDefault = Object.assign(TooltipComponent, {
    Trigger: TooltipTrigger,
    Content: TooltipContent,
});

registerMoleculesComponents({
    Tooltip: TooltipDefault,
});

export const Tooltip = getRegisteredComponentWithFallback('Tooltip', TooltipDefault);

export { Props as TooltipProps } from './Tooltip';
export { Props as TooltipTriggerProps } from './TooltipTrigger';
export { Props as TooltipContentProps } from './TooltipContent';
export { tooltipStyles } from './utils';
