import { createContext, MutableRefObject, ReactElement, useContext } from 'react';
import type { TPopoverContext } from './types';

export const PopoverContext = createContext<TPopoverContext>({
    onClose: () => {},
    initialFocusRef: { current: null } as MutableRefObject<ReactElement | null> | undefined,
    finalFocusRef: { current: null } as MutableRefObject<ReactElement | null> | undefined,
    popoverContentId: undefined as string | undefined,
    headerId: undefined as string | undefined,
    bodyId: undefined as string | undefined,
});

export const usePopoverContext = () => {
    return useContext(PopoverContext);
};
