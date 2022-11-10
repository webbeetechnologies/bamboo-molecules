import { useMemo, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Color from 'color';

import { useCurrentTheme, useMolecules } from '../../hooks';
import { useSwitchColors } from './timeUtils';
import { DisplayModeContext } from './TimePicker';

export default function AmPmSwitcher({
    onChange,
    hours,
}: {
    hours: number;
    onChange: (newHours: number) => any;
}) {
    const { setMode, mode } = useContext(DisplayModeContext);
    const theme = useCurrentTheme();

    const { containerStyle, switchSeparatorStyle } = useMemo(() => {
        const backgroundColor = theme.dark
            ? Color(theme.colors.surface).lighten(1.2).hex()
            : Color(theme.colors.surface).darken(0.1).hex();

        return {
            containerStyle: [
                styles.root,
                {
                    borderColor: backgroundColor,
                    borderRadius: theme.roundness,
                } as any,
            ],
            switchSeparatorStyle: [styles.switchSeparator, { backgroundColor }],
        };
    }, [theme.colors.surface, theme.dark, theme.roundness]);

    const isAM = mode === 'AM';

    return (
        <View style={containerStyle}>
            <SwitchButton
                label="AM"
                onPress={() => {
                    setMode('AM');
                    if (hours - 12 >= 0) {
                        onChange(hours - 12);
                    }
                }}
                selected={isAM}
                disabled={isAM}
            />
            <View style={switchSeparatorStyle} />
            <SwitchButton
                label="PM"
                onPress={() => {
                    setMode('PM');
                    if (hours + 12 <= 24) {
                        onChange(hours + 12);
                    }
                }}
                selected={!isAM}
                disabled={!isAM}
            />
        </View>
    );
}

function SwitchButton({
    label,
    onPress,
    selected,
    disabled,
}: {
    label: string;
    onPress: (() => any) | undefined;
    selected: boolean;
    disabled: boolean;
}) {
    const theme = useCurrentTheme();
    const { TouchableRipple, Text } = useMolecules();
    const { backgroundColor, color } = useSwitchColors(selected);

    const { switchButtonInnerStyle, textStyle } = useMemo(() => {
        return {
            switchButtonInnerStyle: [styles.switchButtonInner, { backgroundColor }],
            textStyle: [
                {
                    ...theme.typescale.bodyMedium,
                    color: color,
                },
            ],
        };
    }, [backgroundColor, color, theme.typescale.bodyMedium]);

    return (
        <TouchableRipple
            onPress={onPress}
            style={styles.switchButton}
            accessibilityLabel={label}
            // @ts-ignore old React Native versions
            accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
            // @ts-ignore old React Native versions
            accessibilityComponentType="button"
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}>
            <View style={switchButtonInnerStyle}>
                <Text selectable={false} style={textStyle}>
                    {label}
                </Text>
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    root: {
        width: 50,
        height: 80,
        borderWidth: 1,
        overflow: 'hidden',
    },
    switchSeparator: {
        height: 1,
        width: 48,
    },
    switchButton: {
        flex: 1,
    },
    switchButtonInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
