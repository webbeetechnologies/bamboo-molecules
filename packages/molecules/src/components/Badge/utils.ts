import { StyleSheet } from 'react-native-unistyles';

export const badgeStyles = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.error,
        borderRadius: theme.shapes.corner.full,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacings['1'],

        variants: {
            size: {
                sm: {
                    width: 6,
                    height: 6,
                    paddingHorizontal: theme.spacings['0'],
                },
                md: {
                    minWidth: 16,
                    minHeight: 16,
                },
            },
        },
    },

    label: {
        color: theme.colors.onError,
        ...theme.typescale.labelSmall,
    },
}));
