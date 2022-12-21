import { FC, forwardRef, memo, useId, useMemo, Suspense, lazy } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useMolecules, usePlatformType, useTheme } from '../../hooks';

import type { PopoverProps } from './types';
import { Popper } from '../Popper';
import { PopoverContext } from './PopoverContext';

const PopperContent = lazy(() => import('../Popper/PopperContent'));

export const popoverFactory = (componentName: string): FC<PopoverProps> =>
    forwardRef(
        (
            {
                onClose = () => {},
                isOpen,
                children,
                initialFocusRef,
                finalFocusRef,

                // TODO: Implement trap focus functionality
                // eslint-disable-next-line
                trapFocus = true,
                showArrow = true,
                overlayStyles = {},
                contentStyles = {},
                contentTextStyles = {},
                backdropStyles = {},
                arrowProps = {},
                initialTransition = {},
                animateTransition = {},
                exitTransition = {},
                triggerRef,
                ...props
            },
            ref: any,
        ) => {
            const { View, Overlay, PresenceTransition, Backdrop } = useMolecules();
            const styles = useComponentStyles(componentName, {
                arrow: arrowProps?.style,
                overlayStyles,
                content: contentStyles,
                contentText: contentTextStyles,
                backdrop: backdropStyles,
                initialTransition,
                animateTransition,
                exitTransition,
            });

            const { arrowPropsWithStyle, ...popoverStyles } = useMemo(() => {
                const { arrow, ...rest } = styles;

                return {
                    ...rest,
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

            const components = useMolecules();
            const platformType = usePlatformType();
            const themeContext = useTheme();

            const context = useMemo(() => {
                const { resolveComponentStyles, extractStyles, ...theme } = themeContext;
                return { resolveComponentStyles, extractStyles, theme, platformType, components };
            }, [themeContext, components, platformType]);

            return (
                <View ref={ref}>
                    <Overlay
                        style={popoverStyles.overlayStyles}
                        isOpen={isOpen}
                        onRequestClose={onClose}
                        useRNModalOnAndroid>
                        <PresenceTransition
                            initial={popoverStyles.initialTransition}
                            animate={popoverStyles.animateTransition}
                            exit={popoverStyles.exitTransition}
                            visible={isOpen}
                            style={StyleSheet.absoluteFill}>
                            <Backdrop onPress={onClose} style={popoverStyles.backdrop} />
                            <Popper
                                crossOffset={8}
                                offset={8}
                                isOpen={isOpen as boolean}
                                triggerRef={triggerRef}
                                {...props}
                                arrowProps={arrowPropsWithStyle}>
                                <PopoverContext.Provider value={popoverContextValue}>
                                    <Suspense>
                                        <PopperContent
                                            context={context}
                                            style={popoverStyles.content}
                                            contentTextStyles={popoverStyles.contentText}
                                            arrowProps={arrowProps}
                                            showArrow={showArrow}>
                                            {/* <FocusScope contain={trapFocus} restoreFocus> */}
                                            {children}
                                            {/* </FocusScope> */}
                                        </PopperContent>
                                    </Suspense>
                                </PopoverContext.Provider>
                            </Popper>
                        </PresenceTransition>
                    </Overlay>
                </View>
            );
        },
    );

export default memo(popoverFactory('Popover'));
