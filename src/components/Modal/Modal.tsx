import { forwardRef, memo, useMemo } from 'react';
import {
    Modal as NativeModal,
    Platform,
    TouchableWithoutFeedback,
    ModalProps,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ModalProps & {
    /**
     * style for the contentContainer
     */
    style?: ViewStyle;
    /**
     * together with style prop, by setting width and height, can be used to position the modal content
     */
    contentStyle?: ViewStyle;
    /**
     * Size of the modal
     * md - width and height - auto
     * lg - maxWidth:600, maxHeight:800
     */
    size?: 'md' | 'lg';
};

const Modal = (
    {
        animationType,
        style: styleProp,
        children,
        contentStyle: contentStyleProp,
        size = 'md',
        ...rest
    }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Modal', styleProp, {
        size,
    });

    const { modalBackgroundStyle, contentContainerStyle, contentStyle } = useMemo(() => {
        const { modalBackground, contentContainer, modalContent, ...restStyle } = componentStyles;

        return {
            modalBackgroundStyle: [StyleSheet.absoluteFill, modalBackground],
            contentContainerStyle: [StyleSheet.absoluteFill, contentContainer, restStyle],
            contentStyle: [modalContent, contentStyleProp],
            style: restStyle,
        };
    }, [componentStyles, contentStyleProp]);

    const animationTypeCalculated =
        animationType ||
        Platform.select({
            web: 'none',
            default: 'slide',
        });

    return (
        <NativeModal
            supportedOrientations={supportedOrientations}
            animationType={animationTypeCalculated}
            presentationStyle="overFullScreen"
            transparent={true}
            statusBarTranslucent={true}
            {...rest}
            ref={ref}
            onRequestClose={rest.onDismiss}>
            <>
                <TouchableWithoutFeedback onPress={rest.onDismiss}>
                    <View style={modalBackgroundStyle} />
                </TouchableWithoutFeedback>
                <View style={contentContainerStyle} pointerEvents="box-none">
                    <View style={contentStyle}>{children}</View>
                </View>
            </>
        </NativeModal>
    );
};

const supportedOrientations: any = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];

export default memo(forwardRef(Modal));
