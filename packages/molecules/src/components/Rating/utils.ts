import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

export type States = 'activeAndDisabled' | 'active' | 'disabled' | 'readonly' | 'activeAndReadonly';

const ratingStylesDefault = StyleSheet.create({
    root: {
        flexDirection: 'row',
    },
});

const ratingItemStylesDefault = StyleSheet.create(theme => ({
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

registerComponentsStyles({
    ratingStyles: ratingStylesDefault,
    ratingItemStyles: ratingItemStylesDefault,
});

export const ratingStyles = getRegisteredMoleculesComponentStyles('ratingStyles');
export const ratingItemStyles = getRegisteredMoleculesComponentStyles('ratingItemStyles');
