import { StyleSheet } from 'react-native-unistyles';

export const elementGroupStyles = StyleSheet.create(theme => ({
    root: {
        borderRadius: theme.shapes.corner.extraSmall,
        variants: {
            orientation: {
                horizontal: {
                    flexDirection: 'row',
                },
                vertical: {
                    flexDirection: 'column',
                },
            },
        },
    },
}));
