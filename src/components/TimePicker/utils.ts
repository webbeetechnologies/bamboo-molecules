import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { circleSize } from './timeUtils';

type TimePickerCustomProps = {
    container?: ViewStyle;
    clockContainer?: ViewStyle;
};

// TODO: cleanup hardcoded values
export const timePickerStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'landScape' | 'landScapeWithoutClock',
    TimePickerCustomProps
> = {
    container: {
        alignItems: 'center',
    },
    clockContainer: {
        paddingTop: 'spacings.9',
        paddingLeft: 'spacings.3',
        paddingRight: 'spacings.3',
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
        landScapeWithoutClock: {
            container: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24 * 3 + 96 * 2 + 12,
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
        borderRadius: 'shapes.corner.full' as unknown as number,
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
    rippleColor?: string;
    container?: ViewStyle;
    input?: TextStyle;
    button?: ViewStyle;
};

export const timePickerInputStyles: ComponentStylePropWithVariants<
    TextStyle,
    'highlighted',
    TimePickerInputCustomProps
> = {
    rippleColor: 'colors.onPrimaryContainer',

    container: {
        position: 'relative',
    },
    input: {
        fontSize: 'typescale.displayLarge.fontSize' as unknown as number,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 96,
        height: 80,
        backgroundColor: 'colors.surfaceVariant',
        color: 'colors.onSurface',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
    button: {
        overflow: 'hidden',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },

    states: {
        highlighted: {
            input: {
                backgroundColor: 'colors.primaryContainer',
                color: 'colors.primary',
            },
        },
    },
};

type TimePickerClockCustomProps = {
    clock?: ViewStyle;
    middlePoint?: ViewStyle;
    center?: ViewStyle;
    endPoint?: ViewStyle;
    line?: ViewStyle;
};

export const timePickerClockStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    TimePickerClockCustomProps
> = {
    clock: {
        height: circleSize,
        width: circleSize,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 'shapes.corner.full' as unknown as number,
        backgroundColor: 'colors.surfaceVariant',
    },
    middlePoint: {
        borderRadius: 'spacings.1' as unknown as number,
        height: 8,
        width: 8,
        backgroundColor: 'colors.primary',
    },
    center: { justifyContent: 'center', alignItems: 'center' },
    endPoint: {
        borderRadius: 'shapes.corner.full' as unknown as number,
        height: 30,
        width: 30,
        position: 'absolute',
        right: 0,
        bottom: -14,
        backgroundColor: 'colors.primary',
    },
    line: {
        position: 'absolute',
        marginBottom: -1,
        height: 2,
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
        backgroundColor: 'colors.primary',
    },
};

type TimePickerClockHoursCustomProps = {
    activeTextColor?: string;

    outerHourRoot?: ViewStyle;
    outerHourInner?: ViewStyle;
    innerHourRoot?: ViewStyle;
    innerHourInner?: ViewStyle;
    innerHourText?: TextStyle;
};

export const timePickerClockHoursStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    TimePickerClockHoursCustomProps
> = {
    activeTextColor: 'colors.onPrimary',

    outerHourRoot: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        width: 50,
        height: 50,
        marginLeft: -25,
        marginTop: -25,

        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    outerHourInner: {
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourRoot: {
        position: 'absolute',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -20,
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourInner: {
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourText: { fontSize: 13 },
};

type TimePickerClockMinutesCustomProps = {
    activeTextColor?: string;
    outerHourRoot?: ViewStyle;
    outerHourInner?: ViewStyle;
    innerHourRoot?: ViewStyle;
    innerHourInner?: ViewStyle;
    innerHourText?: TextStyle;
    textWhite?: TextStyle;
};

export const timePickerClockMinutesStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    TimePickerClockMinutesCustomProps
> = {
    activeTextColor: 'colors.onPrimary',

    outerHourRoot: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        width: 50,
        height: 50,
        marginLeft: -25,
        marginTop: -25,

        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    outerHourInner: {
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourRoot: {
        position: 'absolute',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -20,
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourInner: {
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    innerHourText: {
        fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
    },
    textWhite: { color: '#fff' },
};

type TimePickerAmPmSwitcherCustomProps = {
    container?: ViewStyle;
    switchSeparator?: ViewStyle;
    switchButton?: ViewStyle;
    switchButtonInner?: ViewStyle;
    text?: TextStyle & { typescale?: string };
};

export const timePickerAmPmSwitcherStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'selected',
    TimePickerAmPmSwitcherCustomProps
> = {
    container: {
        width: 50,
        height: 80,
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: 'colors.outline',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
    switchSeparator: {
        height: 1,
        width: 48,
        backgroundColor: 'colors.outline',
    },
    switchButton: {
        flex: 1,
    },
    switchButtonInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'colors.surface',
    },
    text: {
        typescale: 'typescale.bodyMedium',
        color: 'colors.onSurface',
    },

    states: {
        selected: {
            switchButtonInner: {
                backgroundColor: 'colors.tertiaryContainer',
            },
            text: {
                color: 'colors.onTertiaryContainer',
            },
        },
    },
};
