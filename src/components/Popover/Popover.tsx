import { FC, forwardRef, memo, useCallback, useId, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import { mergeRefs } from '../../utils';

import type { PopoverProps } from './types';
import { Popper, PopperContent } from '../Popper';
import { PopoverContext } from './PopoverContext';

const Popover: FC<PopoverProps> = forwardRef(
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
            ...props
        },
        ref: any,
    ) => {
        const { View, Overlay, PresenceTransition, Backdrop } = useMolecules();
        const triggerRef = useRef(null);
        const mergedRef = mergeRefs([triggerRef]);

        const popoverStyles = useComponentStyles('Popover');

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
                    style={popoverStyles.overlay}
                    isOpen={isOpen}
                    onRequestClose={handleClose}
                    useRNModalOnAndroid>
                    <PresenceTransition
                        initial={popoverStyles.initialTransition}
                        animate={popoverStyles.animateTransition}
                        exit={popoverStyles.exitTransition}
                        visible={isOpen}
                        style={StyleSheet.absoluteFill}>
                        <Backdrop onPress={handleClose} />
                        <Popper triggerRef={triggerRef} isOpen={isOpen as boolean} {...props}>
                            <PopoverContext.Provider
                                value={{
                                    onClose: handleClose,
                                    initialFocusRef,
                                    finalFocusRef,
                                    popoverContentId,
                                    bodyId,
                                    headerId,
                                }}>
                                <PopperContent>
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
