import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const inputAddonStylesDefault = StyleSheet.create(theme => ({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        borderRadius: theme.spacings['1'],
        paddingHorizontal: theme.spacings['2'],

        variants: {
            variant: {
                left: {
                    borderRightWidth: 0,
                },

                right: {
                    borderLeftWidth: 0,
                },
            },
        },
    },
}));

registerComponentsStyles({
    inputAddonStyles: inputAddonStylesDefault,
});

export const inputAddonStyles = getRegisteredMoleculesComponentStyles('inputAddonStyles');
