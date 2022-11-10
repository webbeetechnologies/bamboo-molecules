import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';

export type IPlacement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right top'
    | 'right bottom'
    | 'left top'
    | 'left bottom';

export interface TPopperContext {
    shouldFlip?: boolean;
    crossOffset?: number;
    offset?: number;
    onClose?: () => void;
    onOpen?: () => void;
    isOpen: boolean;
    closeOnScroll?: boolean;
    scrollRef?: MutableRefObject<ReactElement | null>;
    shouldOverlapWithTrigger?: boolean;
    trigger?: ReactElement | MutableRefObject<ReactElement | null>;
    placement?: IPlacement;
    triggerRef: MutableRefObject<ReactElement | null>;
    setOverlayRef?: (overlayRef: any) => void;
}

export type PopperProps = TPopperContext & {
    children: ReactNode;
};

export type PopperArrowProps = ViewProps & {
    height?: number;
    width?: number;
    actualPlacement: IPlacement;
};