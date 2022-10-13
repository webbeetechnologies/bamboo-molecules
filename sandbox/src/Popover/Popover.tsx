import React, { forwardRef, memo } from 'react';
import { PopperContextProvider, PopperContent } from '../Popper/Popper';
import { mergeRefs } from '../Popper/mergeRefs';
// import { useControllableState } from '../../../hooks';
// import Backdrop from '../Backdrop';
import { FocusScope } from '@react-native-aria/focus';
import { PresenceTransition } from '../Popper/PresenceTransitions';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useId } from '@react-aria/utils';
import { Overlay } from '../Popper/Overlay';
import { PopoverContext } from './PopoverContext';
import Backdrop from './Backdrop';
// import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';


// export const PopoverContext = React.createContext({
//   onClose: () => {},
//   initialFocusRef: { current: null } as React.RefObject<any> | undefined,
//   finalFocusRef: { current: null } as React.RefObject<any> | undefined,
//   popoverContentId: undefined as string | undefined,
//   headerId: undefined as string | undefined,
//   bodyId: undefined as string | undefined,
//   setHeaderMounted: (() => {}) as any,
//   setBodyMounted: (() => {}) as any,
//   headerMounted: false,
//   bodyMounted: false,
// });


const Popover = (
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
  }: any,
  ref: any
) => {
  const triggerRef = React.useRef(null);
  const mergedRef = mergeRefs([triggerRef]);
  const [isOpen, setIsOpen] = React.useState(isOpenProp);

  const [bodyMounted, setBodyMounted] = React.useState(false);
  const [headerMounted, setHeaderMounted] = React.useState(false);

  const popoverContentId = `${useId()}-content`;
  const headerId = `${popoverContentId}-header`;
  const bodyId = `${popoverContentId}-body`;


  const handleOpen = React.useCallback(() => {
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
      { open: isOpen }
    );
  };


  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <View ref={ref}>
      {updatedTrigger()}
      <Overlay style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, }} isOpen={isOpen} onRequestClose={handleClose} useRNModalOnAndroid>
        <PresenceTransition
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, transition: { duration: 150 } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 100 } }}
          visible={isOpen}
          style={StyleSheet.absoluteFill}
        >
          <Backdrop onPress={handleClose} />
          <PopperContextProvider onClose={handleClose} triggerRef={triggerRef} isOpen={ isOpen } {...props}>
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
              {/* <FocusScope contain={trapFocus} restoreFocus> */}
                    {isOpen && children }
              {/* </FocusScope> */}
            </PopoverContext.Provider>
          </PopperContextProvider>
        </PresenceTransition>
      </Overlay>
    </View>
  );
};

export default memo(forwardRef(Popover));
