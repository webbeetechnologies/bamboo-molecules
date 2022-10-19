import {FC, forwardRef, memo, useCallback, useId, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useMolecules} from '../../hooks';
import {PopoverContext, styles} from './utils';
import {mergeRefs} from "../../utils";

import type {PopoverProps} from './types';
import { PopperContent } from '../Popper';

const Popover: FC<PopoverProps> = forwardRef((
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
    ref: any
) => {
    const {View, Overlay, PresenceTransition, Backdrop, Popper,} = useMolecules();
    const triggerRef = useRef(null);
    const mergedRef = mergeRefs([triggerRef]);



    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [bodyMounted, setBodyMounted] = useState(false);
    const [headerMounted, setHeaderMounted] = useState(false);

    const popoverContentId = `${useId()}-content`;
    const headerId = `${popoverContentId}-header`;
    const bodyId = `${popoverContentId}-body`;


    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);


    const updatedTrigger = () => {
        return trigger(
            {
                'ref': mergedRef,
                'onPress': handleOpen,
                'aria-expanded': isOpen ? true : false,
                'aria-controls': isOpen ? popoverContentId : undefined,
                'aria-haspopup': true,
            },
            {open: isOpen}
        );
    };


    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);


    console.log({ triggerRef })

    return (
        <View ref={ref}>
            {updatedTrigger()}
            <Overlay style={styles.overlay} isOpen={isOpen} onRequestClose={handleClose} useRNModalOnAndroid>
                <PresenceTransition
                    initial={styles.initialTransition}
                    animate={styles.animateTransition}
                    exit={styles.exitTransition}
                    visible={isOpen}
                    style={StyleSheet.absoluteFill}
                >
                    <Backdrop onPress={handleClose}/>
                    <Popper onClose={handleClose} triggerRef={triggerRef} isOpen={isOpen} {...props}>
                        <PopoverContext.Provider
                            value={{
                                onClose: handleClose,
                                initialFocusRef,
                                finalFocusRef,
                                popoverContentId,
                                bodyId,
                                headerId,
                                headerMounted,
                                bodyMounted,
                                setBodyMounted,
                                setHeaderMounted,
                            }}
                        >
                            <PopperContent>
                                {/* <FocusScope contain={trapFocus} restoreFocus> */}
                                {isOpen && children}
                                {/* </FocusScope> */}
                            </PopperContent>
                        </PopoverContext.Provider>
                    </Popper>
                </PresenceTransition>
            </Overlay>
        </View>
    );
});

export default memo((Popover));
