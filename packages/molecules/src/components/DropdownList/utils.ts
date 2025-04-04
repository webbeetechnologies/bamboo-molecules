import { StyleSheet } from 'react-native-unistyles';

export const dropdownListStyles = StyleSheet.create(theme => ({
    popoverContainer: {
        minWidth: 112,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.shapes.corner.extraSmall,
        paddingVertical: theme.spacings['2'],
    },
}));
