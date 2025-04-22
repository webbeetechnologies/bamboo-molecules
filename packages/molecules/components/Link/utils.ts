import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { getCursorStyle } from '../../utils';
import { StyleSheet } from 'react-native-unistyles';

// type States = 'disabled' | 'hovered';

const linkStylesDefault = StyleSheet.create(theme => ({
    root: {
        ...getCursorStyle('pointer'),
        color: theme.colors.primary,
        ...theme.typescale.labelLarge,

        variants: {
            state: {
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                    opacity: 0.38,
                    ...getCursorStyle('pointer'),
                },
                hovered: {
                    textDecorationLine: 'underline',
                },
            },
        },
    },
}));

registerComponentsStyles({
    Link: linkStylesDefault,
});

export const linkStyles = getRegisteredMoleculesComponentStyles('Link');
