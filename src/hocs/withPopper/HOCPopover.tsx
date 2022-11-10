import { FC, forwardRef, memo, useCallback, useId, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useControlledValue, useMolecules } from '../../hooks';
import { mergeRefs } from '../../utils';

import type { PopoverPropsTriggerRequired } from './types';
import { Popper, PopperContent } from '../../components/Popper';
import { PopoverContext } from './HOCPopoverContext';

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
            trapFocus = true,
            showArrow = true,
            overlayStyles,
            contentStyles,
            arrowProps,
            initialTransition,
            animateTransition,
            exitTransition,
            ...props
        },
        ref: any,
    ) => {
        const { View, Overlay, PresenceTransition, Backdrop } = useMolecules();
        const triggerRef = useRef(null);
        const mergedRef = mergeRefs([triggerRef]);

        const [isOpen, setIsOpen] = useControlledValue({
            value: isOpenProp,
            defaultValue: false,
            onChange: isOpen => {
                isOpen ? onOpen?.() : onClose?.();
            },
        });

        const popoverContentId = `${useId()}-content`;
        const headerId = `${popoverContentId}-header`;
        const bodyId = `${popoverContentId}-body`;

        const handleOpen = useCallback(() => {
            setIsOpen(true);
        }, [setIsOpen]);

        const updatedTrigger = () => {
            return trigger(
                {
                    ref: mergedRef,
                    onPress: handleOpen,
                    'aria-expanded': isOpen ? true : false,
                    'aria-controls': isOpen ? popoverContentId : undefined,
                    'aria-haspopup': true,
                },
                { open: isOpen as boolean },
            );
        };

        const handleClose = useCallback(() => {
            setIsOpen(false);
        }, []);

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
                            triggerRef={triggerRef}
                            isOpen={isOpen as boolean}
                            {...props}
                            arrowProps={arrowProps}>
                            <PopoverContext.Provider
                                value={{
                                    onClose: handleClose,
                                    initialFocusRef,
                                    finalFocusRef,
                                    popoverContentId,
                                    bodyId,
                                    headerId,
                                }}>
                                <PopperContent
                                    style={contentStyles}
                                    arrowProps={arrowProps}
                                    showArrow={showArrow}>
                                    {/* <FocusScope contain={trapFocus} restoreFocus> */}
                                    {children}
                                    {/* </FocusScope> */}
                                </PopperContent>
                            </PopoverContext.Provider>
                        </Popper>
                    </PresenceTransition>
                </Overlay>
            </View>
        );
    },
);

export default memo(Popover);
