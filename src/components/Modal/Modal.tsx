import { useRef, useEffect, ReactNode, useCallback, useMemo, memo, forwardRef } from 'react';
import {
    Animated,
    // Easing,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewProps,
    ViewStyle,
} from 'react-native';

import type { MD3Elevation } from '../../core/theme/types';
import { useBackHandler, useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {
    /**
     * Determines whether clicking outside the modal dismiss it.
     */
    dismissible?: boolean;
    /**
     * Accessibility label for the overlay. This is read by the screen reader when the user taps outside the modal.
     */
    overlayAccessibilityLabel?: string;
    /**
     * content elevation
     */
    elevation?: MD3Elevation;
    /**
     * to determine whether the modal is visible or not
     */
    isOpen: boolean | undefined;
    /**
     * onClose function will be trigger when the modal is dismissed
     */
    onClose?: () => void;
    /**
     * Content of the `Modal`.
     */
    children: ReactNode;
    /**
     * Style for the content of the modal
     */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * Size of the modal
     * md - width and height - auto
     * lg - maxWidth:600, maxHeight:800
     */
    size?: 'md' | 'lg';
    /**
     * Style for the wrapper of the modal.
     * Use this prop to change the default wrapper style or to override safe area insets with marginTop and marginBottom.
     */
    style?: StyleProp<ViewStyle>;
    // /**
    //  * Duration of the animations in the modal
    //  * @default 220
    //  * */
    // animationDuration?: number;
    /**
     * testID to be used on tests.
     */
    testID?: string;
};

// const DEFAULT_DURATION = 220;

function Modal(
    {
        dismissible = true,
        isOpen = false,
        overlayAccessibilityLabel = 'Close modal',
        onClose,
        children,
        contentContainerStyle: contentContainerStyleProp,
        elevation,
        size = 'md',
        style,
        // animationDuration = DEFAULT_DURATION,
        testID = 'modal',
        ...rest
    }: Props,
    ref: any,
) {
    const { Surface, View, TouchableWithoutFeedback } = useMolecules();
    const componentStyles = useComponentStyles('Modal', style, {
        size,
    });

    const visibleRef = useRef<boolean>(isOpen);
    // const prevVisible = useRef<boolean | null>(null);
    // const opacityRef = useRef(new Animated.Value(isOpen ? 1 : 0));
    const hideModalRef = useRef<() => void>(() => {});

    const dimensions = useWindowDimensions();

    const { backdropStyle, contentContainerStyle, contentStyle } = useMemo(() => {
        const {
            animationScale: _animationScale = 1,
            backdrop,
            contentContainer,
            modalContent,
            ...restStyle
        } = componentStyles;

        return {
            animationScale: _animationScale,
            backdropStyle: [
                backdrop,
                {
                    // @ts-ignore to resolve maximum callstack exceeded issue
                    // TODO - find out why this is happening(it isn't happening on contentStyle)
                    opacity: 1,
                },
            ],
            contentContainerStyle: [
                StyleSheet.absoluteFill,
                contentContainer,
                contentContainerStyleProp,
            ],
            contentStyle: [modalContent, { width: dimensions.width, opacity: 1 }, restStyle],
            style: restStyle,
        };
    }, [componentStyles, contentContainerStyleProp, dimensions.width]);

    const handleBack = useCallback(() => {
        if (dismissible) {
            hideModalRef.current();
        }
        return true;
    }, [dismissible]);

    useBackHandler({
        enabled: isOpen,
        callback: handleBack,
    });

    // const showModal = useCallback(() => {
    //     Animated.timing(opacityRef.current, {
    //         toValue: 1,
    //         duration: animationScale * animationDuration,
    //         easing: Easing.out(Easing.cubic),
    //         useNativeDriver: true,
    //     }).start();
    // }, [animationDuration, animationScale, opacityRef]);

    const hideModal = useCallback(() => {
        // Animated.timing(opacityRef.current, {
        //     toValue: 0,
        //     duration: animationScale * animationDuration,
        //     easing: Easing.out(Easing.cubic),
        //     useNativeDriver: true,
        // }).start(({ finished }) => {
        //     if (!finished) {
        //         return;
        //     }

        //     if (isOpen && onClose) {
        //         onClose();
        //     }
        // });

        if (isOpen && onClose) {
            onClose();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        hideModalRef.current = hideModal;
    }, [hideModal]);

    useEffect(() => {
        visibleRef.current = isOpen;
    });

    // useEffect(() => {
    //     if (prevVisible.current !== isOpen) {
    //         if (isOpen) {
    //             showModal();
    //         } else {
    //             hideModal();
    //         }
    //     }
    //     prevVisible.current = isOpen;
    // }, [hideModal, showModal, isOpen]);

    if (!isOpen) return null;

    return (
        <View
            pointerEvents={isOpen ? 'auto' : 'none'}
            accessibilityViewIsModal
            accessibilityLiveRegion="polite"
            style={StyleSheet.absoluteFill}
            onAccessibilityEscape={hideModal}
            testID={testID}
            ref={ref}
            {...rest}>
            <TouchableWithoutFeedback
                accessibilityLabel={overlayAccessibilityLabel}
                accessibilityRole="button"
                disabled={!dismissible}
                onPress={dismissible ? hideModal : undefined}
                importantForAccessibility="no">
                <Animated.View testID={`${testID}-backdrop`} style={backdropStyle} />
            </TouchableWithoutFeedback>
            <View
                style={contentContainerStyle}
                pointerEvents="box-none"
                testID={`${testID}-contentContainer`}>
                <Surface style={contentStyle} elevation={elevation} testID={`${testID}-content`}>
                    {children}
                </Surface>
            </View>
        </View>
    );
}

export default memo(forwardRef(Modal));
