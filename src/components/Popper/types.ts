import type {MutableRefObject, PropsWithChildren, ReactElement, ReactNode} from "react";
import type {ViewProps} from "@webbee/bamboo-atoms";


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

export type IPopperProps = {
    shouldFlip?: boolean;
    crossOffset?: number;
    offset?: number;
    children: ReactNode;
    shouldOverlapWithTrigger?: boolean;
    trigger?: ReactElement | MutableRefObject<ReactElement | null>;
    placement?: IPlacement;
};

export type TPopperContext = IPopperProps;

export type PopperProps = ViewProps & {
    isOpen: boolean;
    triggerRef: MutableRefObject<ReactElement | null>;
    onClose: () => void;
    setOverlayRef?: (overlayRef: any) => void;
    children: ReactNode
};


export type PopperArrowProps = ViewProps & {
    height?: number,
    width?: number,
    actualPlacement: IPlacement,
}