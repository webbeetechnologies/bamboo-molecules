import { FC, forwardRef, memo, useCallback, useId, useMemo, useRef, Suspense, lazy } from 'react';
import { StyleSheet } from 'react-native';

import { useControlledValue, useMolecules, usePlatformType, useTheme } from '../../hooks';
import { mergeRefs } from '../../utils';

import type { PopoverPropsTriggerRequired } from './types';
import { Popper } from '../../components/Popper';
import { PopoverContext } from './HOCPopoverContext';

const PopperContent = lazy(() => import('../../components/Popper/PopperContent'));

const Popover: FC<PopoverPropsTriggerRequired> = forwardRef(
    (
        {
            onOpen,
            trigger,
            onClose,
            isOpen: isOpenProp,
            children,
            defaultIsOpen,
            initialFocusRef,
            finalFocusRef,

            // TODO: Implement trap focus functionality
            // eslint-disable-next-line
            trapFocus = true,
            showArrow = true,
            overlayStyles,
            contentStyles,
            contentTextStyles,
            arrowProps,
            initialTransition,
            animateTransition,
            exitTransition,
            triggerRef: triggerRefProp,
            ...props
        },
        ref: any,
    ) => {
        const { View, Overlay, PresenceTransition, Backdrop } = useMolecules();
        const triggerRef = useRef(null);
        const mergedRef = mergeRefs([triggerRef, triggerRefProp]);

        const [isOpen, setIsOpen] = useControlledValue({
            value: isOpenProp,
            defaultValue: defaultIsOpen,
            onChange: isPopoverOpen => {
                isPopoverOpen ? onOpen?.() : onClose?.();
            },
        });

        const handleClose = useCallback(() => {
            setIsOpen(false);
        }, [setIsOpen]);

        const popoverId = useId();

        const popoverContextValue = useMemo(() => {
            const popoverContentId = `${popoverId}-content`;

            return {
                onClose: handleClose,
                initialFocusRef,
                finalFocusRef,
                popoverContentId,
                bodyId: `${popoverContentId}-body`,
                headerId: `${popoverContentId}-header`,
            };
        }, [handleClose, initialFocusRef, finalFocusRef, popoverId]);

        const handleOpen = useCallback(() => {
            setIsOpen(true);
        }, [setIsOpen]);

        const updatedTrigger = () => {
            return trigger(
                {
                    ref: mergedRef,
                    onPress: handleOpen,
                    'aria-expanded': isOpen ? true : false,
                    'aria-controls': isOpen ? popoverContextValue.popoverContentId : undefined,
                    'aria-haspopup': true,
                },
                { open: isOpen as boolean },
            );
        };

        const components = useMolecules();
        const platformType = usePlatformType();
        const themeContext = useTheme();

        const context = useMemo(() => {
            const { resolveComponentStyles, extractStyles, ...theme } = themeContext;
            return { resolveComponentStyles, extractStyles, theme, platformType, components };
        }, [themeContext, components, platformType]);

        return (
            <View ref={ref}>
                {updatedTrigger()}
                <Overlay
                    style={overlayStyles}
                    isOpen={isOpen}
                    onRequestClose={handleClose}
                    useRNModalOnAndroid>
                    <PresenceTransition
                        initial={initialTransition}
                        animate={animateTransition}
                        exit={exitTransition}
                        visible={isOpen}
                        style={StyleSheet.absoluteFill}>
                        <Backdrop onPress={handleClose} />
                        <Popper
                            crossOffset={8}
                            offset={8}
                            isOpen={isOpen as boolean}
                            triggerRef={triggerRef}
                            {...props}
                            arrowProps={arrowProps}>
                            <PopoverContext.Provider value={popoverContextValue}>
                                <Suspense>
                                    <PopperContent
                                        context={context}
                                        style={contentStyles}
                                        contentTextStyles={contentTextStyles}
                                        arrowProps={arrowProps}
                                        showArrow={showArrow}>
                                        {/* <FocusScope contain={trapFocus} restoreFocus> */}
                                        {children}
                                        {/* </FocusScope> */}
                                    </PopperContent>
                                </Suspense>
                            </PopoverContext.Provider>
                        </Popper>
                    </PresenceTransition>
                </Overlay>
            </View>
        );
    },
);

export default memo(Popover);
