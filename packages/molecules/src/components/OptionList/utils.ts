import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const optionListStylesDefault = StyleSheet.create(theme => ({
    container: {
        flex: 1,
    },
    searchInputContainer: {
        backgroundColor: theme.colors.surface,
    },
}));

registerComponentsStyles({
    OptionList: optionListStylesDefault,
});

export const optionListStyles = getRegisteredMoleculesComponentStyles('OptionList');
