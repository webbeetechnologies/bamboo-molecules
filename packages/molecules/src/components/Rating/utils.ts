import { StyleSheet } from 'react-native-unistyles';

export type States = 'activeAndDisabled' | 'active' | 'disabled' | 'readonly' | 'activeAndReadonly';

export const ratingStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
    },
});

export const ratingItemStyles = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurfaceVariant,

        variants: {
            state: {
                disabled: {
                    color: theme.colors.disabled,
                    opacity: 0.38,
                },
                activeAndDisabled: {
                    opacity: 0.38,
                },
                readonly: {},
            },
        },
    },
}));
