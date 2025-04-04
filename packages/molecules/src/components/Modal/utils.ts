import { StyleSheet } from 'react-native-unistyles';

export const modalStyles = StyleSheet.create(theme => ({
    root: {},

    backdrop: {
        flex: 1,
        backgroundColor: theme.colors.backdrop,
    },

    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContent: {
        minWidth: 280,
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',

        variants: {
            size: {
                md: {
                    maxWidth: 560,
                    borderRadius: 10,
                },
                lg: {
                    maxWidth: 700,
                    borderRadius: 10,
                },
            },
        },
    },
}));
