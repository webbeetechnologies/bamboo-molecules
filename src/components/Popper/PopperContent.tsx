import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    memo,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { StyleSheet, TextStyle, ViewProps, ViewStyle } from 'react-native';
import { useOverlayPosition } from '@react-native-aria/overlays';

import { useMolecules } from '../../hooks';
import type { SurfaceProps } from '../Surface';
import PopperArrow from './PopperArrow';
import { usePopperContext } from './PopperContext';
import { getContainerStyle } from './utils';
import type { IPlacement } from './types';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_WIDTH } from './constants';

type PopperContentProps = SurfaceProps & {
    arrowProps?: ViewProps;
    showArrow?: boolean;
    contentTextStyles?: TextStyle;
    numberOfLines?: number;
    overlayStyles?: ViewStyle;
};

const PopperContent = (
    {
        children,
        style,
        showArrow,
        contentTextStyles,
        numberOfLines,
        overlayStyles,
        ...rest
    }: PopperContentProps,
    ref: any,
) => {
    const { Text, View, Surface } = useMolecules();

    const {
        isOpen,
        triggerRef,
        shouldFlip,
        crossOffset,
        offset,
        scrollRef,
        closeOnScroll = true,
        placement: placementProp,
        setIsOpen,
        shouldOverlapWithTrigger,
        setOverlayRef,
        arrowProps: popperArrowProps,
    } = usePopperContext();

    const overlayRef = useRef(null);
    // const { top } = useSafeAreaInsets();

    const onClose = useCallback(() => {
        setIsOpen?.(false);
    }, [setIsOpen]);

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

    const onUpdate = useCallback(() => {
        updatePosition();
    }, [updatePosition]);

    useEffect(() => {
        if (isOpen) {
            onUpdate();
        }
    }, [isOpen, onUpdate]);

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
            containerStyle: [
                getContainerStyle({
                    placement,
                    arrowHeight,
                    arrowWidth,
                }),
                style,
            ],
        }),
        [style, arrowHeight, arrowWidth, placement, popperArrowProps, arrowProps],
    );

    const overlayStyle = useMemo(
        () =>
            StyleSheet.flatten([
                overlayProps.style,
                {
                    // To handle translucent android StatusBar
                    // marginTop: Platform.select({ android: top, default: 0 }),
                    opacity: rendered ? 1 : 0,
                    position: 'absolute' as 'absolute',
                },
                overlayStyles,
            ]),
        [overlayProps.style, overlayStyles, rendered],
    );

    if (!isOpen) return <View ref={overlayRef} />;

    return (
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
            <Surface elevation={2} style={containerStyle} {...rest} ref={ref} onLayout={onUpdate}>
                <Text style={contentTextStyles} numberOfLines={numberOfLines}>
                    {restElements}
                </Text>
            </Surface>
        </View>
    );
};
export default memo(forwardRef(PopperContent));
