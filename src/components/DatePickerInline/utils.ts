import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { daySize } from './dateUtils';
import { dayNamesHeight } from './DayNames';
import { montHeaderHeight } from './Month';

type States = '';

type CustomProps = {
    roundness?: string;
    headerBackgroundColor?: string;

    container?: ViewStyle;
};

export const datePickerStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    roundness: 'shapes.corner.extraSmall',
    headerBackgroundColor: 'colors.surface',

    container: {
        minHeight: 360,
        minWidth: 360,
    },
};

type DatePickerMonthCustomProps = {
    monthLabel?: TextStyle & { typescale: string };
    yearButton?: TextStyle;
    yearButtonInner?: ViewStyle;
    emptyDay?: ViewStyle;
    month?: ViewStyle;
    monthHeader?: ViewStyle;
    monthButton?: ViewStyle;
    buttonContainerStyle?: ViewStyle;
};

export const datePickerMonthStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerMonthCustomProps
> = {
    monthLabel: {
        typescale: 'typescale.bodyMedium',
        opacity: 0.7,
    },
    yearButton: {
        alignSelf: 'flex-start',
        marginLeft: 6,
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    yearButtonInner: {
        paddingLeft: 'spacings.4',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    month: {},
    monthHeader: {
        height: montHeaderHeight,
        justifyContent: 'center',
        overflow: 'hidden',
    },

    backgroundColor: 'colors.surface',
    monthButton: {
        borderRadius: 'shapes.corner.extraLarge' as unknown as number,
        overflow: 'hidden',
    },
    buttonContainerStyle: { flexDirection: 'row', alignItems: 'center' },
};

type DatePickerYearPickerCustomProps = {
    yearContainer?: ViewStyle;
    yearButton?: ViewStyle;
    yearInner?: ViewStyle;
    yearLabel?: TextStyle;
};

export const datePickerYearPickerStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerYearPickerCustomProps
> = {
    backgroundColor: 'colors.surface',

    yearContainer: {
        alignItems: 'center',
    },
    yearButton: {
        borderRadius: 'shapes.corner.extraLarge' as unknown as number,
        overflow: 'hidden',
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearInner: {
        borderRadius: 'shapes.corner.extraLarge' as unknown as number,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearLabel: {
        fontSize: 16,
    },
};

type DatePickerDayState = 'disabled' | 'selected' | 'inRange';

type DatePickerDayCustomProps = {
    containerStyle?: ViewStyle;
    disabled?: TextStyle;
    button?: ViewStyle;
    day?: ViewStyle;
    today?: ViewStyle;
    text?: TextStyle;
    flex1?: TextStyle;
};

export const datePickerDayStyles: ComponentStylePropWithVariants<
    TextStyle,
    DatePickerDayState,
    DatePickerDayCustomProps
> = {
    containerStyle: {
        flex: 1,
        flexBasis: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    disabled: {
        opacity: 0.3,
    },
    button: {
        width: daySize,
        height: daySize,
        overflow: 'hidden',
        borderRadius: daySize / 2,
    },
    day: {
        flexBasis: 0,
        flex: 1,
        borderRadius: daySize / 2,
        width: daySize,
        height: daySize,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    today: {
        borderColor: 'colors.primary',
    },
    text: {},
    flex1: {
        flex: 1,
    },

    states: {
        disabled: {
            containerStyle: {
                opacity: 0.3,
            },
        },

        selected: {
            text: {
                color: 'colors.onPrimary',
            },
            day: {
                backgroundColor: 'colors.primary',
            },
        },

        inRange: {
            day: {
                borderColor: 'colors.primary',
            },
            button: {
                backgroundColor: 'colors.primary',
            },
            today: {
                borderColor: 'colors.primary',
            },
            text: {
                color: 'colors.onPrimary',
            },
        },
    },
};

export const datePickerDayEmptyStyles: ComponentStylePropWithVariants<ViewStyle> = {
    flex: 1,
    flexBasis: 0,
};

export const datePickerWeekStyles: ComponentStylePropWithVariants<ViewStyle> = {
    flexDirection: 'row',
    height: daySize,
};

type DatePickerHeaderCustomProps = {
    datePickerHeader: ViewStyle;
    buttonContainer: ViewStyle;
    buttonWrapper: ViewStyle;
    spacer: ViewStyle;
    yearButtonStyle?: ViewStyle;
    yearInnerStyle?: ViewStyle;
    yearLabelStyle?: TextStyle & { typescale?: string };
};

export const datePickerHeaderStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerHeaderCustomProps
> = {
    datePickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 'spacings.5',
    },
    buttonContainer: {
        height: 56,
        marginTop: 'spacings.1',
        marginBottom: 'spacings.2',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {},
    spacer: { flex: 1 },
    yearLabelStyle: {
        typescale: 'typescale.bodyMedium',
        opacity: 0.7,
    },
    yearButtonStyle: {
        alignSelf: 'flex-start',
        marginLeft: 6,
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    yearInnerStyle: {
        paddingLeft: 'spacings.4',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
};

type DatePickerDayNameCustomProps = {
    container: ViewStyle;
    dayName: ViewStyle;
    dayNameLabel: TextStyle & { typescale?: string };
};

export const dateDayNameStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerDayNameCustomProps
> = {
    container: {
        height: dayNamesHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'colors.surface',
    },
    dayName: { flex: 1, alignItems: 'center' },
    dayNameLabel: {
        fontSize: 14,
        opacity: 0.7,
        typescale: 'typescale.bodyMedium',
    },
};

type DatePickerDayRangeCustomProps = {
    container?: ViewStyle;
    rightCrop?: ViewStyle;
    leftCrop?: ViewStyle;
    centerCrop?: ViewStyle;
};

type DatePickerDayRangeStates = 'isLeftCrop' | 'isRightCrop' | 'inRange' | 'bothWays' | 'isCrop';

export const datePickerDayRangeStyles: ComponentStylePropWithVariants<
    ViewStyle,
    DatePickerDayRangeStates,
    DatePickerDayRangeCustomProps
> = {
    container: {
        flexDirection: 'row',
    },
    rightCrop: {
        flex: 1,
    },
    leftCrop: {
        flex: 1,
    },
    centerCrop: {
        backgroundColor: 'colors.primary',
        minWidth: daySize,
        minHeight: daySize,
    },

    states: {
        isLeftCrop: {
            centerCrop: {
                borderTopLeftRadius: daySize / 2,
                borderBottomLeftRadius: daySize / 2,
            },
            leftCrop: {
                backgroundColor: 'colors.primary',
            },
        },
        isRightCrop: {
            centerCrop: {
                borderTopRightRadius: daySize / 2,
                borderBottomRightRadius: daySize / 2,
            },
            rightCrop: {
                backgroundColor: 'colors.primary',
            },
        },
        bothWays: {
            container: {
                borderRadius: daySize / 2,
            },
        },
        inRange: {
            container: {
                backgroundColor: 'colors.primary',
            },
        },
        isCrop: {
            container: {
                backgroundColor: undefined,
            },
        },
    },
};

type DatePickerYearItemCustomProps = DatePickerYearPickerCustomProps;

export const datePickerYearItemStyles: ComponentStylePropWithVariants<
    TextStyle,
    'selected',
    DatePickerYearItemCustomProps
> = {
    states: {
        selected: {
            yearButton: { backgroundColor: 'colors.primary' },
            yearLabel: { color: 'colors.onPrimary' },
        },
    },
};
