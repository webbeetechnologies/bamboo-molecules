import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { circleSize } from './timeUtils';

type TimePickerCustomProps = {
    container?: ViewStyle;
    clockContainer?: ViewStyle;
};

export const timePickerStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'landScape',
    TimePickerCustomProps
> = {
    container: {},
    clockContainer: {
        paddingTop: 36,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
    },
    states: {
        landScape: {
            container: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24 * 3 + 96 * 2 + 52 + circleSize,
            },
        },
    },
};

type TimePickerInputsCustomProps = {
    spaceBetweenInputsAndSwitcher?: ViewStyle;
    inputContainer?: ViewStyle;
    hoursAndMinutesSeparator?: TextStyle;
    spaceDot?: ViewStyle;
    dot?: ViewStyle;
    betweenDot?: ViewStyle;
};

export const timePickerInputsStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'landScape',
    TimePickerInputsCustomProps
> = {
    spaceBetweenInputsAndSwitcher: { width: 12 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hoursAndMinutesSeparator: {
        fontSize: 65,
        width: 24,
        alignItems: 'center',
    },
    spaceDot: {
        flex: 1,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: 'colors.onSurface',
    },
    betweenDot: {
        height: 12,
    },
    states: {
        landScape: {
            inputContainer: {
                flex: 1,
            },
        },
    },
};

type TimePickerInputCustomProps = {
    container?: ViewStyle;
    input?: TextStyle;
    buttonOverlay?: ViewStyle;
};

export const timePickerInputStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    TimePickerInputCustomProps
> = {
    container: { position: 'relative', height: 80, width: 96 },
    input: {
        fontSize: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 96,
        height: 80,
        borderRadius: 'roundness.1' as unknown as number,
    },
    buttonOverlay: {
        overflow: 'hidden',
        borderRadius: 'roundness.1' as unknown as number,
    },
};
