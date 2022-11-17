import type { PopoverProps as HOCPopoverProps, TriggerFunc } from '../../hocs/withPopper';

export type PopoverProps = HOCPopoverProps & {
    trigger: TriggerFunc;
};
