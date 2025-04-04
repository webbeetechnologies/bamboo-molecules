import { StyleSheet } from 'react-native-unistyles';

export const datePickerDockedStyles = StyleSheet.create(theme => ({
    root: {
        roundness: theme.shapes.corner.extraSmall,
        headerBackgroundColor: theme.colors.surface,
    } as any,

    container: {
        minHeight: 360,
        minWidth: 360,
    },
}));

export const datePickerDockedHeaderStyles = StyleSheet.create(theme => ({
    datePickerHeader: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    daysWrapperStyle: {
        marginHorizontal: theme.spacings['3'],
    },
}));

export const datePickerHeaderItemStyles = StyleSheet.create(theme => ({
    buttonContainer: {
        height: 46,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {},
    spacer: { flex: 1 },
    labelStyle: {
        ...theme.typescale.bodyMedium,
        opacity: 0.7,
    },
    buttonStyle: {
        alignSelf: 'center',
        borderRadius: theme.shapes.corner.extraSmall,
    },
    innerStyle: {
        paddingLeft: theme.spacings['0'],
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.shapes.corner.extraSmall,
    },
    emtpyView: {
        width: 30,
    },
}));

export const datePickerMonthPickerStyles = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.surface,
    },
    month: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    selectedMonth: { color: theme.colors.onSurface },
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
    selectedMonthInner: { backgroundColor: theme.colors.surfaceVariant },
    monthLabel: {
        fontSize: 16,
    },
}));

export const datePickerDockedMonthItemStyles = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.surface,
    },

    monthButton: {
        width: '100%',
        overflow: 'hidden',
        padding: theme.spacings['0'],

        variants: {
            state: {
                selected: {
                    backgroundColor: theme.colors.surfaceVariant,
                },
            },
        },
    },
    monthInner: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: theme.spacings['0'],
    },
    monthLabel: {
        fontSize: 16,

        variants: {
            state: {
                selected: {
                    color: theme.colors.onSurface,
                },
            },
        },
    },
}));

export const datePickerDockedMonthStyles = StyleSheet.create(theme => ({
    dockedHeaderStyle: {
        alignItems: 'flex-start',
        marginLeft: theme.spacings['4'],
    },
    weekContainerStyle: {
        marginHorizontal: theme.spacings['3'],
    },
    backDropStyle: {
        backgroundColor: 'transparent',
    },
}));
