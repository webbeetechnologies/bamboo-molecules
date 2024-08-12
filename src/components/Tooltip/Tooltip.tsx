import { createContext, memo, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { ViewStyle, TextStyle, StyleSheet, ViewProps } from 'react-native';

import { useSubcomponents, useToggle } from '../../hooks';
import type { IPlacement } from '../Popper/types';
import { popoverFactory, PopoverProps } from '../Popover';

export type Props = Pick<PopoverProps, 'offset' | 'crossOffset'> & {
    fadeInDelay?: number;
    fadeOutDelay?: number;
    showArrow?: boolean;
    placement?: IPlacement;
    contentTextStyles?: TextStyle;
    style?: ViewStyle;
    children: ReactElement | ReactElement[];
    hoverableContent?: boolean;
};

const TooltipPopover = popoverFactory('Tooltip');

const Tooltip = ({
    style,
    children,
    fadeInDelay = 100,
    fadeOutDelay = 300,
    showArrow = false,
    placement,
    contentTextStyles,
    hoverableContent = false,
}: Props) => {
    const { state: isOpen, setState: setIsOpen } = useToggle(false);
    const triggerRef = useRef(null);
    const timeOutRef = useRef<NodeJS.Timeout>();
    const popoverTimeoutRef = useRef<NodeJS.Timeout>();
    const preventCloseRef = useRef(false);

    const onClose = useCallback(() => {
        if (preventCloseRef.current) return;
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => setIsOpen(false), fadeOutDelay);
    }, [fadeOutDelay, setIsOpen]);

    const onOpen = useCallback(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => setIsOpen(true), fadeInDelay);
    }, [fadeInDelay, setIsOpen]);

    const setPopoverOpen = useCallback(
        (_isOpen: boolean) => {
            clearTimeout(popoverTimeoutRef.current);
            popoverTimeoutRef.current = setTimeout(
                () => setIsOpen(_isOpen),
                isOpen ? fadeInDelay : fadeOutDelay,
            );
        },
        [fadeInDelay, fadeOutDelay, isOpen, setIsOpen],
    );

    const { Tooltip_Trigger, Tooltip_Content } = useSubcomponents({
        children,
        allowedChildren: ['Tooltip_Trigger', 'Tooltip_Content'],
    });

    const contextValue = useMemo(
        () => ({
            triggerRef,
            onOpen,
            onClose,
        }),
        [onClose, onOpen],
    );

    const popoverContentProps = useMemo(
        () =>
            (hoverableContent
                ? {
                      onMouseEnter: () => {
                          preventCloseRef.current = true;
                          clearTimeout(timeOutRef.current);
                          setIsOpen(true);
                      },
                      onMouseLeave: () => {
                          preventCloseRef.current = false;
                          clearTimeout(timeOutRef.current);
                          setIsOpen(false);
                      },
                  }
                : {}) as ViewProps,
        [hoverableContent, setIsOpen],
    );

    useEffect(() => {
        return () => {
            clearTimeout(timeOutRef.current);
            clearTimeout(popoverTimeoutRef.current);
        };
    }, []);

    return (
        <TooltipContext.Provider value={contextValue}>
            {Tooltip_Trigger[0]}
            {isOpen && (
                <TooltipPopover
                    placement={placement}
                    showArrow={showArrow}
                    backdropStyles={styles.backdrop}
                    triggerRef={triggerRef}
                    isOpen={isOpen}
                    setIsOpen={setPopoverOpen}
                    contentStyles={style}
                    contentTextStyles={contentTextStyles}
                    popoverContentProps={popoverContentProps}
                    onClose={onClose}>
                    {Tooltip_Content[0]}
                </TooltipPopover>
            )}
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
