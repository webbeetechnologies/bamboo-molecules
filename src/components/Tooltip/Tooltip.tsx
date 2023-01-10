import { createContext, memo, ReactElement, useCallback, useMemo, useRef } from 'react';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { useSubcomponents, useToggle } from '../../hooks';
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

    const { trigger, content } = useSubcomponents({
        children,
        allowedChildren: ['Tooltip.Trigger', 'Tooltip.Content'],
    });

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
            {trigger[0]}
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
                {content[0]}
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
