import React, { memo, forwardRef } from 'react';
import { Modal } from '../Modal';
import type { IActionsheetProps } from './types';
import { Animated, PanResponder, Platform, View } from 'react-native';

const Actionsheet = (
    {
        children,
        hideDragIndicator = false,
        isOpen,
        disableOverlay,
        onClose,
        ...props
    }: IActionsheetProps,
    ref: any,
) => {
    //Fixing overlay position for Web due to scrollView issue
    const overlayStyle = Platform.OS === 'web' ? { position: 'fixed' } : {};
    const pan = React.useRef(new Animated.ValueXY()).current;
    const sheetHeight = React.useRef(0);

    const handleCloseRef = React.useRef(onClose);
    const handleCloseCallback = React.useCallback(() => {
        const handleCloseCurrent = handleCloseRef.current;
        //@ts-ignore
        return handleCloseCurrent();
    }, []);

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_evt, gestureState) => {
                return gestureState.dy > 15;
            },
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.y }], {
                        useNativeDriver: false,
                    })(e, gestureState);
                }
            },
            onPanResponderRelease: (_e, gestureState) => {
                // If sheet is dragged 1/4th of it's height, close it
                if (sheetHeight.current / 4 - gestureState.dy < 0) {
                    Animated.timing(pan, {
                        toValue: { x: 0, y: sheetHeight.current },
                        duration: 150,
                        useNativeDriver: true,
                    }).start(handleCloseCallback);

                    setTimeout(() => {
                        Animated.timing(pan, {
                            toValue: { x: 0, y: 0 },
                            duration: 150,
                            useNativeDriver: true,
                        }).start();
                    }, 300);
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        overshootClamping: true,
                        useNativeDriver: true,
                    }).start();
                }
            },
        }),
    ).current;

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            onDismiss={onClose}
            contentStyle={{
                maxHeight: 500,
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: 0,
            }}
            ref={ref}>
            <Animated.View
                style={{
                    transform: [{ translateY: pan.y }],
                    width: '100%',
                }}
                onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    sheetHeight.current = height;
                }}
                pointerEvents="box-none">
                <>
                    {!hideDragIndicator ? (
                        <>
                            {/* To increase the draggable area */}
                            <View {...panResponder.panHandlers} />
                        </>
                    ) : null}

                    <View ref={ref}>
                        {!hideDragIndicator ? (
                            <>
                                {/* Hack. Fix later. Add -2 negative margin to remove the padding added by ActionSheetContent */}
                                <View {...panResponder.panHandlers}>
                                    <View
                                        style={{
                                            width: 10,
                                            height: 5,
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 2,
                                        }}
                                    />
                                </View>
                            </>
                        ) : null}

                        {children}
                    </View>
                </>
            </Animated.View>
        </Modal>
    );
};

export default memo(forwardRef(Actionsheet));
