import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const elementGroupStylesDefault = StyleSheet.create(theme => ({
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

registerComponentsStyles({
    ElementGroup: elementGroupStylesDefault,
});

export const elementGroupStyles = getRegisteredMoleculesComponentStyles('ElementGroup');
