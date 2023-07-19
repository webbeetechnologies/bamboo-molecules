import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

export const MONTHS_DATA = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

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
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
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
        marginTop: 'spacings.2',
        marginBottom: 'spacings.2',
        marginRight: 'spacings.4',
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
        marginLeft: 6,
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    innerStyle: {
        paddingLeft: 0,
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

export const datePickerDockedMonthStyles: ComponentStylePropWithVariants<
    TextStyle,
    'selected',
    DatePickerMonthCustomProps
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
