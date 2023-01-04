import {
    Children,
    createContext,
    FC,
    isValidElement,
    memo,
    ReactElement,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { useToggle } from '../../hooks';
import type { IPlacement } from '../Popper/types';
import { popoverFactory } from '../Popover';

export type Props = {
    fadeInDelay?: number;
    fadeOutDelay?: number;
    showArrow?: boolean;
    placement?: IPlacement;
    contentTextStyles?: TextStyle;
    style?: ViewStyle;
    children: ReactElement | ReactElement[];
};

const TooltipPopover = popoverFactory('Tooltip');

const Tooltip = ({
    style,
    children,
    fadeInDelay = 100,
    fadeOutDelay = 100,
    showArrow = false,
    placement,
    contentTextStyles,
}: Props) => {
    const { state: isOpen, setState: setIsOpen } = useToggle(false);
    const triggerRef = useRef(null);

    const onClose = useCallback(() => {
        setTimeout(() => setIsOpen(false), fadeOutDelay);
    }, [fadeOutDelay, setIsOpen]);

    const onOpen = useCallback(() => {
        setTimeout(() => setIsOpen(true), fadeInDelay);
    }, [fadeInDelay, setIsOpen]);

    const setPopoverOpen = useCallback(
        (_isOpen: boolean) => {
            setTimeout(() => setIsOpen(_isOpen), isOpen ? fadeInDelay : fadeOutDelay);
        },
        [fadeInDelay, fadeOutDelay, isOpen, setIsOpen],
    );

    const { trigger, content } = useMemo(
        () =>
            Children.map(children, child => child).reduce(
                (context, child) => {
                    if (!isValidElement(child)) return context;

                    if (
                        (child.type as FC).displayName !== 'Tooltip.Trigger' &&
                        (child.type as FC).displayName !== 'Tooltip.Content'
                    ) {
                        return context;
                    }

                    if ((child.type as FC).displayName === 'Tooltip.Trigger') {
                        return {
                            ...context,
                            // this will make sure we only take the last child as the trigger
                            trigger: child,
                        };
                    }

                    return {
                        ...context,
                        content: [...context.content, child],
                    };
                },
                {
                    trigger: <></>,
                    content: [] as ReactElement[],
                },
            ),
        [children],
    );

    const contextValue = useMemo(
        () => ({
            triggerRef,
            onOpen,
            onClose,
        }),
        [onClose, onOpen],
    );

    return (
        <TooltipContext.Provider value={contextValue}>
            {trigger}
            <TooltipPopover
                placement={placement}
                showArrow={showArrow}
                backdropStyles={styles.backdrop}
                triggerRef={triggerRef}
                isOpen={isOpen}
                setIsOpen={setPopoverOpen}
                contentStyles={style}
                contentTextStyles={contentTextStyles}
                onClose={onClose}>
                {content}
            </TooltipPopover>
        </TooltipContext.Provider>
    );
};

export const TooltipContext = createContext({
    onOpen: () => {},
    onClose: () => {},
    triggerRef: null as any,
});

const styles = StyleSheet.create({
    backdrop: {
        display: 'none',
    },
});

export default memo(Tooltip);
