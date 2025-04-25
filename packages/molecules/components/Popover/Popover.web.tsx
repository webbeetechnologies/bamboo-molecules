import { useRef, useLayoutEffect, useCallback, useEffect, memo, Fragment } from 'react';
import { View } from 'react-native';
import { ScopedTheme, StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import {
    PopoverProps,
    DEFAULT_ARROW_SIZE,
    useArrowStyles,
    usePopover,
    popoverDefaultStyles,
} from './common';
import { Portal } from '../Portal';

const Popover = ({
    triggerRef,
    children,
    isOpen,
    onClose,
    position = 'bottom',
    align = 'center',
    style,
    showArrow = false,
    arrowSize = DEFAULT_ARROW_SIZE,
    inverted = false,
}: PopoverProps) => {
    const {
        popoverLayoutRef,
        targetLayoutRef,
        actualPositionRef,
        calculatedPosition,
        calculateAndSetPosition,
        handlePopoverLayout,
    } = usePopover({
        isOpen,
        position,
        align,
        showArrow,
        arrowSize,
    });

    const popoverRef = useRef<View>(null);

    const measureTarget = useCallback(() => {
        if (triggerRef.current) {
            triggerRef.current.measureInWindow(
                (x: number, y: number, width: number, height: number) => {
                    if (width !== 0 || height !== 0) {
                        const newLayout = { x, y, width, height };
                        const changed =
                            !targetLayoutRef.current ||
                            targetLayoutRef.current.x !== newLayout.x ||
                            targetLayoutRef.current.y !== newLayout.y ||
                            targetLayoutRef.current.width !== newLayout.width ||
                            targetLayoutRef.current.height !== newLayout.height;

                        if (changed) {
                            targetLayoutRef.current = newLayout;
                            calculateAndSetPosition();
                        }
                    } else {
                        targetLayoutRef.current = null;
                        calculateAndSetPosition();
                    }
                },
            );
        } else {
            targetLayoutRef.current = null;
            calculateAndSetPosition();
        }
    }, [triggerRef, calculateAndSetPosition, targetLayoutRef]);

    useLayoutEffect(() => {
        if (isOpen) {
            const timeoutId = setTimeout(measureTarget, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen, measureTarget]);

    useLayoutEffect(() => {
        if (!isOpen) return;
        const handleResize = () => {
            if (triggerRef.current && isOpen) {
                window.requestAnimationFrame(measureTarget);
            }
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize, true);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize, true);
        };
    }, [isOpen, measureTarget, triggerRef]);

    useEffect(() => {
        if (!isOpen || !onClose) return;
        const handleClickOutside = (event: MouseEvent) => {
            const popoverElement = popoverRef.current as any as HTMLElement;
            const targetElement = triggerRef.current as any as HTMLElement;
            if (
                popoverElement &&
                !popoverElement.contains(event.target as Node) &&
                targetElement &&
                !targetElement.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, popoverRef, triggerRef]);

    const arrowStyles = useArrowStyles({
        showArrow,
        arrowSize,
        style,
        calculatedPosition,
        targetLayoutRef,
        popoverLayoutRef,
        actualPositionRef,
    });

    const popoverStyle = calculatedPosition ?? popoverDefaultStyles;

    const Wrapper = inverted ? ScopedTheme : Fragment;

    if (!isOpen && popoverStyle.opacity === 0) {
        return null;
    }

    return (
        <Portal>
            <Wrapper
                {...(inverted
                    ? { name: UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark' }
                    : ({} as { name: 'light' }))}>
                <View
                    ref={popoverRef}
                    onLayout={handlePopoverLayout}
                    style={[styles.popoverContainer, style, popoverStyle]}>
                    {children}
                    {showArrow && popoverStyle.opacity === 1 && <View style={arrowStyles} />}
                </View>
            </Wrapper>
        </Portal>
    );
};

const styles = StyleSheet.create(theme => ({
    popoverContainer: {
        ...popoverDefaultStyles,
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 100,
    },
}));

export default memo(Popover);
