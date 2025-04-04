import { StyleSheet } from 'react-native-unistyles';

export const avatarStyles = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: theme.colors.onPrimary,
    },
    label: {
        fontSize: theme.typescale.titleMedium.fontSize,
        fontWeight: theme.typescale.titleMedium.fontWeight,
        lineHeight: theme.typescale.titleMedium.lineHeight,
        textTransform: 'capitalize',
        color: '#ffffff',
    },
}));
