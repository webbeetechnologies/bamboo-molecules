import { useRef, useLayoutEffect, useCallback, useEffect, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { PopoverProps, DEFAULT_ARROW_SIZE, useArrowStyles, usePopover } from './common';
import { Portal } from '../Portal';

const Popover = ({
    targetRef,
    children,
    isOpen,
    onClose,
    position = 'bottom',
    align = 'center',
    style,
    showArrow = true,
    arrowSize = DEFAULT_ARROW_SIZE,
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
        if (targetRef.current) {
            targetRef.current.measureInWindow(
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
    }, [targetRef, calculateAndSetPosition, targetLayoutRef]);

    useLayoutEffect(() => {
        if (isOpen) {
            const timeoutId = setTimeout(measureTarget, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen, measureTarget]);

    useLayoutEffect(() => {
        if (!isOpen) return;
        const handleResize = () => {
            if (targetRef.current && isOpen) {
                window.requestAnimationFrame(measureTarget);
            }
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize, true);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize, true);
        };
    }, [isOpen, measureTarget, targetRef]);

    useEffect(() => {
        if (!isOpen || !onClose) return;
        const handleClickOutside = (event: MouseEvent) => {
            const popoverElement = popoverRef.current as any as HTMLElement;
            const targetElement = targetRef.current as any as HTMLElement;
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
    }, [isOpen, onClose, popoverRef, targetRef]);

    const arrowStyles = useArrowStyles({
        showArrow,
        arrowSize,
        style,
        calculatedPosition,
        targetLayoutRef,
        popoverLayoutRef,
        actualPositionRef,
    });

    const popoverStyle = calculatedPosition ?? {
        position: 'absolute',
        top: -9999,
        left: -9999,
        opacity: 0,
    };

    if (!isOpen && popoverStyle.opacity === 0) {
        return null;
    }

    return (
        <Portal>
            <View
                ref={popoverRef}
                onLayout={handlePopoverLayout}
                style={[styles.popoverContainer, style, popoverStyle]}>
                {children}
                {showArrow && popoverStyle.opacity === 1 && <View style={arrowStyles} />}
            </View>
        </Portal>
    );
};

const styles = StyleSheet.create({
    popoverContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 100,
        opacity: 0,
        top: -9999,
        left: -9999,
    },
});

export default memo(Popover);
