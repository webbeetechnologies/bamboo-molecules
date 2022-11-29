import type { MutableRefObject, PropsWithChildren, ReactElement, ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { TPopperContext } from 'src/components/Popper/types';

export interface TriggerProps {
    ref: React.MutableRefObject<any> | ((value: any) => void);
    onPress: () => void;
    'aria-expanded': boolean;
    'aria-controls': string | undefined;
    'aria-haspopup': true;
}

export type TriggerFunc = (props: TriggerProps, state: { open: boolean }) => ReactNode;

export type PopoverProps = PropsWithChildren<
    Omit<TPopperContext, 'trigger'> & {
        showArrow?: boolean;
        trigger?: TriggerFunc;
        onClose?: () => void;
        onOpen?: () => void;
        isOpen?: boolean;
        defaultIsOpen?: boolean;
        initialFocusRef?: MutableRefObject<ReactElement | null>;
        finalFocusRef?: MutableRefObject<ReactElement | null>;
        trapFocus?: boolean;

        arrowProps?: ViewStyle;
        overlayStyles?: ViewStyle;
        contentStyles?: ViewStyle;
        contentTextStyles?: TextStyle;
        initialTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
        animateTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
        exitTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    }
>;

export type PopoverPropsTriggerRequired = PopoverProps & { trigger: TriggerFunc };

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
