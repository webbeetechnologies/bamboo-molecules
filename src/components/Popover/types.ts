import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TPopperContext } from '../Popper/types';

export type PopoverProps = PropsWithChildren<
    Omit<TPopperContext, 'trigger'> & {
        showArrow?: boolean;
        onClose?: () => void;
        isOpen?: boolean;
        defaultIsOpen?: boolean;
        initialFocusRef?: MutableRefObject<ReactElement | null>;
        finalFocusRef?: MutableRefObject<ReactElement | null>;
        trapFocus?: boolean;
        triggerRef: any;

        arrowProps?: ViewStyle;
        overlayStyles?: ViewStyle;
        contentStyles?: ViewStyle;
        contentTextStyles?: TextStyle;
        initialTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
        animateTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
        exitTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    }
>;

export type TPopoverContext = {
    onClose: () => void;
    initialFocusRef?: MutableRefObject<ReactElement | null>;
    finalFocusRef?: MutableRefObject<ReactElement | null>;
    popoverContentId?: string;
    headerId?: string;
    bodyId?: string;
    setHeaderMounted?: (value: boolean) => void;
    setBodyMounted?: (value: boolean) => void;
    headerMounted?: boolean;
    bodyMounted?: boolean;
};
