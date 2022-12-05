import React, {
    Children,
    cloneElement,
    forwardRef,
    Fragment,
    isValidElement,
    memo,
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';

import { usePopperContext } from './PopperContext';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_WIDTH } from './constants';
import { getContainerStyle } from './utils';
import { StyleSheet } from 'react-native';
import { useMolecules } from '../../hooks';
import PopperArrow from './PopperArrow';
import type { IPlacement } from './types';
import { extendTheme } from '../../core';

const ProvideMolecules = React.lazy(() => import('../../core/ProvideMolecules'));

const PopperContent = (
    { children, style, showArrow, contentTextStyles, context, ...rest }: any,
    ref: any,
) => {
    const { Text, View } = useMolecules();

    const {
        isOpen,
        triggerRef,
        shouldFlip,
        crossOffset,
        offset,
        scrollRef,
        closeOnScroll = true,
        placement: placementProp,
        onClose,
        shouldOverlapWithTrigger,
        setOverlayRef,
        arrowProps: popperArrowProps,
    } = usePopperContext();

    const overlayRef = useRef(null);
    // const { top } = useSafeAreaInsets();

    const { overlayProps, rendered, arrowProps, placement, updatePosition } = useOverlayPosition({
        scrollRef,
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: shouldFlip,
        crossOffset: crossOffset,
        isOpen: isOpen,
        offset: offset,
        placement: placementProp as IPlacement,
        containerPadding: 0,
        onClose: closeOnScroll ? onClose : undefined,
        shouldOverlapWithTrigger,
    });

    const restElements: ReactNode[] = [];
    let arrowElement: ReactElement | null = null;

    useEffect(() => {
        if (isOpen) {
            updatePosition();
        }
    }, [isOpen, updatePosition]);

    useEffect(() => {
        setOverlayRef && setOverlayRef(overlayRef);
    }, [overlayRef, setOverlayRef]);

    // Might have performance impact if there are a lot of siblings!
    // Shouldn't be an issue with popovers since it would have atmost 2. Arrow and Content.
    Children.forEach(children, child => {
        if (
            isValidElement(child) &&
            (child.type as typeof PopperArrow).displayName === 'PopperArrow'
        ) {
            arrowElement = cloneElement(child, {
                // @ts-ignore
                arrowProps,
                actualPlacement: placement,
            });
        } else {
            restElements.push(child);
        }
    });

    let arrowHeight = 0;
    let arrowWidth = 0;

    if (arrowElement !== null) {
        const props = (arrowElement as ReactElement).props || {};
        arrowHeight = props.height ?? DEFAULT_ARROW_HEIGHT;
        arrowWidth = props.width ?? DEFAULT_ARROW_WIDTH;
    }

    const { containerStyle, arrowStyle } = useMemo(
        () => ({
            arrowStyle: [popperArrowProps?.style, arrowProps.style],
            containerStyle: getContainerStyle({
                placement,
                arrowHeight,
                arrowWidth,
            }),
        }),
        [arrowHeight, arrowWidth, placement, popperArrowProps, arrowProps],
    );

    const overlayStyle = useMemo(
        () => ({
            ...overlayProps.style,
            // To handle translucent android StatusBar
            // marginTop: Platform.select({ android: top, default: 0 }),
            opacity: rendered ? 1 : 0,
            position: 'absolute' as 'absolute',
        }),
        [rendered, overlayProps.style],
    );

    const { theme: contextTheme, ...restContext } = context;
    const theme = useMemo(() => extendTheme(contextTheme), [contextTheme]);

    if (!isOpen) return <View ref={overlayRef} />;

    return (
        <ProvideMolecules theme={theme} {...restContext}>
            <View ref={overlayRef} collapsable={false} style={overlayStyle}>
                {arrowElement ??
                    (showArrow && (
                        <PopperArrow
                            {...popperArrowProps}
                            {...arrowProps}
                            style={arrowStyle}
                            width={DEFAULT_ARROW_WIDTH}
                            height={DEFAULT_ARROW_HEIGHT}
                            actualPlacement={placement as IPlacement}
                        />
                    ))}
                <View style={StyleSheet.flatten([containerStyle, style])} {...rest} ref={ref}>
                    <Text style={contentTextStyles}>{restElements}</Text>
                </View>
            </View>
        </ProvideMolecules>
    );
};

export default memo(forwardRef(PopperContent));
