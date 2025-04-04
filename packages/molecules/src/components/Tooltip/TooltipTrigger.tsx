import {
    cloneElement,
    memo,
    useCallback,
    ReactElement,
    useEffect,
    useContext,
    useMemo,
    useImperativeHandle,
    RefAttributes,
} from 'react';
import { Platform } from 'react-native';

import { useHover } from '../../hooks';
import { TooltipContext } from './Tooltip';

export type Props = {
    children: ReactElement;
};

const TooltipTrigger = memo(({ children }: { children: ReactElement }) => {
    const isWeb = Platform.OS === 'web';
    const { onOpen, onClose, triggerRef } = useContext(TooltipContext);
    const isHovered = useHover(triggerRef);

    // this will make sure children's ref is not overwritten by the triggerRef
    useImperativeHandle(
        // @ts-ignore
        (children as ReactElement & RefAttributes<any>)?.ref,
        () => triggerRef?.current,
    );

    const onPress = useCallback(() => {
        children?.props?.onPress?.();
    }, [children?.props]);

    const onLongPress = useCallback(() => {
        children?.props?.onLongPress?.();

        if (isWeb) return;
        onOpen();
    }, [children?.props, isWeb, onOpen]);

    const onPressOut = useCallback(() => {
        children?.props?.onPressOut?.();

        if (isWeb) return;
        onClose();
    }, [children?.props, isWeb, onClose]);

    const onHoverIn = useCallback(() => {
        children?.props?.onHoverIn?.();

        onOpen();
    }, [children?.props, onOpen]);

    const onHoverOut = useCallback(() => {
        children?.props?.onHoverOut?.();

        onClose();
    }, [onClose, children?.props]);

    useEffect(() => {
        if (!isWeb) return;

        if (isHovered) {
            onHoverIn();
            return;
        }

        onHoverOut();
    }, [isHovered, isWeb, onHoverIn, onHoverOut]);

    return useMemo(
        () =>
            cloneElement(children, {
                ref: triggerRef,
                onLongPress,
                onPressOut,
                onPress,
            }),
        [children, onLongPress, onPress, onPressOut, triggerRef],
    );
});

TooltipTrigger.displayName = 'Tooltip_Trigger';
export default TooltipTrigger;
