import type {MutableRefObject, ReactElement, ReactNode} from 'react';

export type PopoverProps = {
    trigger: (props: any, state: { open: boolean }) => ReactNode,
    onClose: () => void,
    isOpen: boolean,
    onOpen: boolean,
    defaultIsOpen?: boolean,
    initialFocusRef?: MutableRefObject<ReactElement | null>,
    finalFocusRef?: MutableRefObject<ReactElement | null>,
    trapFocus?: boolean,
    [k: string]: any,
};

export type TPopoverContext = {
    onClose: () => void,
    initialFocusRef?: MutableRefObject<ReactElement | null>,
    finalFocusRef?: MutableRefObject<ReactElement | null>,
    popoverContentId?: string,
    headerId?: string,
    bodyId?: string,
    setHeaderMounted?: (value: boolean) => void,
    setBodyMounted?: (value: boolean) => void,
    headerMounted?: boolean,
    bodyMounted?: boolean,
}