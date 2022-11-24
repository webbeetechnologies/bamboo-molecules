import { memo, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, Platform, StatusBar, StatusBarStyle } from 'react-native';
import color from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import { DatePickerModalContent } from './DatePickerModalContent';
import type { DatePickerModalProps } from './types';

export function DatePickerModal(props: DatePickerModalProps) {
    const { View, Modal } = useMolecules();
    const dimensions = useWindowDimensions();

    const {
        isOpen,
        animationType,
        disableStatusBar,
        disableStatusBarPadding,
        locale = 'en',
        mode = 'single',
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

    const { containerStyle, headerStyle, barStyle } = useMemo(() => {
        const { header } = componentStyles;
        const isHeaderBackgroundLight = color(header?.backgroundColor).isLight();

        return {
            containerStyle: [StyleSheet.absoluteFill],
            headerStyle: [
                header,
                {
                    height: StatusBar.currentHeight,
                },
            ],
            barStyle: (isHeaderBackgroundLight
                ? 'dark-content'
                : 'light-content') as StatusBarStyle,
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle} pointerEvents="box-none">
            <Modal
                size={dimensions.width > 650 ? 'lg' : 'md'}
                animationType={animationTypeCalculated}
                transparent={true}
                isOpen={isOpen}
                onClose={rest.onClose}
                presentationStyle="overFullScreen"
                supportedOrientations={supportedOrientations}
                elevation={0}
                statusBarTranslucent={true}>
                <>
                    <>
                        {disableStatusBar ? null : (
                            <StatusBar translucent={true} barStyle={barStyle} />
                        )}
                    </>

                    <>{disableStatusBarPadding ? null : <View style={headerStyle} />}</>

                    <DatePickerModalContent
                        {...rest}
                        locale={locale}
                        mode={mode as any}
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
