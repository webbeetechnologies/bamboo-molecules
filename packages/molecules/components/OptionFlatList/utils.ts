import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const optionFlatListStylesDefault = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInputContainer: {},
});

registerComponentsStyles({
    OptionFlatList: optionFlatListStylesDefault,
});

export const optionFlatListStyles = getRegisteredMoleculesComponentStyles('OptionFlatList');
