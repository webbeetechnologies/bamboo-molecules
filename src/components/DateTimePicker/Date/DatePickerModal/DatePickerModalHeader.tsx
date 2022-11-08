import { useMemo } from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';

import { useMolecules } from '../../../../hooks';
import { useHeaderTextColor } from '../../utils';
import { getTranslation } from '../../translations/utils';

export interface DatePickerModalHeaderProps {
    disableSafeTop?: boolean;
    saveLabel?: string;
    saveLabelDisabled?: boolean;
    uppercase?: boolean;
    onDismiss: () => void;
    onSave: () => void;
    locale: string | undefined;
    closeIcon?: string;
}

export default function DatePickerModalHeader(props: DatePickerModalHeaderProps) {
    const { disableSafeTop, locale, closeIcon = 'close' } = props;
    const { Button, View, IconButton } = useMolecules();
    const saveLabel = props.saveLabel || getTranslation(locale, 'save');
    const color = useHeaderTextColor();

    const { safeContentStyle } = useMemo(() => {
        return {
            safeContentStyle: [styles.safeContent, disableSafeTop && styles.safeContentNoTop],
        };
    }, [disableSafeTop]);

    return (
        <>
            <Animated.View style={styles.animated}>
                <SafeAreaView style={safeContentStyle}>
                    <View style={styles.appbarHeader}>
                        <IconButton
                            name={closeIcon}
                            accessibilityLabel={getTranslation(locale, 'close')}
                            onPress={props.onDismiss}
                            style={{ color } as any}
                            testID="react-native-paper-dates-close"
                        />
                        <Button
                            style={{ color } as any}
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

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    animated: {
        paddingBottom: 0,
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 0,
    },
    safeContentNoTop: {
        paddingTop: 0,
    },
    header: {
        height: 75,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 12,
    },
    headerContentContainer: { marginTop: 5, flexDirection: 'row' },
    label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
    singleHeaderText: { color: '#fff', fontSize: 25 },
    rangeHeaderText: { color: '#fff', fontSize: 25 },
    headerTextFilled: { color: 'rgba(255,255,255,1)' },
    headerTextEmpty: { color: 'rgba(255,255,255,0.5)' },
    headerSeparator: {
        color: 'rgba(255,255,255,1)',
        fontSize: 25,
        paddingLeft: 6,
        paddingRight: 6,
    },
    appbarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 8,
        elevation: 0,
        backgroundColor: 'transparent',
    },
});
