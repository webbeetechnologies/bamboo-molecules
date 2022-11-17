import { FC, forwardRef, memo, useMemo } from 'react';

import { useComponentStyles } from '../../hooks';

import type { PopoverProps } from './types';
import { withPopper } from '../../hocs/withPopper';

const Popover: FC<PopoverProps> = forwardRef(
    ({ children, offset = 4, crossOffset = 0, ...props }, ref: any) => {
        const {
            arrowProps,
            overlayStyles,
            contentStyles,
            contentTextStyles,
            initialTransition,
            animateTransition,
            exitTransition,
        } = props;

        const styles = useComponentStyles('Popover', {
            arrow: arrowProps?.style,
            overlayStyles,
            contentStyles,
            contentTextStyles,
            initialTransition,
            animateTransition,
            exitTransition,
        });

        const { arrowPropsWithStyle, ...popoverStyles } = useMemo(() => {
            const { arrow, ...rest } = styles;

            return {
                ...rest,
                arrowPropsWithStyle: {
                    ...arrowProps,
                    style: arrow,
                },
            };
        }, [arrowProps, styles]);

        return (
            <Popper
                ref={ref}
                {...props}
                offset={offset}
                crossOffset={crossOffset}
                arrowProps={arrowPropsWithStyle}
                contentStyles={popoverStyles.content}
                contentTextStyles={popoverStyles.contentText}
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
