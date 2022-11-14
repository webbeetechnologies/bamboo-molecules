import { FC, forwardRef, memo, useMemo } from 'react';

import { useComponentStyles } from '../../hooks';

import type { PopoverProps } from './types';
import { withPopper } from '../../hocs/withPopper';

const Popover: FC<PopoverProps> = forwardRef(
    ({ children, offset = 4, crossOffset = 0, ...props }, ref: any) => {
        const styles = useComponentStyles('Popover');

        const { arrowProps, ...popoverStyles } = useMemo(() => {
            const { arrow, ...rest } = styles;

            return {
                ...rest,
                arrowProps: {
                    style: arrow,
                },
            };
        }, [styles]);

        return (
            <Popper
                ref={ref}
                {...props}
                offset={offset}
                crossOffset={crossOffset}
                arrowProps={arrowProps}
                contentStyles={popoverStyles.content}
                overlayStyles={popoverStyles.overlay}
                initialTransition={popoverStyles.initialTransition}
                animateTransition={popoverStyles.animateTransition}
                exitTransition={popoverStyles.exitTransition}>
                {children}
            </Popper>
        );
    },
);

const Popper = withPopper<PopoverProps>(() => null);

export default memo(Popover);
