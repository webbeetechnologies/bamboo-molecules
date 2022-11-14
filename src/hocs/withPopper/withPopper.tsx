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
            contentTextStyles,
            exitTransition,
            trigger,

            shouldFlip,
            crossOffset,
            offset,
            closeOnScroll,
            scrollRef,
            shouldOverlapWithTrigger,
            placement,
            triggerRef,
            setOverlayRef,

            ...rest
        } = props;

        // Dynamic keys are skipped
        // @ts-ignore. Caches the keys once.
        const cachedKeys = useMemo(() => Object.keys(rest), []);

        const triggerFunc = useCallback(
            (triggerProps: TriggerProps, state: { open: boolean }) => {
                const mergedRef = mergeRefs([ref, triggerProps.ref]);

                // @ts-ignore
                if (trigger) return trigger({ ...triggerProps, ref: mergedRef }, state);

                // @ts-ignore
                return <Component {...rest} {...triggerProps} ref={mergedRef} />;
            },
            [ref, trigger, ...cachedKeys.map(key => (rest as any)[key])],
        );

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
                contentTextStyles={contentTextStyles}
                overlayStyles={overlayStyles}
                initialTransition={initialTransition}
                animateTransition={animateTransition}
                exitTransition={exitTransition}
                shouldFlip={shouldFlip}
                crossOffset={crossOffset}
                offset={offset}
                closeOnScroll={closeOnScroll}
                scrollRef={scrollRef}
                shouldOverlapWithTrigger={shouldOverlapWithTrigger}
                placement={placement}
                triggerRef={triggerRef}
                setOverlayRef={setOverlayRef}
                trigger={triggerFunc}>
                {children}
            </Popover>
        );
    });

export default withPopper;
