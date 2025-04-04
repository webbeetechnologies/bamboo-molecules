import { StyleSheet } from 'react-native-unistyles';

export const tooltipStyles = StyleSheet.create(theme => ({
    content: {
        backgroundColor: theme.colors.onSurfaceVariant,
        borderRadius: theme.shapes.corner.extraSmall,
        padding: theme.spacings['2'],
    },
    contentText: {
        color: theme.colors.surface,
    },
}));
