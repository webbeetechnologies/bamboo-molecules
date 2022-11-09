import { memo, useMemo } from 'react';
import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
    Platform,
    StatusBar,
} from 'react-native';

import DatePickerModalContent, {
    DatePickerModalContentMultiProps,
    DatePickerModalContentRangeProps,
    DatePickerModalContentSingleProps,
} from './DatePickerModalContent';
import { useHeaderBackgroundColor, useHeaderColorIsLight } from '../../utils';
import { useCurrentTheme } from '../../../../hooks';

interface DatePickerModalProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
}

export interface DatePickerModalSingleProps
    extends DatePickerModalContentSingleProps,
        DatePickerModalProps {}

export interface DatePickerModalMultiProps
    extends DatePickerModalContentMultiProps,
        DatePickerModalProps {}

export interface DatePickerModalRangeProps
    extends DatePickerModalContentRangeProps,
        DatePickerModalProps {}

export type Props =
    | DatePickerModalRangeProps
    | DatePickerModalSingleProps
    | DatePickerModalMultiProps;

export function DatePickerModal(props: Props) {
    const theme = useCurrentTheme();
    const dimensions = useWindowDimensions();
    const { visible, animationType, disableStatusBar, disableStatusBarPadding, ...rest } = props;
    const animationTypeCalculated =
        animationType ||
        Platform.select({
            web: 'none',
            default: 'slide',
        });

    const isLight = useHeaderColorIsLight();
    const headerBackgroundColor = useHeaderBackgroundColor();

    const {
        containerStyle,
        modalBackgroundStyle,
        contentContainerStyle,
        modalContentStyle,
        headerStyle,
    } = useMemo(() => {
        return {
            containerStyle: [StyleSheet.absoluteFill],
            modalBackgroundStyle: [
                StyleSheet.absoluteFill,
                styles.modalBackground,
                { backgroundColor: theme.colors.backdrop },
            ],
            contentContainerStyle: [StyleSheet.absoluteFill, styles.modalRoot],
            modalContentStyle: [
                styles.modalContent,
                { backgroundColor: theme.colors.surface },
                dimensions.width > 650 ? styles.modalContentBig : null,
            ],
            headerStyle: [
                {
                    height: StatusBar.currentHeight,
                    backgroundColor: headerBackgroundColor,
                },
            ],
        };
    }, [dimensions.width, headerBackgroundColor, theme.colors.backdrop, theme.colors.surface]);

    return (
        <View style={containerStyle} pointerEvents="box-none">
            <Modal
                animationType={animationTypeCalculated}
                transparent={true}
                visible={visible}
                onRequestClose={rest.onDismiss}
                presentationStyle="overFullScreen"
                supportedOrientations={supportedOrientations}
                //@ts-ignore
                statusBarTranslucent={true}>
                <>
                    <TouchableWithoutFeedback onPress={rest.onDismiss}>
                        <View style={modalBackgroundStyle} />
                    </TouchableWithoutFeedback>
                    <View style={contentContainerStyle} pointerEvents="box-none">
                        <View style={modalContentStyle}>
                            <>
                                {disableStatusBar ? null : (
                                    <StatusBar
                                        translucent={true}
                                        barStyle={isLight ? 'dark-content' : 'light-content'}
                                    />
                                )}
                            </>

                            <>{disableStatusBarPadding ? null : <View style={headerStyle} />}</>

                            <DatePickerModalContent {...rest} disableSafeTop={disableStatusBar} />
                        </View>
                    </View>
                </>
            </Modal>
        </View>
    );
}
const supportedOrientations: any = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];

const styles = StyleSheet.create({
    modalRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalBackground: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        width: '100%',
    },
    modalContentBig: {
        maxWidth: 600,
        maxHeight: 800,
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
    },
});

export default memo(DatePickerModal);
