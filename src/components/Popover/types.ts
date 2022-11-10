import type { PopoverProps as HOCPopoverProps, TriggerFunc } from '../../hocs/withPopper';

export type PopoverProps = Omit<
    HOCPopoverProps,
    | 'arrowProps'
    | 'overlayStyles,'
    | 'contentStyles,'
    | 'initialTransition,'
    | 'animateTransition,'
    | 'exitTransition'
> & { trigger: TriggerFunc };
