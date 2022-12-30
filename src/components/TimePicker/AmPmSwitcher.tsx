import { useMemo, useContext, useCallback } from 'react';
import { View } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import { DisplayModeContext } from './TimePicker';

export default function AmPmSwitcher({
    onChange,
    hours,
}: {
    hours: number;
    onChange: (newHours: number) => any;
}) {
    const { setMode, mode } = useContext(DisplayModeContext);
    const componentStyles = useComponentStyles('TimePicker_AmPmSwitcher');

    const { containerStyle, switchSeparatorStyle, isAM } = useMemo(() => {
        const { container, switchSeparator } = componentStyles;

        return {
            containerStyle: container,
            switchSeparatorStyle: switchSeparator,
            isAM: mode === 'AM',
        };
    }, [componentStyles, mode]);

    const onSwitchButtonPress = useCallback(
        (period: 'AM' | 'PM') => {
            setMode(period);

            if (period === 'AM' && hours - 12 >= 0) {
                onChange(hours - 12);
                return;
            }

            if (period === 'PM' && hours + 12 <= 23) {
                onChange(hours + 12);
            }
        },
        [hours, onChange, setMode],
    );

    return (
        <View style={containerStyle}>
            <SwitchButton
                label="AM"
                onPress={() => onSwitchButtonPress('AM')}
                selected={isAM}
                disabled={isAM}
            />
            <View style={switchSeparatorStyle} />
            <SwitchButton
                label="PM"
                onPress={() => onSwitchButtonPress('PM')}
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
    const componentStyles = useComponentStyles(
        'TimePicker_AmPmSwitcher',
        {},
        {
            states: {
                selected,
            },
        },
    );
    const { TouchableRipple, Text } = useMolecules();

    const { switchButtonInnerStyle, switchButtonStyle, textStyle } = useMemo(() => {
        const { container, switchButton, switchButtonInner, text } = componentStyles;
        const { typescale, ..._textStyle } = text;

        return {
            containerStyle: container,
            switchButtonInnerStyle: switchButtonInner,
            switchButtonStyle: switchButton,
            textStyle: [_textStyle, typescale],
        };
    }, [componentStyles]);

    return (
        <TouchableRipple
            onPress={onPress}
            style={switchButtonStyle}
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
