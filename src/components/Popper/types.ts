import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import type { View } from 'react-native';

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
    setIsOpen?: (isOpen: boolean) => void;
    isOpen: boolean;
    closeOnScroll?: boolean;
    scrollRef?: MutableRefObject<ReactElement | null>;
    shouldOverlapWithTrigger?: boolean;
    arrowProps?: ViewProps;
    trigger?: ReactElement | MutableRefObject<ReactElement | null>;
    placement?: IPlacement;
    triggerRef: MutableRefObject<View | null>;
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
