import { forwardRef, memo, useId, useImperativeHandle, useMemo } from 'react';

import { useKeyboardDismissable } from '../../hooks';

import type { PopoverProps } from './types';
import { Popper } from '../Popper';
import { PopoverContext } from './PopoverContext';
import PopperContent from '../Popper/PopperContent';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Portal } from '../Portal';
import { Transition } from '../Animations';
import { Backdrop } from '../Backdrop';
import { defaultStyles } from './utils';

const emptyObj = {} as ViewStyle;

export const popoverFactory = (_styles: Record<string, any>) =>
    forwardRef(
        (
            {
                onClose = () => {},
                isOpen,
                children,
                initialFocusRef,
                finalFocusRef,

                // TODO: Implement trap focus functionality
                trapFocus: _trapFocus = true,
                showArrow = false,
                overlayStyles = emptyObj,
                contentStyles = emptyObj,
                contentTextStyles = emptyObj,
                backdropStyles = emptyObj,
                arrowProps = emptyObj,
                initialTransition = emptyObj,
                animateTransition = emptyObj,
                exitTransition = emptyObj,
                triggerRef,
                isKeyboardDismissable = true,
                popoverContentProps,
                backdropProps,
                name,
                ...props
            }: PopoverProps,
            ref: any,
        ) => {
            // const styles = useComponentStyles(componentName, {
            //     arrow: arrowProps?.style,
            //     overlayStyles,
            //     content: contentStyles,
            //     contentText: contentTextStyles,
            //     backdrop: backdropStyles,
            //     initialTransition,
            //     animateTransition,
            //     exitTransition,
            // });

            const styles = useMemo(
                () => ({
                    arrow: [_styles.arrow, arrowProps?.style],
                    overlayStyles: [_styles.overlayStyles, overlayStyles] as StyleProp<ViewStyle>,
                    content: [_styles.content, contentStyles],
                    contentText: [_styles.contentText, contentTextStyles],
                    backdrop: [_styles.backdrop, backdropStyles],
                    initialTransition: {
                        ..._styles.initialTransition,
                        ...initialTransition,
                    },
                    animateTransition: {
                        ..._styles.animateTransition,
                        ...animateTransition,
                    },
                    exitTransition: { ..._styles.exitTransition, ...exitTransition },
                }),
                [
                    animateTransition,
                    arrowProps?.style,
                    backdropStyles,
                    contentStyles,
                    contentTextStyles,
                    exitTransition,
                    initialTransition,
                    overlayStyles,
                ],
            );

            const { arrowPropsWithStyle, popoverStyles } = useMemo(() => {
                const { arrow, ...rest } = styles;

                return {
                    popoverStyles: rest,
                    arrowPropsWithStyle: {
                        ...arrowProps,
                        style: arrow,
                    },
                };
            }, [arrowProps, styles]);

            const popoverId = useId();

            const popoverContextValue = useMemo(() => {
                const popoverContentId = `${popoverId}-content`;

                return {
                    onClose: onClose,
                    initialFocusRef,
                    finalFocusRef,
                    popoverContentId,
                    bodyId: `${popoverContentId}-body`,
                    headerId: `${popoverContentId}-header`,
                };
            }, [onClose, initialFocusRef, finalFocusRef, popoverId]);

            useImperativeHandle(ref, () => popoverContextValue);

            useKeyboardDismissable({
                enabled: isOpen && isKeyboardDismissable,
                callback: onClose,
            });

            if (!isOpen) return null;

            const key = name ? `${name}:${popoverId}` : popoverId;
            return (
                <Portal name={key}>
                    <Transition
                        initial={popoverStyles.initialTransition}
                        animate={popoverStyles.animateTransition}
                        exit={popoverStyles.exitTransition}
                        visible={isOpen}
                        style={StyleSheet.absoluteFill}
                        {...popoverContentProps}>
                        <Backdrop
                            onPress={onClose}
                            style={popoverStyles.backdrop}
                            {...backdropProps}
                        />

                        <Popper
                            isOpen={isOpen}
                            triggerRef={triggerRef}
                            {...props}
                            arrowProps={arrowPropsWithStyle}>
                            <PopoverContext.Provider value={popoverContextValue}>
                                <PopperContent
                                    overlayStyles={styles.overlayStyles}
                                    style={popoverStyles.content}
                                    contentTextStyles={popoverStyles.contentText}
                                    arrowProps={arrowProps}
                                    showArrow={showArrow}>
                                    {/* <FocusScope contain={trapFocus} restoreFocus> */}
                                    {children}
                                    {/* </FocusScope> */}
                                </PopperContent>
                            </PopoverContext.Provider>
                        </Popper>
                    </Transition>
                </Portal>
            );
        },
    );

export default memo(popoverFactory(defaultStyles));
