import { memo, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, Platform, StatusBar, ViewStyle } from 'react-native';
import color from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import DatePickerModalContent, {
    DatePickerModalContentMultiProps,
    DatePickerModalContentRangeProps,
    DatePickerModalContentSingleProps,
} from './DatePickerModalContent';

interface DatePickerModalProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
    style?: ViewStyle;
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
    const { View, Modal } = useMolecules();
    const dimensions = useWindowDimensions();

    const {
        visible,
        animationType,
        disableStatusBar,
        disableStatusBarPadding,
        locale = 'en',
        style: styleProp,
        ...rest
    } = props;

    const animationTypeCalculated =
        animationType ||
        Platform.select({
            web: 'none',
            default: 'slide',
        });

    const componentStyles = useComponentStyles('DatePickerModal', styleProp);

    const { containerStyle, headerStyle, isHeaderBackgroundLight } = useMemo(() => {
        const { header } = componentStyles;

        return {
            containerStyle: [StyleSheet.absoluteFill],
            headerStyle: [
                header,
                {
                    height: StatusBar.currentHeight,
                },
            ],
            isHeaderBackgroundLight: color(header?.backgroundColor).isLight(),
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle} pointerEvents="box-none">
            <Modal
                size={dimensions.width > 650 ? 'lg' : 'md'}
                animationType={animationTypeCalculated}
                transparent={true}
                visible={visible}
                onDismiss={rest.onDismiss}
                presentationStyle="overFullScreen"
                supportedOrientations={supportedOrientations}
                elevation={0}
                //@ts-ignore
                statusBarTranslucent={true}>
                <>
                    <>
                        {disableStatusBar ? null : (
                            <StatusBar
                                translucent={true}
                                barStyle={
                                    isHeaderBackgroundLight ? 'dark-content' : 'light-content'
                                }
                            />
                        )}
                    </>

                    <>{disableStatusBarPadding ? null : <View style={headerStyle} />}</>

                    <DatePickerModalContent
                        {...rest}
                        locale={locale}
                        disableSafeTop={disableStatusBar}
                    />
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

export default memo(DatePickerModal);
