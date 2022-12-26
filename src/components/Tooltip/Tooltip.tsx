import {
    createContext,
    memo,
    ReactElement,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ViewStyle, Platform, Pressable, TextStyle } from 'react-native';

import { useComponentStyles, useMolecules, useToggle } from '../../hooks';
import type { IPlacement } from '../Popper/types';

export type Props = {
    fadeInDelay?: number;
    fadeOutDelay?: number;
    showArrow?: boolean;
    placement?: IPlacement;
    contentTextStyles?: TextStyle;
    style?: ViewStyle;
    children: ReactNode;
};

const Tooltip = ({
    style,
    children,
    fadeInDelay = 100,
    fadeOutDelay = 100,
    showArrow = false,
    placement,
    contentTextStyles: contentTextStyleProp,
}: Props) => {
    const { Popover } = useMolecules();
    const componentStyles = useComponentStyles('Tooltip', style); // all the styling logics goes here
    const isWeb = Platform.OS === 'web';

    const [trigger, setTrigger] = useState<ReactElement>(<></>);
    const [content, setContent] = useState<ReactNode | null>(null);
    const { state: isOpen, setState: setIsOpen } = useToggle(false);
    const triggerRef = useRef(null);

    const onClose = useCallback(() => {
        setTimeout(() => setIsOpen(false), fadeOutDelay);
    }, [fadeOutDelay, setIsOpen]);

    const onOpen = useCallback(() => {
        setTimeout(() => setIsOpen(true), fadeInDelay);
    }, [fadeInDelay, setIsOpen]);

    const onPress = useCallback(() => {
        trigger?.props?.onPress?.();
    }, [trigger?.props]);

    const contextValue = useMemo(
        () => ({
            renderTrigger: setTrigger,
            renderContent: setContent,
        }),
        [],
    );

    const onLongPress = useCallback(() => {
        trigger?.props?.onLongPress?.();

        if (isWeb) return;
        onOpen();
    }, [isWeb, onOpen, trigger?.props]);

    const onPressOut = useCallback(() => {
        trigger?.props?.onPressOut?.();

        if (isWeb) return;
        onClose();
    }, [isWeb, onClose, trigger?.props]);

    const onHoverIn = useCallback(() => {
        trigger?.props?.onHoverIn?.();

        if (!isWeb) return;
        onOpen();
    }, [isWeb, onOpen, trigger?.props]);

    const onHoverOut = useCallback(() => {
        trigger?.props?.onHoverOut?.();

        if (!isWeb) return;
        onClose();
    }, [isWeb, onClose, trigger?.props]);

    const setPopoverOpen = useCallback(
        (_isOpen: boolean) => {
            setTimeout(() => setIsOpen(_isOpen), isOpen ? fadeInDelay : fadeOutDelay);
        },
        [fadeInDelay, fadeOutDelay, isOpen, setIsOpen],
    );

    const { backdropStyles, contentStyle, contentTextStyle } = useMemo(() => {
        const { contentText, ...restStyles } = componentStyles;

        return {
            backdropStyles: {
                display: 'none',
            } as ViewStyle,
            contentStyle: restStyles,
            contentTextStyle: [contentText, contentTextStyleProp] as TextStyle,
        };
    }, [componentStyles, contentTextStyleProp]);

    return (
        <TooltipContext.Provider value={contextValue}>
            <Pressable
                ref={triggerRef}
                onLongPress={onLongPress}
                onPressOut={onPressOut}
                onPress={onPress}
                // @ts-ignore
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}>
                {trigger}
            </Pressable>

            <Popover
                placement={placement}
                showArrow={showArrow}
                backdropStyles={backdropStyles}
                triggerRef={triggerRef}
                isOpen={isOpen}
                setIsOpen={setPopoverOpen}
                contentStyles={contentStyle}
                contentTextStyles={contentTextStyle}
                onClose={onClose}>
                {content}
            </Popover>
            {children}
        </TooltipContext.Provider>
    );
};

export const TooltipContext = createContext<{
    renderTrigger: (trigger: ReactElement) => void;
    renderContent: (content: ReactNode) => void;
}>({
    renderTrigger: () => null,
    renderContent: () => null,
});

export default memo(Tooltip);
