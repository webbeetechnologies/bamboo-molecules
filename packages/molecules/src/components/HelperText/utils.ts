import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
    root: {
        ...({ animationScale: theme.animation.scale } as any),
        fontSize: theme.typescale.bodySmall.fontSize,
        paddingVertical: theme.spacings['1'],
        paddingHorizontal: theme.spacings['4'],

        variants: {
            variant: {
                error: {
                    color: theme.colors.error,
                },
                info: {
                    color: theme.colors.onSurfaceVariant,
                },
            },
        },
    },
}));
