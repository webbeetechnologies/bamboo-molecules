import { useRef, useLayoutEffect, useCallback, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Pressable, AppState, Platform } from 'react-native';

import { Portal } from '../Portal';
import { PopoverProps, DEFAULT_ARROW_SIZE, useArrowStyles, usePopover } from './common';

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
            targetRef.current.measure(
                (
                    _fx: number,
                    _fy: number,
                    width: number,
                    height: number,
                    px: number,
                    py: number,
                ) => {
                    if (width !== 0 || height !== 0) {
                        const newLayout = { x: px, y: py, width, height };
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
                () => {
                    console.error('Failed to measure target element for Popover.');
                    targetLayoutRef.current = null;
                    calculateAndSetPosition();
                },
            );
        } else {
            targetLayoutRef.current = null;
            calculateAndSetPosition();
        }
    }, [targetRef, calculateAndSetPosition, targetLayoutRef]);

    useLayoutEffect(() => {
        if (isOpen) {
            measureTarget();
        }
    }, [isOpen, measureTarget]);

    useEffect(() => {
        if (!isOpen) return;
        const subscription = Dimensions.addEventListener('change', measureTarget);
        return () => {
            if (typeof subscription?.remove === 'function') {
                subscription.remove();
            }
        };
    }, [isOpen, measureTarget]);

    useEffect(() => {
        if (!isOpen || Platform.OS === 'web') return;
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                setTimeout(measureTarget, 50);
            }
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            if (typeof subscription?.remove === 'function') {
                subscription.remove();
            }
        };
    }, [isOpen, measureTarget]);

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

    const handleOutsidePress = () => {
        if (isOpen && onClose) {
            onClose();
        }
    };

    return (
        <Portal>
            <Pressable onPress={handleOutsidePress} style={styles.overlay} />

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
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    popoverContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 100,
        opacity: 0,
        top: -9999,
        left: -9999,
    },
});

export default memo(Popover);
