import { useMemo } from 'react';
import { Animated, SafeAreaView, View } from 'react-native';

import { resolveStateVariant } from '../../utils';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { datePickerModalHeaderStyles } from './utils';

export interface DatePickerModalHeaderProps {
    disableSafeTop?: boolean;
    saveLabel?: string;
    saveLabelDisabled?: boolean;
    onClose: () => void;
    onSave: () => void;
    closeIcon?: string;
}

export default function DatePickerModalHeader(props: DatePickerModalHeaderProps) {
    const { disableSafeTop, closeIcon = 'close' } = props;

    datePickerModalHeaderStyles.useVariants({
        state: resolveStateVariant({
            disableSafeTop: !!disableSafeTop,
        }) as any,
    });

    const saveLabel = props.saveLabel || 'Save';

    const {
        animatedContainerStyle,
        safeContentStyle,
        appBarHeaderStyle,
        iconButtonStyle,
        buttonStyle,
    } = useMemo(() => {
        const { animated, safeContent, appbarHeader } = datePickerModalHeaderStyles;

        return {
            iconButtonStyle: { color: datePickerModalHeaderStyles.root.color },
            buttonStyle: { color: datePickerModalHeaderStyles.root.color },
            animatedContainerStyle: animated,
            safeContentStyle: safeContent,
            appBarHeaderStyle: appbarHeader,
        };
    }, []);

    return (
        <>
            <Animated.View style={animatedContainerStyle}>
                <SafeAreaView style={safeContentStyle}>
                    <View style={appBarHeaderStyle}>
                        <IconButton
                            name={closeIcon}
                            accessibilityLabel={'Close'}
                            onPress={props.onClose}
                            style={iconButtonStyle}
                            testID="date-picker-close"
                        />
                        <Button
                            variant="contained"
                            style={buttonStyle}
                            onPress={props.onSave}
                            disabled={props.saveLabelDisabled || false}
                            testID="dates-save">
                            {saveLabel}
                        </Button>
                    </View>
                </SafeAreaView>
            </Animated.View>
        </>
    );
}
