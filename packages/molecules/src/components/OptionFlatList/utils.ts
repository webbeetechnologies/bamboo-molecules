import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const optionFlatListStylesDefault = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInputContainer: {},
});

registerComponentsStyles({
    optionFlatListStyles: optionFlatListStylesDefault,
});

export const optionFlatListStyles = getRegisteredMoleculesComponentStyles('optionFlatListStyles');
