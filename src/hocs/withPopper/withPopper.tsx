import { ComponentType, Ref, forwardRef, useCallback, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import type { PopoverProps, TriggerProps } from './types';
import { mergeRefs } from '../../utils';
import Popover from './HOCPopover';

export type WithPopperProps = ViewProps & PopoverProps;

const withPopper = <T,>(Component: ComponentType<T>) =>
    forwardRef((props: WithPopperProps & T, ref: Ref<ViewProps>) => {
        const {
            children,
            showArrow,
            onClose,
            onOpen,
            isOpen,
            defaultIsOpen,
            initialFocusRef,
            finalFocusRef,
            trapFocus,
            overlayStyles,
            initialTransition,
            animateTransition,
            arrowProps,
            contentStyles,
            exitTransition,
            trigger,
            ...rest
        } = props;

        // Dynamic keys are skipped
        const cachedKeys = useMemo(() => Object.keys(rest), []);

        return (
            <Popover
                showArrow={showArrow}
                onClose={onClose}
                onOpen={onOpen}
                isOpen={isOpen}
                arrowProps={arrowProps}
                defaultIsOpen={defaultIsOpen}
                initialFocusRef={initialFocusRef}
                finalFocusRef={finalFocusRef}
                trapFocus={trapFocus}
                contentStyles={contentStyles}
                overlayStyles={overlayStyles}
                initialTransition={initialTransition}
                animateTransition={animateTransition}
                exitTransition={exitTransition}
                trigger={useCallback(
                    (props: TriggerProps, state: { open: boolean }) => {
                        const mergedRef = mergeRefs([ref, props.ref]);

                        // @ts-ignore
                        if (trigger) return trigger({ ...props, ref: mergedRef }, state);

                        // @ts-ignore
                        return <Component {...rest} {...props} ref={mergeRefs([ref, mergedRef])} />;
                    },
                    cachedKeys.map(key => (rest as any)[key]),
                )}>
                {children}
            </Popover>
        );
    });

export default withPopper;
