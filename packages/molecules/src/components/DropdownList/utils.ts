import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const dropdownListStylesDefault = StyleSheet.create(theme => ({
    popoverContainer: {
        minWidth: 112,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.shapes.corner.extraSmall,
        paddingVertical: theme.spacings['2'],
    },
}));

registerComponentsStyles({
    dropdownListStyles: dropdownListStylesDefault,
});

export const dropdownListStyles = getRegisteredMoleculesComponentStyles('dropdownListStyles');
