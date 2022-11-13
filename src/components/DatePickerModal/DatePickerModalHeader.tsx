import { useMemo } from 'react';
import { Animated, SafeAreaView, ViewStyle } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';

export interface DatePickerModalHeaderProps {
    disableSafeTop?: boolean;
    saveLabel?: string;
    saveLabelDisabled?: boolean;
    uppercase?: boolean;
    onDismiss: () => void;
    onSave: () => void;
    closeIcon?: string;
}

export default function DatePickerModalHeader(props: DatePickerModalHeaderProps) {
    const { disableSafeTop, closeIcon = 'close' } = props;
    const { Button, View, IconButton } = useMolecules();
    const componentStyles = useComponentStyles(
        'DatePickerModal_Header',
        {},
        {
            states: {
                disableSafeTop: !!disableSafeTop,
            },
        },
    );

    const saveLabel = props.saveLabel || 'Save';

    const {
        animatedContainerStyle,
        safeContentStyle,
        appBarHeaderStyle,
        iconButtonStyle,
        buttonStyle,
    } = useMemo(() => {
        const { color, animated, safeContent, appbarHeader } = componentStyles;

        return {
            iconButtonStyle: { color },
            buttonStyle: { color },
            animatedContainerStyle: animated,
            safeContentStyle: safeContent,
            appBarHeaderStyle: appbarHeader,
        };
    }, [componentStyles]);

    return (
        <>
            <Animated.View style={animatedContainerStyle}>
                <SafeAreaView style={safeContentStyle}>
                    <View style={appBarHeaderStyle}>
                        <IconButton
                            name={closeIcon}
                            accessibilityLabel={'Close'}
                            onPress={props.onDismiss}
                            style={iconButtonStyle as ViewStyle}
                            testID="date-picker-close"
                        />
                        <Button
                            style={buttonStyle as ViewStyle}
                            onPress={props.onSave}
                            disabled={props.saveLabelDisabled || false}
                            uppercase={props.uppercase || true}
                            testID="dates-save">
                            {saveLabel}
                        </Button>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </>
    );
}
