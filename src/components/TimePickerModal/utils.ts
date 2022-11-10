import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type TimePickerModalCustomProps = {
    keyboardView?: ViewStyle;
    modalContent?: ViewStyle;
    labelContainer?: ViewStyle;
    label?: TextStyle;
    timePickerContainer?: ViewStyle;
    footer?: ViewStyle;
    inputTypeToggle?: ViewStyle;
    fill?: ViewStyle;
};

export const timePickerModalStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    TimePickerModalCustomProps
> = {
    keyboardView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContent: {
        minWidth: 287,
        width: undefined,
        flex: undefined,
    },
    labelContainer: {
        height: 28,
        justifyContent: 'flex-end',
        paddingLeft: 'spacings.6',
        paddingRight: 'spacings.6',
    },
    label: {
        letterSpacing: 1,
        fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
        color: 'colors.onSurface',
    },
    timePickerContainer: {
        padding: 'spacings.6',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 'spacings.2',
        width: '100%',
    },
    inputTypeToggle: { margin: 'spacings.1' },
    fill: { flex: 1 },
};
