import { forwardRef, memo, useMemo } from 'react';
import {
    Modal as NativeModal,
    Platform,
    TouchableWithoutFeedback,
    ModalProps,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import type { SurfaceProps } from '../Surface';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = Omit<ModalProps, 'visible' | 'onDismiss' | 'onRequestClose'> & {
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
    /**
     * content elevation
     */
    elevation?: SurfaceProps['elevation'];
    /**
     * to determine whether the modal is visible or not
     */
    isOpen: boolean | undefined;
    /**
     * onClose function will be trigger when the modal is dismissed
     */
    onClose?: () => void;
};

const Modal = (
    {
        animationType,
        style: styleProp,
        children,
        contentStyle: contentStyleProp,
        size = 'md',
        elevation = 2,
        isOpen,
        onClose,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, Surface } = useMolecules();
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
            visible={!!isOpen}
            ref={ref}
            onRequestClose={onClose}>
            <>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={modalBackgroundStyle} />
                </TouchableWithoutFeedback>
                <View style={contentContainerStyle} pointerEvents="box-none">
                    <Surface style={contentStyle} elevation={elevation}>
                        {children}
                    </Surface>
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
