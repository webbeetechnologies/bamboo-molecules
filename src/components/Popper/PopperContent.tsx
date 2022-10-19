import {
    Children,
    cloneElement,
    forwardRef,
    Fragment,
    isValidElement,
    memo, ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef
} from "react";
import {useOverlayPosition} from '@react-native-aria/overlays';

import {usePopperContext} from "./PopperContext";
import {DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_WIDTH} from "./constants";
import {getContainerStyle} from "./utils";
import {ScrollView, StyleSheet} from "react-native";
import {useMolecules} from "../../hooks";
import type PopperArrow from "./PopperArrow";

const PopperContent = ({children, style, ...rest}: any, ref: any) => {
    const {View} = useMolecules();


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
    } = usePopperContext();



    const overlayRef = useRef(null);
    // const { top } = useSafeAreaInsets();

    const {
        overlayProps,
        rendered,
        arrowProps,
        placement,
        updatePosition,
        ...restO
    } = useOverlayPosition({
        scrollRef,
        targetRef: triggerRef,
        overlayRef,
        shouldFlip: shouldFlip,
        crossOffset: crossOffset,
        isOpen: isOpen,
        offset: offset,
        placement: placementProp as any,
        containerPadding: 0,
        onClose: closeOnScroll ? onClose : null,
        shouldOverlapWithTrigger,
    });

    console.log({
        overlayProps,
        rendered,
        arrowProps,
        placement,
        triggerRef,
        ...restO
    })



    const restElements: ReactNode[] = [];
    let arrowElement: ReactElement | null = null;

    useEffect(() => {
        if (isOpen) {
            updatePosition()
        }
    }, [isOpen])

    useEffect(() => {
        setOverlayRef && setOverlayRef(overlayRef);
    }, [overlayRef, setOverlayRef]);


    // Might have performance impact if there are a lot of siblings!
    // Shouldn't be an issue with popovers since it would have atmost 2. Arrow and Content.
    Children.forEach(children, (child) => {
        if (
            isValidElement(child) &&
            (child.type as typeof PopperArrow).displayName === 'PopperArrow'
        ) {
            arrowElement = cloneElement(child, {
                // @ts-ignore
                arrowProps,
                actualPlacement: placement,
            }) as ReactElement;
        } else {
            restElements.push(child);
        }
    });


    let arrowHeight = 0;
    let arrowWidth = 0;

    if (arrowElement !== null) {
        //@ts-ignore
        const props = arrowElement.props || {};
        arrowHeight = props.height || DEFAULT_ARROW_HEIGHT;
        arrowWidth = props.width || DEFAULT_ARROW_WIDTH;
    }


    const containerStyle = useMemo(
        () =>
            getContainerStyle({
                placement,
                arrowHeight,
                arrowWidth,
            }),
        [arrowHeight, arrowWidth, placement]
    );


    const overlayStyle = useMemo(
        () =>
            StyleSheet.create({
                overlay: {
                    ...overlayProps.style,
                    // To handle translucent android StatusBar
                    // marginTop: Platform.select({ android: top, default: 0 }),
                    opacity: rendered ? 1 : 0,
                    position: 'absolute',
                },
            }),
        [rendered, overlayProps.style]
    );


    if (!isOpen) return <Fragment></Fragment>

    return (
        <ScrollView ref={overlayRef} collapsable={false} style={overlayStyle.overlay}>
            {arrowElement}
            <View
                style={StyleSheet.flatten([containerStyle, style])}
                {...rest}
                ref={ref}
            >

                {restElements}
            </View>
        </ScrollView>
    );
};

export default memo(forwardRef(PopperContent))