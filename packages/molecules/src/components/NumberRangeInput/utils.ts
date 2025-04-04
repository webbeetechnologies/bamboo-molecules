import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const numberRangeInputStylesDefault = StyleSheet.create(theme => ({
    root: {},
    minInput: {
        flex: 1,
    },
    maxInput: {
        flex: 1,
    },
    errorText: {
        color: theme.colors.error,
    },
}));

registerComponentsStyles({
    numberRangeInputStyles: numberRangeInputStylesDefault,
});

export const numberRangeInputStyles =
    getRegisteredMoleculesComponentStyles('numberRangeInputStyles');
