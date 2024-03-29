import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

type States = '';

type CustomProps = {
    roundness?: string;
    headerBackgroundColor?: string;

    container?: ViewStyle;
};

export const datePickerDockedStyles: ComponentStylePropWithVariants<
    TextStyle,
    States,
    CustomProps
> = {
    roundness: 'shapes.corner.extraSmall',
    headerBackgroundColor: 'colors.surface',

    container: {
        minHeight: 360,
        minWidth: 360,
    },
};

type DatePickerHeaderCustomProps = {
    datePickerHeader: ViewStyle;
    daysWrapperStyle?: ViewStyle;
};

export const datePickerDockedHeaderStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerHeaderCustomProps
> = {
    datePickerHeader: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    daysWrapperStyle: {
        marginHorizontal: 'spacings.3',
    },
};

type DatePickerHeaderItemCustomProps = {
    buttonContainer: ViewStyle;
    buttonWrapper: ViewStyle;
    spacer: ViewStyle;
    buttonStyle?: ViewStyle;
    innerStyle?: ViewStyle;
    labelStyle?: TextStyle & { typescale?: string };
    emtpyView: ViewStyle;
};

export const datePickerHeaderItemStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerHeaderItemCustomProps
> = {
    buttonContainer: {
        height: 46,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {},
    spacer: { flex: 1 },
    labelStyle: {
        typescale: 'typescale.bodyMedium',
        opacity: 0.7,
    },
    buttonStyle: {
        alignSelf: 'center',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    innerStyle: {
        paddingLeft: 'spacings.0',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    emtpyView: {
        width: 30,
    },
};

type DatePickerMonthPickerCustomProps = {
    month?: TextStyle;
    selectedMonth?: TextStyle;
    monthButton?: ViewStyle;
    monthInner?: ViewStyle;
    selectedMonthInner?: ViewStyle;
    monthLabel?: TextStyle;
};

export const datePickerMonthPickerStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerMonthPickerCustomProps
> = {
    backgroundColor: 'colors.surface',

    month: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    selectedMonth: { color: 'colors.onSurface' },
    monthButton: {
        width: '100%',
        overflow: 'hidden',
    },
    monthInner: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    selectedMonthInner: { backgroundColor: 'colors.surfaceVariant' },
    monthLabel: {
        fontSize: 16,
    },
};

type DatePickerMonthCustomProps = DatePickerMonthPickerCustomProps;

export const datePickerDockedMonthItemStyles: ComponentStylePropWithVariants<
    TextStyle,
    'selected',
    DatePickerMonthCustomProps
> = {
    backgroundColor: 'colors.surface',

    monthButton: {
        width: '100%',
        overflow: 'hidden',
        padding: 'spacings.0',
    },
    monthInner: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 'spacings.0',
    },
    monthLabel: {
        fontSize: 16,
    },
    states: {
        selected: {
            monthButton: { backgroundColor: 'colors.surfaceVariant' },
            monthLabel: { color: 'colors.onSurface' },
        },
    },
};

type DatePickerDockedMonthCustomProps = {
    dockedHeaderStyle?: ViewStyle;
    weekContainerStyle?: ViewStyle;
    backDropStyle?: ViewStyle;
};

export const datePickerDockedMonthStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerDockedMonthCustomProps
> = {
    dockedHeaderStyle: {
        alignItems: 'flex-start',
        marginLeft: 'spacings.4',
    },
    weekContainerStyle: {
        marginHorizontal: 'spacings.3',
    },
    backDropStyle: {
        backgroundColor: 'transparent',
    },
};
