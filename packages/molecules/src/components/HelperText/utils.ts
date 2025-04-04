import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const helperTextStylesDefault = StyleSheet.create(theme => ({
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

registerComponentsStyles({
    HelperText: helperTextStylesDefault,
});

export const styles = getRegisteredMoleculesComponentStyles('HelperText');
