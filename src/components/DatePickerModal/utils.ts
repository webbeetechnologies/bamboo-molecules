import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle, ViewStyle } from 'react-native';

type DatePickerModalCustomProps = {
    header?: ViewStyle;
};

export const datePickerModalStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerModalCustomProps
> = {
    header: {
        backgroundColor: 'colors.primary',
    },
};

type DatePickerModalHeaderCustomProps = {
    animated?: ViewStyle;
    safeContent?: ViewStyle;
    safeContentNoTop?: ViewStyle;
    appbarHeader?: ViewStyle;
};

export const datePickerModalHeaderStyles: ComponentStylePropWithVariants<
    TextStyle,
    'disableSafeTop',
    DatePickerModalHeaderCustomProps
> = {
    color: 'colors.onPrimary',

    animated: {
        paddingBottom: 'spacings.0',
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 'spacings.0',
    },
    safeContentNoTop: {
        paddingTop: 'spacings.0',
    },
    appbarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 'spacings.2',
        paddingVertical: 'spacings.2',
        elevation: 0,
        backgroundColor: 'transparent',
    },

    states: {
        disableSafeTop: {
            safeContent: {
                paddingTop: 0,
            },
        },
    },
};

type DatePickerModalContentHeaderCustomProps = {
    color?: string;

    fill?: ViewStyle;
    header?: ViewStyle;
    headerContentContainer?: ViewStyle;
    label?: TextStyle;
    headerText?: TextStyle;
    headerSeparator?: TextStyle;
    icon?: TextStyle;
};

export const datePickerModalContentHeaderStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerModalContentHeaderCustomProps
> = {
    color: 'colors.onPrimary',

    fill: {
        flex: 1,
    },
    header: {
        height: 75,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 'spacings.6',
        paddingRight: 'spacings.3',
    },
    headerContentContainer: {
        marginTop: 'spacings.1',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: 'colors.onPrimary',
        letterSpacing: 1,
        fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
    },
    headerText: {
        fontSize: 'typescale.headlineSmall.fontSize' as unknown as number,
        color: 'colors.onPrimary',
    },
    headerSeparator: {
        fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
        paddingLeft: 'spacings.2',
        paddingRight: 'spacings.2',
        color: 'colors.onPrimary',
    },
    icon: {
        color: 'colors.onPrimary',
    },
};

type DatePickerModalHeaderBackgroundCustomProps = {
    header?: ViewStyle;
    animated?: ViewStyle;
    safeContent?: ViewStyle;
};

export const datePickerModalHeaderBackgroundStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerModalHeaderBackgroundCustomProps
> = {
    header: {
        backgroundColor: 'colors.primary',
        paddingBottom: 'spacings.0',
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 'spacings.0',
    },
};

type DatePickerModalEditCustomProps = {
    container?: ViewStyle;
    inner?: ViewStyle;
    inputContainer?: ViewStyle;
    input?: ViewStyle;
    separator?: ViewStyle;
};

export const datePickerModalEditStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    DatePickerModalEditCustomProps
> = {
    container: { padding: 'spacings.3' },
    inner: { flexDirection: 'row' },
    inputContainer: { flex: 1 },
    input: { flex: 1 },
    separator: { width: 12 },
};
